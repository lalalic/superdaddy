var {Model}=require('dashboard'),
    Promise=require('apromise'),
    all,
    children=[],
    currentChild;
export default class Family extends Model{
    static get _name(){
        return 'family'
    }

    static init(db){
        this.super('init')(db)
        var p=new Promise(), remote=false;
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
            p.resolve()
        },p.reject.bind(p))
        return p
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
}
