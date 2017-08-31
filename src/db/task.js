import {Model,User} from 'qili-app'
import Family from './family'
import Finished from "./finished"

function cloneAsDate(d) {
  let clonedDate = new Date(d.getTime());
  clonedDate.setHours(0,0,0,0);
  return clonedDate;
}

export default class Task extends Model{
    static get _name(){
        return 'task'
    }

	static finishWeekTasks(child, tasks, attrs, domain){
		const targets=child.targets
		const target=targets[domain]
		const {todoWeek:week}=target
		const year=new Date().getFullYear()
		
		attrs=attrs||{}
		let finished=tasks.reduce((finished,task)=>{
			let props={baby: child._id, owner:domain}
			task.dones.forEach(i=>{
				finished.push({...task,date:Task.getDate(week,i), ...props, ...attrs[`${i}`], dones:undefined})
			})
			return finished
		},[])

		return Finished.upsert(finished)
	}

    static getWeekStart(date=new Date()){
        return date.relativeDate(-1*date.getDay()).toDate().getTime()
    }

    static getDate(weekStart, day){
        return new Date(weekStart).relativeDate(day).toDate()
    }
	
	static createUid(){
		return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, c=>{
			let r = Math.random()*16|0
			let v = c == 'x' ? r : (r&0x3|0x8)
			return v.toString(16)
		})
	}
}
