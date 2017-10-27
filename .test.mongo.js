import React from "react"
import Qili from "qili"
import project from "./package.json"
import File from "qili/components/file"

project.homepage="http://localhost:9081"

const _render=Qili.render
Qili.render=function(app){
	_render(React.cloneElement(app, {
		service: "http://localhost:9080/1/graphql",
	}))
}

const _upload=File.upload
File.upload=function(){
	return _upload(...arguments).catch(a=>a).then(a=>"images/icon.svg")
}
