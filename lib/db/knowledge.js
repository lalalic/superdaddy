var {Model}=require('dashboard'),
    _current;
export default class Knowledge extends Model{
    static get _name(){
        return 'knowledge'
    }

    static get current(){
        return _current
    }

    static set current(v){
        _current=v
    }
}
