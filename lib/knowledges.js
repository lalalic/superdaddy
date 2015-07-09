var {React,Component,UI:{List, CommandBar}}=require('dashboard'),
    {DialogCommand}=CommandBar,
    dbKnowledge=require('./db/knowledge');

export default class Knowledges extends Component{
    render(){
        return (
            <div>
                <List
                    model={dbKnowledge.find()}
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
                        (<input type="search"
                            placeholder="search"
                            onFocus={()=>this.refs.search.show()}/>),
                        "Refresh"]}
                    onSelect={this.onSelect.bind(this)}/>

                <Search ref="search" label="search" self={()=>this.refs.search}/>
            </div>
        )
    }

    onSelect(command){
        switch(command){
        case 'Refresh':

            break
        }
    }
}

class Search extends DialogCommand{
    renderContent(){
        return (
            <List>
                <List.Item>Capability</List.Item>
            </List>
        )
    }
}

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
Item.contextTypes=Knowledges.contextTypes={router:React.PropTypes.func}
