import "./style/index.less"
import React from "react"
import {SuperDaddy,routes} from "./superdaddy"
import {QiliApp} from "qili-app"

QiliApp.render(<SuperDaddy>{routes}</SuperDaddy>)
