var {React,Component}=require('dashboard')

export default class Editor extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var {content}=this.props,
            uiSections=(content||[]).map(function(section){
                return (<Section key={section.createdAt} content={section}/>)
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
        var {desc}=this.props,
            {photos}=this.state,
            uiPhotos=(photos||[]).map(function(photo){
                    return (<img key={photo} src={photo}/>)
                })

        uiPhotos.length<9 && uiPhotos.push((<img key="create" onClick={this.onPhoto.bind(this)}/>))

        return (
            <div className="section">
                <div>{uiPhotos}</div>
                <textarea placeholder="这一刻的想法" value={desc}/>
            </div>
        )
    }
    onPhoto(){

    }
}
