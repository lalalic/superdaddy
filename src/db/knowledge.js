import {Model} from 'qili-app'

export default class Knowledge extends Model{
    static get _name(){
        return 'knowledge'
    }

    /*
    {_id,title,content,summary,keywords,category,props:{...}}
    */
}
