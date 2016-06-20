import {Model,User} from 'qili-app';
import Family from './family';

function cloneAsDate(d) {
  let clonedDate = new Date(d.getTime());
  clonedDate.setHours(0,0,0,0);
  return clonedDate;
}

export default class Task extends Model{
    static get _name(){
        return 'task'
    }

    static plan(knowledge, dates){
        let {_id,title,keywords,category,steps, images=[]}=knowledge

        return this.upsert({
			knowledge:{_id,title,keywords,category, steps},
            thumbnail: images[0],
            current:0,
			child:Family.currentChild._id})
    }
	
    static finish(task){
        task.finishedAt=new Date()
        task.finishedAuthor=User.currentAsAuthor
        task.current=1000
        return this.upsert(task)
    }
}
