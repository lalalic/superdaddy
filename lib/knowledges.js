var {React,Component,UI:{List}}=require('dashboard'),
    Knowledges=require('./db/knowledge');

export default class Main extends Component{
    render(){
        return (<List
                model={Knowledges}
                empty={{
                    iconClassName:"icon-android-add",
                    text:"No knowledge yet, Please stay tune"
                }}
                pageSize={20}
                template={Item}
            />)
    }
}

class Item extends Component{
    render(){
        var {model, image, ...others}=this.props
        return (
            <div className="li" {...others}>
                <div className="list-content" onClick={this.onDetail.bind(this)}>
                    <p>{model.title}</p>
                    <div className="list-photo">
                        <img src={model.photo||image}/>
                    </div>
                </div>
                <div className="list-toolbar">
                </div>
            </div>
        )
    }
    onDetail(){
        this.context.router.transitionTo('knowledge',Knowledges.current=this.props.model)
    }
}

Item.defaultProps={
    image:"images/knowledge.jpg"
}
Item.contextTypes={router:React.PropTypes.func}
