//text,image,voice, video,location,event,device_test,device_event
Cloud.wechat.on('text', (req, res)=>{
    res.success(req.message.Content)
})

Cloud.static.on(/knowledge\//,function({path}, res){
	let infos=path.split(/[\/\.]/)
	infos.pop()
	let id=infos.pop()
	debugger
	return fetch(`/1/classes/knowledge/${id}`).then(({title,content,figure,author,createdAt})=>
`
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
`	
	).then(res.success, res.error)
})