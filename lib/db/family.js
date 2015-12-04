var {Model}=require('qili-app'),
    {EventEmitter}=require('events'),
    event=new EventEmitter(),
    all=[],
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
            this.find().fetch((data)=>{
                all=data||[]
                all.forEach((a)=>(!a.relationShip && children.push(a)))
                resolve(Family.currentChild=children[0])
            },reject)
        })
    }

    static upsert(a, base, success, error){
        if(!a._id){
            return this.super('upsert')(a,base,(r)=>{
                    all.push(r)
                    children.push(r)
                    success && success(...arguments)
                },error)
        }else {
            return this.super('upsert')(...arguments)
        }
    }

    static remove(child,success, error){
        if(currentChild==child)
            this.super('remove')(child,()=>{
                    children=children.filter((a)=>a!=child)
                    all=all.filter((a)=>a!=child)
                    success && success(...arguments)
                },error)
        else
            return this.super('remove')(child,success,error)
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
        if(currentChild && currentChild._id)
            lastChild=currentChild
        else
            lastChild=null
        currentChild=a
        event.emit("change")
    }

    static restoreLast(){
        if(lastChild!=null && lastChild._id && currentChild!=lastChild)
            currentChild=lastChild
        else
            currentChild=children[0]
        lastChild=null
        event.emit("change")
    }

    static get children(){
        return children
    }

    static invite(id,relationship){
        return Promise.as(id)
    }
}
