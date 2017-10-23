const CAPS=["观察能力","自制力","专注力","记忆力"]
const relativeDate=(d, days)=>new Date(d.getTime()+24*60*60*1000*days)
const exists=(todos, content,knowledge)=>1+todos.findIndex(a=>knowledge ? a.knowledge===knowledge : a.content===content)
const currentWeek=()=>{
	let week=new Date()
	week=relativeDate(week,-1*week.getDay())
	week.setHours(0,0,0,0)
	return parseInt(week.getTime()/1000)
}

module.exports={
	Child:{
		birthday:({birthday,bd})=>birthday||bd,
        id: ({_id})=>`childs:${_id}`,
		score: ({score})=>score||0,
		publishs(child, {}, {app}){
			return app.findEntity("publishs", {child:child._id})
		},
		plan({_id},{},{app}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					if(!plan){
						return app.createEntity("plans",{_id,week:currentWeek(),score:0,goal:0,todos:[]})
					}
					return plan
				})
		}
	},
	
	Plan:{
		id: ({_id})=>`plans:${_id}`,

		caps: ()=>CAPS,
	},
	
	User:{
		child(child, {_id}, {app,user}){
			return app.getDataLoader("users")
				.load(_id)
				.then(a=>a.author==user._id ? a : null)
		},
		
		children(me, {}, {app,user}){
			return app.findEntity("users", {author:user._id})
		}
	},
	
	Query:{
		knowledge(_,{_id},{app}){
			return app.get1Entity("knowledges",{_id})
		},
		knowledges(_,{title,categories,tags,first=10,after},{app}){
			const [createdAt,_id]=(after||":").split(":")
			return app.findEntity("knowledges", {}, cursor=>{
					let filtered=cursor.sort([["createdAt",-1]]).limit(first+parseInt(first/2))
					if(createdAt){
						filtered=filtered.filter({createdAt:{$lte:new Date(parseInt(createdAt))}})
					}
					
					if(title){
						filtered=filtered.filter({title: new RegExp(`${title}.*`,"i")})
					}
					
					if(categories && categories.length){
						
					}
					if(tags && tags.length){
						
					}
					return filtered
				})
				.then(docs=>{
					let edges=_id ? docs.slice(docs.findIndex(a=>a._id==_id)+1) : docs
					let hasNextPage=false
					
					if(edges.length>=first){
						edges=edges.slice(0,first)
						hasNextPage=true
					}
					return {
						edges,
						hasNextPage,
					}
				})
		},
	},
	
	Mutation:{
		child_remove(_,{_id},{app,user}){
			return app.remove1Entity("users",  {_id, author:user._id})
		},
		child_create(_,child, {app,user}){
			return app.createEntity("users", {...child,author:user._id})
		},
		child_update(_, {_id, ...$set}, {app,user}){
			if($set.name!==undefined && !$set.name)
				throw new Error("name can't be empty")
			return app.patchEntity("users", {_id,author:user._id}, {...$set, author:user._id})
		},
		
		knowledge_create(_, {knowledge:{photos=[], ...knowledge}}, {app,user}){
			return app.createEntity("knowledges", {...knowledge, photos, author:user._id})
				.then(knowledge=>{
					if(photos.length){
						Cloud.file_link(`knowledges:${knowledge._id}`,photos)
					}
					return knowledge
				})
		},
		
		knowledge_update(_, {_id, newPhotos, knowledge}, {app,user}){
			return app.patchEntity("knowledges", {_id}, {...knowledge,author:user._id})
				.then(updatedAt=>{
					if(newPhotos){
						Cloud.file_link(`knowledges:${_id}`,newPhotos)
					}
				})
				.then(()=>app.get1Entity("knowledges", {_id}))
		},
		
		publish_create(_, doc, {app,user}){
			return app.createEntity("publishs", {...doc, author:user._id})
		},
		
		publish_remove(_, {_id}, {app,user}){
			return app.remove1Entity("publishs",{_id, author: user._id})
		},
		
		async plan_update(_,{_id, plan},{app,user}){
			let conn = await app.collection("plans")
			try{
				let {modifiedCount,upsertedId}=await conn.updateOne({_id},{$set:plan},{upsert:true})
				return await conn.findOne({_id})
			}finally{
				conn.close()
			}
		},	

		async plan_task_done(_,{_id,content,knowledge,props,day},{app,user}){
			let score=1
			if(knowledge){
				let kl=await app.get1Entity("knowledges",{_id:knowledge})
				if(kl && kl.score)
					score=kl.score
			}
			let childScore=app.updateEntity("users", {_id}, {$inc:{score:1}})
			let plan=await app.get1Entity("plans",{_id})
			let task=plan.todos.find(a=>knowledge ? a.knowledge==knowledge : a.content==content)
			task[`day${day}`]=props||true
			let planScore=app.updateEntity("plans",{_id},{$inc:{score:1},$set:{todos:plan.todos}})
			return Promise.all([childScore,planScore])
				.then(()=>app.getDataLoader("users").clear(_id).loade(_id))
		},
		
		async plan_reset(_,{_id},{app,user}){
			let plan=await app.getDataLoader("plans").load(_id)

			function saveFinishedTasks(){
				let {week,todos}=plan
				let startDate=new Date(week*1000)
				let tasks=todos.map(({content,knowledge,...others})=>{
					return [0,1,2,3,4,5,6].map(i=>{
						let day=others[`day${i}`]
						if(day){
							let when=relativeDate(startDate,i)
							when.setHours(0,0,0,0)
							let task={owner:"childs:"+_id,when,content,knowledge,createdAt:new Date()}
							if(typeof(day)=="object")
								task.props=day
							return task
						}
					}).filter(a=>!!a)
				}).reduce((collected,a)=>(collected.splice(-1,0,...a),collected),[])
				//save tasks
				if(tasks.length==0)
					return Promise.resolve()

				return app.collection("historys")
					.then(conn=>conn.insertMany(tasks)
							.then(()=>conn.close())
							.catch(()=>conn.close())
						)
			}
			
			function reset4CurrentWeek(){
				let {todos, months}=plan
				let week=currentWeek()
				todos=todos.map(({day0,day1,day2,day3,day4,day5,day6,...others})=>others)
				
				let applyPlan=null
				if(months){
					let {knowledges=[]}=(months[new Date().getMonth()]||{})
					applyPlan=Promise.all(
						knowledges.map(a=>{
							if(-1==todos.findIndex(({knowledge})=>knowledge==a)){
								return app.getDataLoader("knowledges")
									.load(a)
									.then(({title})=>todos.push({knowledge:a, content:title}))
								
							}
						}).filter(a=>!!a)
					)
				}else{
					applyPlan=Promise.resolve()
				}
				
				return applyPlan.then(()=>{
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
				}).then(()=>plan)
			}
			
			saveFinishedTasks()
			
			return reset4CurrentWeek()
		},
		
		plan_todos_add(_,{_id, content, knowledge},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					if(exists(todos,content,knowledge))
						return plan
					todos=[...todos,{content,knowledge:knowledge||undefined}]
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_remove(_,{_id, content, knowledge},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then((plan,i)=>{
					let {todos=[]}=plan
					if(!(i=exists(todos,content,knowledge)))
						return plan
					todos.splice(i-1,1)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_removeNth(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					todos.splice(i,1)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_up(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					todos.splice(i,1)
					todos.splice((i-1)%(todos.length+1),0,target)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_down(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					todos.splice(i,1)
					todos.splice((i+1)%(todos.length+1),0,target)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_top(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					todos.splice(i,1)
					todos.unshift(target)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_bottom(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					todos.splice(i,1)
					todos.push(target)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_toggle(_,{_id,i},{app,user}){
			return app.get1Entity("plans",{_id})
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					target.hidden=!!!target.hidden
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_auto(_,{_id},{app,user}){
			return app.get1Entity("plans",{_id})
				.then(plan=>{
					let {goals=[], months=[]}=plan
					let month=new Date().getMonth()
					let count=12-month
					if(goals.length==0){
						goals=CAPS.slice(0,Math.floor(count/3))
					}
					
					let pending=new Array(count)
					pending.fill(1)
					pending.forEach((a,i)=>{
						let {goals:currentGoals=[],knowledges=[]}=months[i+month]||{}
						if(currentGoals.length==0)
							currentGoals[0]=goals[i%goals.length]
						months[i+month]={goals:currentGoals, knowledges}
					})
					
					let all=pending.map((a,i)=>{
						return new Promise((resolve, reject)=>{
							let {goals,knowledges=[]}=months[i+month]
							if(knowledges.length==0){
								app.findEntity("knowledges",{categories:{$in:goals}}, (cursor)=>cursor.limit(3))
									.then(array=>{
										months[i+month].knowledges=array.map(({_id})=>_id)
										resolve()
									},reject)
							}else{
								resolve()
							}
						})
					})
					return Promise.all(all)
						.then(()=>{
							plan.months=[...months]
							plan.goals=[...goals]
							
							let all=[]
							if(!plan.todos || plan.todos.length==0){
								months[month].knowledges
									.forEach(a=>all.push(app.getDataLoader("knowledges").load(a)))
							}
							return Promise.all(all)
								.then(knowledges=>{
									if(knowledges)
										plan.todos=knowledges.map(({_id,title})=>({knowledge:_id,content:title}))
									return app.updateEntity("plan",{_id},{
										months:plan.months,
										goals:plan.goals, 
										todos:plan.todos,
									})
								})
						})
						.then(()=>plan)
				})
		},
	},
	
	Knowledge: {
		id: ({_id})=>`knowledges:${_id}`,
		
		files({_id},{},{app,user}){
			return app.findEntity("files",{host:`knowledges:${_id}`})
		},
		
		inTask({_id},{child},{app,user}){
			return app.getDataLoader("plans")
				.load(child)
				.then(plan=>{
					if(!plan || !plan.todos)
						return false
					return !!plan.todos.find(({knowledge})=>knowledge==_id)
				})
		},
		
		isMyWork:({author},{},{app,user})=>author==user._id,
		
		author({author},{},{app,user}){
			return app.getDataLoader("users").load(author)
		}
	},
	
	Publish: {
		id: ({_id})=>`publishs:${_id}`,
		
		author({author}, {}, {app,user}){
			return app.getDataLoader("users").load(author)
		},
		
		child({child}, {}, {app,user}){
			return app.getDataLoader("users")
				.load(child)
				.then(child=>child.author==user._id ? child : null)
		},
	},
	
	MonthPlan:{
		knowledges({knowledges=[]},{},{app,user}){
			return Promise.all(knowledges.map(_id=>app.getDataLoader("knowledges").load(knowledge)))
		}
	},
	Todo: {
		knowledge({knowledge},{},{app,user}){
			if(knowledge)
				return app.getDataLoader("knowledges").load(knowledge)
		}
	}
}