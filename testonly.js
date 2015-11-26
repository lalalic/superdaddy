require('restmock')
import {Router, QiliApp} from "qili-app"
QiliApp.history=Router.HashLocation

window.Root=require('./index.js')
