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

    static init(name){
        this.super('init')()
        return new Promise((resolve, reject)=>{
            this.find().fetch((data)=>{
                all=data||[]
                children=[]
                all.forEach((a)=>(!a.relationShip && children.push(a)))
                resolve(Family.currentChild=name ? children.find(a=>a.name==name) : children[0])
            },reject)
        })
    }

    static upsert(a, base, success, error){
        return this.super('upsert')(a,base,(r)=>{
                if(all.filter(b=>b._id=a._id).length==0){
                    all.push(r)
                    children.push(r)
                    currentChild=r
                    event.emit("change")
                }
                success && success(...arguments)
            },error)
    }

    static remove(child,success, error){
        return this.super('remove')(child,()=>{
                children=children.filter((a)=>a._id!=child)
                all=all.filter((a)=>a._id!=child)
                if(currentChild._id==child){
                    currentChild=children[0]
                    event.emit("change")
                }
                success && success(...arguments)
            },error)
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
		if(typeof(a)=='string')
			a=children.filter(b=>b._id==a)[0]

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
        return Promise.resolve(id)
    }

    static relationship(){
        let current=User.current
            ,relative=all.filter(a=>a._id==current._id)[0]
        return relative ? relative.relationship : null
    }
}
