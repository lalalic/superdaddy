var {Model, ENTITIES}=require('qili-app'),
    {EventEmitter}=require('events'),
    event=new EventEmitter()

import {unionOf, Schema} from "normalizr"

export default class Family extends Model{
    static get _name(){
        return 'family'
    }

    static init(name){
        this.super('init')()
		this._schema=unionOf({
				children: new Schema("children",{idAttribute:"_id"})
				,relatives: new Schema("relatives",{idAttribute:"_id"})
			}
			,{
				schemaAttribute: ({relationship})=>(relationship ? "relatives" : "children")
			}
		)
    }
    
    static invite(id,relationship){
        return Promise.resolve(id)
    }
}
