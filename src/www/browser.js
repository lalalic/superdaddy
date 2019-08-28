import "qili-app/index.less"
import "../style/index.less"

import react from "react"
import render from "qili-app/www/client"
import routes, {App} from "./routes"
import {config} from "../../package.json"

render(
    react.cloneElement(routes,{path:"/www"}),
    document.querySelector('#app'),
    {
        service:config.service,
        appId:config.appId
    },
    App
)