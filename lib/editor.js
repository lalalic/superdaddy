var {React,Component,UI:{Photo}}=require('dashboard')

export default class Editor extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var {content, readonly}=this.props,
            uiSections=(content||[]).map(function(section){
                return (<Section key={section.createdAt} readonly={readonly} content={section}/>)
            })
        return (
            <div className="editor">
                {uiSections}
            </div>
        )
    }
}

class Section extends Component{
    constructor(props){
        super(props)
        this.state={
            photos: props.photos||[]
        }
    }
    render(){
        var {desc, readonly}=this.props,
            styles={width:50, height:50, iconRatio:2/3},
            {photos}=this.state,
            uiPhotos=(photos||[]).map(function(photo){
                    return (<Photo {...styles} key={photo} src={photo}/>)
                })

        if(!readonly && uiPhotos.length<9)
            uiPhotos.push((<Photo {...styles} key="create"/>))

        return (
            <div className="section">
                <div>{uiPhotos}</div>
                <textarea
                    style={{width:"100%",height:100, border:0}}
                    disabled={readonly}
                    placeholder="这一刻的想法"
                    value={desc}/>
            </div>
        )
    }
    _onPhoto(){

    }
}
