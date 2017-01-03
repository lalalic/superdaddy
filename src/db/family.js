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

    static upgrade(members){
        return members.map(a=>{
            if(a.goal){
                let {todoWeek,goal,score,todos,totalScore,todo}=a
                let now=new Date().toDate(), week=now.getWeek()
                todoWeek=now.relativeDate(-1*((week-todoWeek)*7+now.getDay())).getTime()
                a.targets={baby:{goal,score,todos,totalScore,todoWeek,todo}}
                "goal,score,todos,totalScore,todoWeek,todo".split(",").forEach(b=>a[b]=undefined)
            }
            return a
        })
    }
}
