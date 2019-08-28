import render from "qili-app/www/server"
import routes, {App} from "./routes"
import template from "./template"

module.exports=render(routes, template, App)