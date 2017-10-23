import React from "react"
import Qili from "qili"
import project from "./package.json"
import File from "qili/components/file"

project.homepage="http://localhost:9081"

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWU0NmRhOWU1YjYyYjM4MTFiOGI0YjgiLCJpYXQiOjE1MDgxNDI2MjksImV4cCI6MTUzOTcwMDIyOX0.IWweqXsbF6ILH_bkLnyU2ebAcn0eJ2eQO-gkotSvKr8"

const _render=Qili.render
Qili.render=function(app){
	_render(React.cloneElement(app, {
		service: "http://localhost:9080/1/graphql",
		user:{token},
	}))
}

File.upload=()=>Promise.resolve("images/icon.svg")