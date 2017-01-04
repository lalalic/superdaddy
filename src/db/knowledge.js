import {Model} from 'qili-app'

export default class Knowledge extends Model{
    static get _name(){
        return 'knowledge'
    }

    /*
    {_id,title,content,summary,keywords,category,props:{...}}
    */
	
	static isForParent(knowledge){
		return (knowledge.category||[]).includes("父母教育")
	}
	
	static isForBaby(knowledge){
		return (knowledge.category||[]).join("")!=="父母教育"
	}
}
