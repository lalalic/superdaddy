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

	static finishWeekTasks(child, tasks, domain){
		const targets=child.targets
		const target=targets[domain]
		const {todoWeek:week}=target
		const year=new Date().getFullYear()

		let finished=tasks.reduce((finished,task)=>{
			let props={bayb: child._id, owner:domain}
			task.dones.forEach(i=>{
				finished.push({...task,date:Task.getDate(week,i), ...props, dones:undefined})
			})
			return finished
		},[])

		return Finished.upsert(finished)
	}

    static plan(knowledge, dates){
        let {_id,title,keywords,category,steps, images=[]}=knowledge

        return this.upsert({
			knowledge:{_id,title,keywords,category, steps},
            thumbnail: images[0],
            current:0,
			child:Family.getCurrentChild._id})
    }

    static finish(task){
        task.finishedAt=new Date()
        task.finishedAuthor=User.currentAsAuthor
        task.current=1000
        return this.upsert(task)
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
