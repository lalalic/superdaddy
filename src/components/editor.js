import {React,Component,UI} from 'qili-app'
import AddIcon from "material-ui/svg-icons/action/note-add"

const {Photo}=UI

export default class Editor extends Component{
    constructor(props){
        super(props)
        var {content=[],appendable}=this.props,
            additions=[];
        if(appendable)
            additions.push({photos:[],created:new Date()})
        this.state={additions}
    }

    shouldComponentUpdate(next){
        var {appendable}=next,
            additions=[];
        if(appendable)
            additions.push({photos:[]})
        this.state.additions=additions
        return next.content!=this.props.conent
    }

    render(){
        var {content=[], changeable}=this.props,
            {additions}=this.state,
            uiSections=content.map(function(section){
                return (<Section key={section.createdAt} readonly={!changeable} content={section}/>)
            }),
            now=Date.now(),
            uiAdditions=additions.map(function(section){
                return (<Section key={now++} content={section}/>)
            })

        return (
            <div className="editor">
                {uiSections}
                {uiAdditions}
                <AddIcon className="adder" onClick={e=>this.add()}/>
            </div>
        )
    }

    add(){
        this.state.additions.push({photos:[], created:new Date()})
        this.forceUpdate()
    }

    get value(){
        var {content, changeable}=this.props,
            {additions}=this.state;

        return (new Array(...content, ...additions)).filter(function notEmpty(section){
            return (section.desc && section.desc.trim().length) || section.photos.length
        })
    }

    get thumbnail(){
        var a=(new Array(...content, ...additions)).find(function (section){
            return section.photos.length
        });
        return a ? a.photos[0] : undefined
    }
}

Editor.propTypes={
    appendable: React.PropTypes.bool,
    changeable: React.PropTypes.bool
}

Editor.defaultProps={
    appendable: true,
    changeable: false
}
class Section extends Component{
    render(){
        var {readonly,content={}}=this.props;
        if(readonly)
            return this.readonly(content)

        var {desc, photos=[]}=content,
            styles={iconRatio:2/3, iconSize:{width:50, height:50}},
            i=0,
            uiPhotos=photos.map(function(photo){
                return (<Photo key={photo} {...styles}
                    onPhoto={(url)=>this.onPhoto(url,i++)}
                    src={photo}/>)
            })

        if(uiPhotos.length<9)
            uiPhotos.push((<Photo {...styles} onPhoto={this.onPhoto.bind(this)} key={Date.now()}/>))

        return (
            <div className="section">
                <div style={{textAlign:"center"}}>{uiPhotos}</div>
                <textarea
                    style={{width:"100%",border:0,height:100, fontSize:12}}
                    placeholder="这一刻的想法"
                    onChange={(e)=>content.desc=e.target.value}
                    defaultValue={desc}/>
            </div>
        )
    }

    readonly(content){
        var {desc, photos=[], createdAt}=content
        return (
            <div className="readonly">
                <p>
                    {photos.map((photo)=>(<img key={photo} src={photo}/>))}
                    {desc}<time>{createdAt}</time>
                </p>
            </div>
        )
    }

    onPhoto(url, index){
        var {content}=this.props
        if(content.photos.indexOf(url)!=-1){
            this.forceUpdate()
            return
        }

        if(index!=undefined)
            content.photos.splice(index,1,url)
        else{
            content.photos.push(url)
            this.forceUpdate()
        }
    }
}
