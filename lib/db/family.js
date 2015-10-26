var {Model}=require('dashboard'),
    all,
    children=[],
    currentChild;
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
                all.forEach(function(a){
                    !a.relationShip && children.push(a)
                })
                currentChild=children[0]
                resolve()
            },reject)
        })
    }

    static get all(){
        return all
    }

    static get currentChild(){
        return currentChild
    }

    static set currentChild(a){
        currentChild=a
    }

    static get children(){
        return children
    }

    static invite(id,relationship){
        return Promise.as(id)
    }
}
