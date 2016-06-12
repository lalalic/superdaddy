import {React,Component,UI} from 'qili-app'
import {RaisedButton,ClearFix} from 'material-ui'
import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconThumbup from "material-ui/svg-icons/action/thumb-up"

import dbKnowledge from './db/knowledge'
import uiKnowledge from './knowledge'
import moment from "moment"

const  {List, CommandBar, Empty}=UI
        ,{DialogCommand}=CommandBar

export default class Knowledges extends Component{
    constructor(p){
        super(p)
        this.state={model:dbKnowledge.find(this.props.query)}
    }
    render(){
        var {model}=this.state,
            {query}=this.props
        return (
            <div>
                <List
                    ref="list"
                    model={model}
                    empty={<Empty icon={<IconKnowledges/>} text="No knowledge yet, Please stay tune"/>}
                    pageSize={20}
                    template={Item}/>

                <CommandBar
                    className="footbar centerinput"
                    primary="Create"
                    items={["Back",
                        (<input
                            ref="byTitle"
                            type="search"
                            placeholder="Search"
                            defaultValue={query.title}
                            style={{fontSize:14,padding:10}}
                            onFocus={()=>this.refs.search.show()}/>),
                        {action:"Create", icon:require("material-ui/svg-icons/content/create")}
                    ]}
                    onSelect={this.onSelect.bind(this)}/>

                <Search ref="search" onSearch={()=>this.search()} />
            </div>
        )
    }

    onSelect(command){
        switch(command){
        case 'Create':
            this.context.router.transitionTo('create')
            break
        }
    }

    search(props){
        this.refs.search.dismiss()
        var {value:title=""}=this.refs.byTitle.getDOMNode()
        title=title.trim()
        if(title.length)
            props.title=title
        this.context.router.replaceWith("knowledges",null, props)
    }
}

class Search extends DialogCommand{
    renderContent(){
        var {age,gender,category}=this.context.router.getCurrentQuery()
        return [
            (<CheckGroup ref="age" key="Age" label="Age (Year)" single={true}
                selected={age}
                items={"0.5, 1, 2, 3, 4, 5, 6, 8, 10".split(',')}/>),
            (<CheckGroup ref="gender" key="Gender" label="Gender"
                selected={gender}
                items={"Girl,Boy".split(',')}/>),
            (<CheckGroup ref="category" key="Category" label="Category"
                selected={category}
                items={"Observe, Study, Sport".split(',')}/>),
            (<div key="actions" style={{padding:10, textAlign:'center'}}>
                <RaisedButton primary={true} onClick={this.search.bind(this)}>Search</RaisedButton>
                </div>)
        ]
    }

    search(){
        var {onSearch}=this.props,
            age=this.refs.age.state.selected,
            gender=Array.from(this.refs.gender.state.selected),
            category=Array.from(this.refs.category.state.selected);
        onSearch && onSearch({age:age,gender:gender,category:category})
    }
}

Search.contextTypes={router:React.PropTypes.object}

class CheckGroup extends Component{
    constructor(props){
        super(props)
        this.componentWillReceiveProps(this.props)
    }
    componentWillReceiveProps(next){
        var {selected, single}=next
        this.state={}
        if(single)
            this.state.selected=selected;
        else if(Array.isArray(selected)){
            this.state.selected=new Set(selected)
        }else
            this.state.selected=new Set()

    }
    render(){
        var{items, label, onChange, single}=this.props,
            {selected}=this.state,
            selectedStyle={padding:5, borderRight:'1px solid lightgray',
                color:'white',backgroundColor:'red'},
            unselectedStyle=Object.assign({},selectedStyle,{color:'black', backgroundColor:'transparent'});

        return(<ClearFix style={{padding:10}}>
                <span>{label}</span>
                <span style={{float:'right',padding:'5px 0px', border:'1px solid lightgray', borderRight:0}}>
                    {items.map(function(a){
                        if(typeof(a)!='string')
                            return a;
                        a=a.trim();
                        return (<span
                            key={a}
                            onClick={()=>this.onSelect(a)}
                            style={(single ? selected==a : selected.has(a)) ? selectedStyle : unselectedStyle}>
                            {a}</span>)
                    }.bind(this))}
                </span>
            </ClearFix>)
    }
    onSelect(item, a={}){
        var{single}=this.props,
            {selected}=this.state;

        if(single)
            this.setState({selected: selected==item ? undefined : item});
        else{
            selected[selected.has(item) ? 'delete' : 'add'](item)
            this.setState({selected:selected})
        }
    }
}
CheckGroup.defaultProps={single:false}

class Item extends Component{
    render(){
        var {model:{photos=[]}}=this.props
        switch(photos.length){
        case 0:
            return this._0photo()
        case 1:
        case 2:
            return this._1photo()
        default:
            return this._3photo()
        }
    }

    _0photo(){
        var {model,...others}=this.props
        return (
            <div className="li inset photo0" {...others} onClick={()=>this.onDetail()}>
                <div className="title">{model.title}</div>
                <div className="summary">{model.summary}</div>
                {this._more(model)}
            </div>
        )
    }
    _1photo(){
        var {model,...others}=this.props
        return (
            <div className="li inset photo1" {...others} onClick={()=>this.onDetail()}>
                <div>
                    <div className="title">{model.title}</div>
                    {this._more(model)}
                </div>
                <div className="photos">
                    <div><img src={model.photos[0]}/></div>
                </div>
            </div>
        )
    }

    _3photo(){
        var {model,...others}=this.props
        return (
            <div className="li inset photo3" {...others} onClick={()=>this.onDetail()}>
                <div className="title">{model.title}</div>
                <div className="photos">
                    <div><img src={model.photos[0]}/></div>
                    <div><img src={model.photos[1]}/></div>
                    <div><img src={model.photos[2]}/></div>
                </div>
            {this._more(model)}
            </div>
        )
    }

    _more(model){
        var time=uiKnowledge.date2String(model.createdAt||model.updatedAt)
 
        var zan=model.zans ? (<div><IconThumbup/>{model.zans}</div>) : null
        return (
            <div className="more">
                <time>{time}</time>
                {zan}
            </div>
        )
    }
    onDetail(){
        this.context.router.transitionTo('knowledge',this.props.model)
    }
}
Item.contextTypes=Knowledges.contextTypes={router:React.PropTypes.object}
