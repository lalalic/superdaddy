import React, {Component} from "react"

import {compose} from "recompose"
import {withFragment} from "qili-app"

import {relative} from 'components/calendar'
import MindMap from "components/mindmap"
import IconFavorited from "material-ui/svg-icons/action/favorite"

export class Item extends Component{
    render(){
        let {model:{photos=[]}}=this.props
		photos=photos||[]
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
        var {model,toKnowledge,style,}=this.props
        return (
            <div className="li inset photo0" style={style}>
                <div className="title"  onClick={()=>toKnowledge(model.id)}>{model.title}</div>
                <div className="summary">{model.summary}</div>
                {this._more(model)}
            </div>
        )
    }
	
    _1photo(){
        var {model,toKnowledge,style,}=this.props
        return (
            <div className="li inset photo1" style={style}>
                <div className="layout">
                    <div>
                        <div className="title" onClick={()=>toKnowledge(model.id)}>{model.title}</div>
                        {this._more(model)}
                    </div>
                    <div className="photos">
                        <div><IMG src={model.photos[0]}/></div>
                    </div>
                </div>
            </div>
        )
    }

    _3photo(){
        var {model,toKnowledge,style,}=this.props
        return (
            <div className="li inset photo3" style={style}>
                <div className="title" onClick={()=>toKnowledge(model.id)}>{model.title}</div>
                <div className="photos">
                    <div><IMG src={model.photos[0]}/></div>
                    <div><IMG src={model.photos[1]}/></div>
                    <div><IMG src={model.photos[2]}/></div>
                </div>
            {this._more(model)}
            </div>
        )
    }

    _more(model){
        var time=relative(model.createdAt||model.updatedAt)
        return (
            <div className="more">
                <span>{time}</span>
                {!!model.favoriterCount && (
                    <span>
                        {model.favoriterCount}收藏
                    </span>
                )}
                {!!model.viewed && (
                    <span>
                        {model.viewed}围观
                    </span>
                )}
                {!!model.accomplished && (
                    <span>
                        {model.accomplished}完成
                    </span>
                )}
            </div>
        )
    }
}

const IMG=({src})=>{
    if(src.startsWith("mindmap://")){
        return <MindMap className="img" src={src}/>
    }else{
        return <img src={src}/>
    }
}

export default compose(
	withFragment({
		model:graphql`
			fragment listItem on Knowledge{
				id
				title
				summary
				photos
				createdAt
				updatedAt

                favoriterCount
				viewed
                accomplished
			}
		`}
	)
)(Item)
