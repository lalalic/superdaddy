var {React,Component}=require('dashboard')

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            sections:[]
        }
    }
    render(){
        var {sections}=this.state,
            uiSections=sections.map(function(section){
                return (<Section />)
            })
        return (
            <div class="editor">
                {uiSections}
            </div>
        )
    }
}

Main.propTypes={
    content: React.PropTypes.object.required
}

class Section extends Component{
    constructor(props){
        super(props)
        this.state={
            description:null,
            photos:[]
        }
    }
    render(){
        var {description, photos}=this.state,
            uiPhotos=photos.map(function(photo){
                    return (<img src={photo}/>)
                })

        uiPhotos.length<9 && uiPhotos.push((<img onClick={this.onPhoto.bind(this)}/>))

        return (
            <div class="section">
                <div>{uiPhotos}</div>
                <textarea placeholder="这一刻的想法" value={description}/>
            </div>
        )
    }
    onPhoto(){

    }
}
