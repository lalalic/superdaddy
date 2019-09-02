import "qili-app/index.less"
import "./src/style/index.less"

import render from "qili-app/www/client"
import routes, {App} from "./src/www/routes"
import {config} from "./package.json"

render(
    routes,
    document.querySelector('#app'),
    {
        service:config.service,
        appId:config.appId
    },
    App
)

const base=document.createElement('base')
base.setAttribute("href","/www")
document.querySelector("head").appendChild(base)