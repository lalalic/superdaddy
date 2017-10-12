import React from "react"
import Qili from "qili"
import project from "./package.json"
import File from "qili/components/file"

project.homepage="http://localhost:9081"

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTZlY2EwOWNkMGFhNWIyMDIzY2Y3ZTkiLCJpYXQiOjE1MDY0OTYyOTIsImV4cCI6MTUzODA1Mzg5Mn0.f9IaTb2FFahZvRWrOzS7HFTh4S6228ilzTLPzTyQWWI"

const _render=Qili.render
Qili.render=function(app){
	_render(React.cloneElement(app, {
		service: "http://localhost:8080/1/graphql",
		user:{token},
	}))
}

File.upload=()=>Promise.resolve("images/icon.svg")


