import React from "react"
import {QiliApp} from "qili-app"
import {compose, withProps} from "recompose"
import project from "../../package.json"

export default compose(
    withProps(({service="https://api.jiliguan.com/1/graphql"})=>({
        project,
		service,
		appId:project.config.appId
	})),
)(QiliApp)