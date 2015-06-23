var {React,Component}=require('dashboard')

export default class Main extends Component{
    constructor(props){
        super(props)
    }
    static get name(){
        return "Editor"
    }
    render(){
        var {content}=this.props,
            uiSections=(content||[]).map(function(section){
                return (<Section content={section}/>)
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
    static get name(){
        return "Editor._Section"
    }
    render(){
        var {desc}=this.props,
            {photos}=this.state,
            uiPhotos=(photos||[]).map(function(photo){
                    return (<img src={photo}/>)
                })

        uiPhotos.length<9 && uiPhotos.push((<img onClick={this.onPhoto.bind(this)}/>))

        return (
            <div class="section">
                <div>{uiPhotos}</div>
                <textarea placeholder="这一刻的想法" value={desc}/>
            </div>
        )
    }
    onPhoto(){

    }
}
