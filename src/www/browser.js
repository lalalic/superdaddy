import "qili-app/index.less"
import "../style/index.less"

import render from "qili-app/www/client"
import routes, {App} from "./routes"

render(
    routes,
    document.querySelector('#app'),
    {
        service:"https://api.jiliguan.com/1/graphql",
        appId:"5746b2c5e4bb3b3700ae1566"
    },
    App
)