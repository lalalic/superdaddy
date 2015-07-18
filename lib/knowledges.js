var {React,Component,UI:{List, CommandBar}}=require('dashboard'),
    {DialogCommand}=CommandBar,
    {RaisedButton,ClearFix}=require('material-ui'),
    dbKnowledge=require('./db/knowledge');

export default class Main extends Component{
    render(){
        var {query}=this.props
        return (
            <div>
                <List
                    ref="list"
                    model={dbKnowledge.find(query)}
                    loading={{text:"Loading Knowledges"}}
                    empty={{
                        iconClassName:"icon-android-add",
                        text:"No knowledge yet, Please stay tune"
                    }}
                    pageSize={20}
                    template={Item}/>

                <CommandBar
                    className="footbar centerinput"
                    items={["Back",
                        (<input
                            ref="byTitle"
                            type="search"
                            placeholder="search"
                            defaultValue={query.title}
                            style={{fontSize:20}}
                            onFocus={()=>this.refs.search.show()}/>),
                        "Refresh"]}
                    onSelect={this.onSelect.bind(this)}/>

                <Search ref="search"
                    label="search"
                    self={()=>this.refs.search}
                    onSearch={this.search.bind(this)}
                    />
            </div>
        )
    }

    onSelect(command){
        switch(command){
        case 'Refresh':
            this.setState({refresh:true})
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
        var {age,gender,goal}=this.context.router.getCurrentQuery()
        return [
            (<CheckGroup ref="age" key="Age" label="Age" single={true}
                selected={age}
                items={"0.5, 1, 2, 3, 4, 5, 6, 8, 10".split(',')}/>),
            (<CheckGroup ref="gender" key="Gender" label="Gender"
                selected={gender}
                items={"Girl,Boy".split(',')}/>),
            (<CheckGroup ref="goal" key="Goal" label="Goal"
                selected={goal}
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
            goal=Array.from(this.refs.goal.state.selected);
        onSearch && onSearch({age:age,gender:gender,goal:goal})
    }
}

Search.contextTypes={router:React.PropTypes.func}

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
        var {model, image, ...others}=this.props
        return (
            <div className="li" {...others} onClick={this.onDetail.bind(this)}>
                <div className="content">
                    <div>
                        <h4>{model.title}</h4>
                    </div>
                    <div className="photo">
                        <img src={model.photo||image}/>
                    </div>
                </div>
            </div>
        )
    }
    onDetail(){
        this.context.router.transitionTo('knowledge',dbKnowledge.current=this.props.model)
    }
}

Item.defaultProps={
    image:"images/knowledge.jpg"
}
Item.contextTypes=Main.contextTypes={router:React.PropTypes.func}
