var {Model}=require('qili-app'),
    {EventEmitter}=require('events'),
    event=new EventEmitter(),
    all,
    children=[],
    currentChild,
    lastChild;
export default class Family extends Model{
    static get _name(){
        return 'family'
    }

    static init(){
        this.super('init')()
        return new Promise((resolve, reject)=>{
            var remote=false;
            this.find().fetch(function(data){
                if(data.length==0 && !remote){
                    remote=true
                    return
                }
                all=data
                all.forEach((a)=>(!a.relationShip && children.push(a)))
                resolve(Family.currentChild=children[0])
            },reject)
        })
    }

    static get all(){
        return all
    }

    static get event(){
        return event
    }

    static get currentChild(){
        return currentChild
    }

    static set currentChild(a){
        lastChild=currentChild
        currentChild=a
        event.emit("change")
    }

    static get children(){
        return children
    }

    static invite(id,relationship){
        return Promise.as(id)
    }
}
