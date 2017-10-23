exports.extend=function(service){
	service.on(/knowledge/,function({path,app}, {send}){
		let infos=path.split(/[\/\.]/)
		let id=infos.pop()
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
}
	