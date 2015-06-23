var {React,Component,UI:{List, CommandBar}}=require('dashboard'),
    dbKnowledge=require('./db/knowledge');

export default class Knowledges extends Component{
    render(){
        return (
            <div>
                <List
                    model={dbKnowledge}
                    empty={{
                        iconClassName:"icon-android-add",
                        text:"No knowledge yet, Please stay tune"
                    }}
                    pageSize={20}
                    template={Item}
                />
                <CommandBar
                    className="footbar"
                    items={["Back","Search","Home"]}
                    onSelect={this.onSelect.bind(this)}/>
            </div>
        )
    }

    onSelect(command){
        switch(command){
        case 'Back':
            this.context.router.goBack()
            break
        case 'Home':
            this.context.router.transitionTo('home')
            break
        }
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
