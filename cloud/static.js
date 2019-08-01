module.exports=function(service){
	service.on(/knowledge/,function({path,app}, {reply:send}){
		const [,,id]=path.split(/[\/\.]/)
		app.runQL(`query knowledge($id:String){
					knowledge(_id:$id){
						title
						content
						figure
						author{
							username
						}
						createdAt
					}
				}`,{id})
			.then(({data:{knowledge:{title,content,figure,author,createdAt}},errors})=>send(`
				<html>
					<head>
						<title>${title}</title>
					</head>
					<body>
						<article>
							${figure ? '<figure><img src="${figure}"></figure>' : ''}
							<header>
								<p>
									<span>${author.username}</span>  
									<time>${createdAt}</time>
								</p>
							</header>
							<section>
								${content}
							</section>
						</article>
					</body>
				</html>
			`))
			.catch(send)
	})
	const RE_PRINT=/print\/child\:(.*)\/tasks/
	service.on(RE_PRINT,function({path,app},{reply:send}){
		const [,id]=RE_PRINT.exec(path)
		app.runQL(`query plan($id:String){
			plan(_id:$id){
				todos{
					knowledge{
						id
						fields
					}
					content
					hidden
					day0
					day1
					day2
					day3
					day4
					day5
					day6
				}
			}
		}`,{id}).then(({data,errors})=>{
			if(errors && errors.length>0){
				throw new Error(errors)
			}
			const {todos=[]}=data.plan
			const tasks=todos.map(a=>{
				if(a.hidden)
					return null
				let todo={...a}

				if(a.knowledge){
					todo.fields=a.knowledge.fields
				}

				let {dones, props}=[0,1,2,3,4,5,6].reduce((state,i)=>{
					const {dones,props}=state
					let prop=props[`${i}`]=a[`day${i}`]
					if(prop){
						dones.push(i)
					}
					return state
				}, {dones:[], props:{}})
				todo.dones=dones
				todo.props=props
				return todo
			}).filter(a=>!!a)
			debugger
			const content=tasks.map(({content:task, dones=[], fields, props})=>(
				`<tr>
					<td>${task}</td>
					${[0,1,2,3,4,5,6].map(a=>`<td>${-1!=dones.indexOf(a) ? "V" :""}</td>`).join("")}
				</tr>`
			)).join("")

			const days='日,一,二,三,四,五,六'.split(",")
			const now=new Date(), today=`${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()+1}`

			send(`
			<html>
				<head>
					<style>
						body{margin:48px}
						table{width:100%;border-collapse:collapse}
						td{border:1px solid gray;}
						thead{text-align:center;background:lightgray}
					</style>
				</head>
				<body>
					<table>
						<thead>
							<tr>
								<td>
									<span style="float:left">任务</span>
									<span style="float:right">@${today}-星期</span>
								</td>
								${days.map(a=>`<td>${a}</td>`).join("")}
							</tr>
						</thead>
						<tbody>
							${content}
						</tbody>
					</table>
				</body>
			</html>
			`)
		}).catch(send)
	})
}
	