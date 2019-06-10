import React from "react"
import project from "./package.json"
import {QiliApp, File} from "qili-app"

const _upload=File.upload
File.upload=function(data,props){
	if(props && props.key)
		return Promise.resolve({url:props.key})
	return _upload(...arguments).catch(a=>a).then(a=>({url:"dist/knowledge/math.docx"}))
}

project.homepage=`http://localhost:9082`

const _render=QiliApp.render
QiliApp.render=function(app){
	_render(React.cloneElement(app, {
		service:project.config.service,
		isDev:false
	}))
}
