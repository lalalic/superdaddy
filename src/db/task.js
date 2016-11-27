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

	static finishWeekTasks(child, tasks){
		const {todoWeek:week}=child
		const year=new Date().getFullYear()
		const getDate=(week,i)=>{}
		let finished=tasks.map(task=>{
			const {dones}=task
			dones.forEach(i=>{
				task.week=week
				task.day=i
				task.date=getDate(week,i)
			})

			task.knowledge=task._id
			delete task._id

			task.baby=child._id
		})

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
}
