const CAPS=["观察能力","自制力","专注力","记忆力"]
const relativeDate=(d, days)=>new Date(d.getTime()+24*60*60*1000*days)
const exists=(todos, content,knowledge)=>1+todos.findIndex(a=>knowledge ? a.knowledge===knowledge : a.content===content)
const currentWeek=()=>{
	let week=new Date()
	week=relativeDate(week,-1*week.getDay())
	week.setHours(0,0,0,0)
	return parseInt(week.getTime()/1000)
}

function plan_goal_achieved(plan,{_id},{user,app}){
	if(plan.score>=plan.goal){
		return app.updateEntity("Plan",{_id},{$set:{goal:0,score:plan.score-plan.goal,todo:null}})
			.then(()=>app.createEntity("Achievement",{score:plan.goal,achievement:plan.todo,child:_id}))
	}else{
		return Promise.resolve()
	}
}

module.exports={
	Child:{
		id: Cloud.ID,
		birthday:({birthday,bd})=>birthday||bd,
        score: ({score})=>score||0,
		publishes(child, {}, {app}){
			return app.findEntity("Publish", {child:child._id})
		},
		publish(child,{_id},{app,user}){
			return app.get1Entity("Publish",{child:child._id, _id:_id})
		},
		plan({_id},{},{app}){
			return app.getDataLoader("Plan")
				.load(_id)
				.then(plan=>{
					if(!plan){
						return app.createEntity("Plan",{
							_id,week:currentWeek(),score:0,goal:0,
							todos:[],
							goals:[],
							months:new Array(12).fill(1).map(a=>({goals:[],knowledges:[]})),
						})
					}
					return plan
				})
		}
	},

	Plan:{
		id: Cloud.ID,
		todos: ({todos})=>{
			if(!todos)
				return todos
			return todos.filter(a=>!a.removed)
		},
		pendingKnowledges({goals},{},ctx){
			return  module.exports.Query.knowledges(null,{categories:goals},ctx)
				.then(({edges})=>edges)
		}
	},

	User:{
		child(child, {_id}, {app,user}){
			return app.getDataLoader("User")
				.load(_id)
				.then(a=>a.author==user._id ? a : null)
		},

		children(me, {}, {app,user}){
			return app.findEntity("User", {author:user._id})
		},

		awards(me,{},{app,user}){
			return app.findEntity("Award",{author:user._id})
		}
	},

	Query:{
		knowledge(_,{_id},{app}){
			return app.get1Entity("Knowledge",{_id})
		},
		knowledges(_,{title,categories,tags,mine,favorite,tasked,tasking,hasHomework, hasPrint, hasSale, first=10,after},context){
			const {app,user}=context
			return app.nextPage("Knowledge",{first,after}, async cursor=>{
				if(favorite){
					const myFavorites=(await app.findEntity("KnowledgeFavorites",{author:user._id})).map(a=>a.knowledge)
					cursor=cursor.filter({_id:{$in:myFavorites}})
				}

				const {User,Child}=module.exports
				if(tasking || tasked){
					const children=await User.children(user,{},context)
					if(tasking){
						const taskingKnowledges=Promise.all(children.map(child=>Child.plan(child,{},context)))
							.then(plans=>{
								return plans.reduce((collected,plan)=>{
									if(plan.todos){
										plan.todos.filter(a=>!a.removed).forEach(a=>a.knowledge && collected.push(a.knowledge))
									}
									return collected
								},[])
							})
						cursor=cursor.filter({_id:{$in:taskingKnowledges}})
					}

					if(tasked){
						const taksedKnowledges=await app.findEntity("History",{
									knowledge:{$ne:null},
									owner:{$in:children.map(a=>Child.id(a))}
								},undefined,{knowledge:1})
							.then(historys=>Array.from(new Set(historys.map(a=>a.knowledge))))
						console.log(taksedKnowledges)
						cursor=cursor.filter({_id:{$in:taksedKnowledges}})
					}
				}

				
				if(title){
					cursor=cursor.filter({title: new RegExp(`${title}.*`,"i")})
				}

				if(categories && categories.length){
					cursor=cursor.filter({category:{$all:categories}})
				}

				if(tags && tags.length){
					cursor=cursor.filter({tags:{$all:tags}})
				}

				if(mine){
					cursor=cursor.filter({author:user._id})
				}	
				
				if(hasHomework){
					cursor=cursor.filter({hasHomework:{$exists:true}})
				}

				if(hasPrint){
					cursor=cursor.filter({hasPrint:{$exists:true}})
				}

				if(hasSale){
					cursor=cursor.filter({sale:{$exists:true}})
				}

				return cursor
			})
		},
		plan(_,{_id},{app}){
			return app.get1Entity("Plan",{_id})
		}
	},

	Mutation:{
		child_remove(_,{_id},{app,user}){
			return app.remove1Entity("User",  {_id, author:user._id})
		},
		child_create(_,child, {app,user}){
			return app.createEntity("User", {...child,author:user._id})
		},
		child_update(_, {_id, ...$set}, {app,user}){
			if($set.name!==undefined && !$set.name)
				throw new Error("name can't be empty")
			return app.patchEntity("User", {_id,author:user._id}, {...$set, author:user._id})
		},

		knowledge_create(_, {knowledge:{title, template,...knowledge}}, {app,user}){
			if(!title)
				throw new Error("必须有题目")
			return app.get1Entity("Knowledge",{title,author:user._id})
				.then(a=>{
					if(a){
						throw new Error(`已经存在了`)
					}
				})
				.then(()=>app.createEntity("Knowledge", {...knowledge,title, author:user._id}))
		},

		knowledge_update(_, {_id, knowledge:{title,...knowledge}}, {app,user}){
			if(title!=undefined && !title)
				throw new Error("必须有题目")
			return Promise.resolve(title ? app.get1Entity("Knowledge",{title,author:user._id})
					.then(a=>{
						if(a && a._id!==_id){
							throw new Error(`已经存在了`)
						}
					}) : undefined)
					.then(()=>app.patchEntity("Knowledge", {_id}, {...knowledge,title,author:user._id}))
					.then(()=>app.get1Entity("Knowledge", {_id}))
		},

		publish_create(_, doc, {app,user}){
			return app.createEntity("Publish", {...doc, author:user._id,status:1})
		},

		publish_update(_, {_id,...patch}, {app,user}){
			return app.patchEntity("Publish",{author:user._id,_id}, {...patch})
		},

		publish_done(_,{_id},{app,user}){
			return app.patchEntity("Publish",{author:user._id,_id}, {status:0})
		},

		publish_remove(_, {_id}, {app,user}){
			return app.remove1Entity("Publish",{_id, author: user._id, status:{$ne:0}})
		},

		plan_update_icon(_,{_id, icon},{app,user}){
			return app.patchEntity("Plan",{_id},{icon})
				.then(()=>app.get1Entity("Plan",{_id}))
		},

		async plan_task_done(_,{_id,content,knowledge,props,day},{app,user}){
			props=props||{}
			let score=1
			if(knowledge){
				let kl=await app.get1Entity("Knowledge",{_id:knowledge})
				if(kl && kl.score)
					score=kl.score
				Cloud.statistics("Knowledge",{_id:knowledge,accomplished:1},{app,user})
			}else{//support content:100
				let [,task_score]=content.split(/[:：]/)
				if(task_score){
					try{
						score=parseInt(task_score)
					}catch(e){

					}
				}
			}
			let plan=await app.get1Entity("Plan",{_id})
			let task=plan.todos.find(a=>knowledge ? a.knowledge==knowledge : a.content==content)
			let key=`day${day}`
			let dayTask=task[key]
			let jobs=[]
			if(dayTask){//update
				task[key]={...dayTask, ...props}
				jobs.push(app.updateEntity("Plan",{_id},{$set:{todos:plan.todos}}))
			}else{
				task[key]=props
				jobs.push(app.updateEntity("User", {_id}, {$inc:{score}}))
				jobs.push(app.updateEntity("Plan",{_id},{$inc:{score},$set:{todos:plan.todos}}))
			}
			
			return Promise.all(jobs)
				.then(()=>app.getDataLoader("User").clear(_id).load(_id))
		},

		async plan_reset_week(_,{_id},{app,user}){
			let plan=await app.getDataLoader("Plan").load(_id)

			function saveFinishedTasks(){
				let {week,todos}=plan
				let startDate=new Date(week*1000)
				let tasks=todos.map(({content,knowledge,removed,...others})=>{
					return [0,1,2,3,4,5,6].map(i=>{
						let day=others[`day${i}`]
						if(day){
							let when=relativeDate(startDate,i)
							when.setHours(0,0,0,0)
							let task={owner:_id,when,content,knowledge,createdAt:new Date()}
							if(typeof(day)=="object")
								task.props=day
							return task
						}
					}).filter(a=>!!a)
				}).reduce((collected,a)=>(collected.splice(-1,0,...a),collected),[])
				//save tasks
				if(tasks.length==0)
					return Promise.resolve()

				return app.collection("History")
					.then(conn=>conn.insertMany(tasks)
							.then(()=>conn.close())
							.catch(()=>conn.close())
						)
			}

			function reset4CurrentWeek(){
				let {todos, months}=plan
				let week=currentWeek()
				todos=todos.filter(a=>!a.removed).map(({day0,day1,day2,day3,day4,day5,day6,...others})=>others)

				let applyPlan=null
				if(months){
					let {knowledges=[]}=(months[new Date().getMonth()]||{})
					applyPlan=Promise.all(
						knowledges.map(a=>{
							if(-1==todos.findIndex(({knowledge})=>knowledge==a)){
								return app.getDataLoader("Knowledge")
									.load(a)
									.then(({title})=>todos.push({knowledge:a, content:title}))

							}
						}).filter(a=>!!a)
					)
				}else{
					applyPlan=Promise.resolve()
				}

				return applyPlan
					.then(()=>app.patchEntity("Plan",{_id},{todos,week}))
					.then(()=>({...plan,todos,week}))
			}

			saveFinishedTasks()

			return reset4CurrentWeek()
		},

		plan_reset_achievement(_,{_id, goal,todo},{app,user}){
			return app.get1Entity("Plan",{_id})
				.then(plan=>{
					if(plan.score>=plan.goal){
						return plan_goal_achieved(plan,{_id},{app,user})
							.then(()=>app.get1Entity("Plan",{_id}))
					}else{
						return plan
					}
				})
				.then(()=>app.patchEntity("Plan",{_id},{goal,todo}))
				.then(()=>app.get1Entity("Plan",{_id}))
		},

		plan_todos_add(_,{_id, content, knowledge, fields},{app,user}){
			if(!content && !knowledge){
				return Promise.reject(new Error("任务不能空"))
			}
			return app.getDataLoader("Plan")
				.load(_id)
				.then((plan,i)=>{
					let {todos=[]}=plan
					if((i=exists(todos,content,knowledge))){
						let target=todos[--i]
						delete target.removed
						target.fields=fields
					}else{
						todos=[...todos,{content,knowledge:knowledge||undefined,fields}]
						if(knowledge){
							Cloud.statistics("Knowledge",{_id:knowledge,tasking:1},{app})
						}
					}
					plan.todos=todos
					return app.patchEntity("Plan",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_remove(_,{_id, content, knowledge},{app,user}){
			return app.getDataLoader("Plan")
				.load(_id)
				.then((plan,i)=>{
					let {todos=[]}=plan
					if(!(i=exists(todos,content,knowledge)))
						return plan
					const [removing]=todos.splice(i-1,1)
					plan.todos=todos
					if(new Array(7).fill(true).find((a,i)=>!!removing[`day${i}`])){
						removing.removed=true
						todos.push(removing)
					}
					if(removing.knowledge){
						Cloud.statistics("Knowledge",{_id:removing.knowledge,tasking:-1},{app})
					}
					return app.patchEntity("Plan",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_up(_,{_id, content,knowledge},{app,user}){
			return app.getDataLoader("Plan")
				.load(_id)
				.then((plan,i)=>{
					let {todos=[]}=plan
					if(!(i=exists(todos,content,knowledge)))
						return plan
					let target=todos[--i]
					todos.splice(i,1)
					todos.splice((i-1)%(todos.length+1),0,target)
					plan.todos=todos
					return app.patchEntity("Plan",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_down(_,{_id, content,knowledge},{app,user}){
			return app.getDataLoader("Plan")
				.load(_id)
				.then((plan,i)=>{
					let {todos=[]}=plan
					if(!(i=exists(todos,content,knowledge)))
						return plan
					let target=todos[--i]
					todos.splice(i,1)
					todos.splice((i+1)%(todos.length+1),0,target)
					plan.todos=todos
					return app.patchEntity("Plan",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_top(_,{_id, content, knowledge},{app,user}){
			return app.getDataLoader("Plan")
				.load(_id)
				.then((plan,i)=>{
					let {todos=[]}=plan
					if(!(i=exists(todos,content,knowledge)))
						return plan
					let target=todos[--i]
					todos.splice(i,1)
					todos.unshift(target)
					plan.todos=todos
					return app.patchEntity("Plan",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_bottom(_,{_id, content,knowledge},{app,user}){
			return app.getDataLoader("Plan")
				.load(_id)
				.then((plan,i)=>{
					let {todos=[]}=plan
					if(!(i=exists(todos,content,knowledge)))
						return plan
					let target=todos[--i]
					todos.splice(i,1)
					todos.push(target)
					plan.todos=todos
					return app.patchEntity("Plan",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_toggle(_,{_id,content,knowledge},{app,user}){
			return app.getDataLoader("Plan")
				.load(_id)
				.then((plan,i)=>{
					let {todos=[]}=plan
					if(!(i=exists(todos,content,knowledge)))
						return plan
					let target=todos[--i]
					target.hidden=!!!target.hidden
					plan.todos=todos
					return app.patchEntity("Plan",{_id},{todos})
						.then(()=>plan)
				})
		},

		award_create(_,{name,url,...$set},{app,user}){
			return app.get1Entity("Award",{author:user._id,name})
				.then(existing=>{
					if(existing){
						throw new Error(`award[${name}] already exists`)
					}else{
						return app.createEntity("Award",{name,url,...$set,author:user._id})
							.then(()=>user)
					}
				})
		},

		award_update(_,{_id,name,url,...$set},{app,user}){
			return app.get1Entity("Award",{author:user._id,name})
				.then(existing=>{
					if(existing && _id!=existing._id){
						throw new Error(`award[${name}] already exists`)
					}else{
						return app.patchEntity("Award",{_id,author:user._id},{name,url,...$set})
							.then(()=>app.get1Entity("Award",{_id}))
					}
				})
		},

		award_remove(_,{ids=[]},{app,user}){
			return Promise.all(ids.map(_id=>app.remove1Entity("Award", {author:user._id,_id})))
				.then(()=>user)
		}
	},

	Knowledge: {
		id: Cloud.ID,

		files({_id},{},{app,user}){
			return app.findEntity("files",{host:`Knowledge:${_id}`})
		},

		inTask({_id},{child},{app,user}){
			if(!child)
				return false
			return app.getDataLoader("Plan")
				.load(child)
				.then(plan=>{
					if(!plan || !plan.todos)
						return false
					return !!plan.todos.filter(a=>!a.removed).find(({knowledge})=>knowledge==_id)
				})
		},

		hasHomework({_id, hasHomework},{child},{app}){
			if(!child || !hasHomework) 
				return hasHomework
			return app.getDataLoader("Plan")
				.load(child)
				.then(plan=>{
					if(!plan || !plan.todos)
						return hasHomework
					const todo=plan.todos.filter(a=>!a.removed).find(({knowledge})=>knowledge==_id)
					
					if(todo){
						return {...hasHomework, ...(todo.fields||{})}
					}else{
						return hasHomework
					}
				})
		},

		category:({category})=>category||[],
		tags:({tags})=>tags||[],

		isMyWork:({author},{},{app,user})=>author==user._id,

		author({author},{},{app,user}){
			return app.getDataLoader("User").load(author)
		},

		is4Classroom({tags=[]}){
			return !!(tags && ["classroom","课堂纪律"].find(a=>tags.includes(a)))
		},

		supportTimer({tags=[]}){
			return !!(tags && ["timer","计时器"].find(a=>tags.includes(a)))
		},

		summary({content,summary}){
			if(summary)
				return summary
			let i0=content.indexOf("<p>")
			if(i0!=-1){
				i0+=3
				let i1=content.indexOf("</p>",i0)
				summary=content.substring(i0,i1)
				if(summary.length>256)
					return summary.substring(0,250)+'...'
				return summary
			}
		},
	},

	Publish: {
		id: Cloud.ID,

		author({author}, {}, {app,user}){
			return app.getDataLoader("User").load(author)
		},

		child({child}, {}, {app,user}){
			return app.getDataLoader("User")
				.load(child)
				.then(child=>child.author==user._id ? child : null)
		},
	},

	MonthPlan:{
		knowledges({knowledges},{},{app,user}){
			return Promise.all((knowledges).filter(a=>a).map(_id=>app.getDataLoader("Knowledge").load(_id)))
				.then(a=>a.filter(b=>b))
		},
		goals:({goals})=>goals||[],
	},
	Todo: {
		knowledge({knowledge},{},{app,user}){
			if(knowledge)
				return app.getDataLoader("Knowledge").load(knowledge)
		}
	},
	Award: {
		id: Cloud.ID,
	},
}
