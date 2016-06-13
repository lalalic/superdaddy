var {Model}=require('qili-app'),
    {EventEmitter}=require('events'),
    event=new EventEmitter(),
    all=[],
    children=[],
    currentChild=null,
    lastChild=null;
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
        return this.super('upsert')(...arguments).then(r=>{
				if(all.filter(b=>b._id==a._id).length==0){
                    all.push(r)
					if(!r.relationShip)
						children.push(r)
                }
			})
    }

    static remove(child,success, error){
        return this.super('remove')(...arguments)
			.then(a=>{
                children=children.filter((a)=>a._id!=child)
                all=all.filter((a)=>a._id!=child)
                if(currentChild._id==child)
                    Family.currentChild=children[0]
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
		if(typeof(a)=='string')
			a=children.find(b=>b.name==a)
		
		a= a || null
		
        if(a!=currentChild){
			lastChild=currentChild
			currentChild=a
			event.emit("change",currentChild, lastChild)
		}
    }

    static restoreLast(){
        this.currentChild=lastChild
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
