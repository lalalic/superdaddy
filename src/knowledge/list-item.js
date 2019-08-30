import React, {Component} from "react"
import {Link} from "react-router"
import {compose} from "recompose"
import {withFragment} from "qili-app/graphql"

import {relative} from 'components/calendar'
import MindMap from "components/mindmap"

import IconFavorited from "material-ui/svg-icons/action/favorite"
import IconViewed from "material-ui/svg-icons/action/visibility"
import IconAccomplished from "material-ui/svg-icons/notification/event-available"
import IconTasking from "material-ui/svg-icons/notification/event-note"

import smartNum from "../tools/number"

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
                <div className="title"><Link to={toKnowledge(model.id)}>{model.title}</Link></div>
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
                        <div className="title"><Link to={toKnowledge(model.id)}>{model.title}</Link></div>
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
                <div className="title"><Link to={toKnowledge(model.id)}>{model.title}</Link></div>
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
        const iconStyle={width:10,height:10}
        const {children}=this.props
        return (
            <div className="more">
                <span>{time}</span>
                {!!model.favorited && (
                    <span>
                        {smartNum(model.favorited)}<IconFavorited  style={iconStyle}/>
                    </span>
                )}
                {!!model.viewed && (
                    <span>
                        {smartNum(model.viewed)}<IconViewed  style={iconStyle}/>
                    </span>
                )}
                {!!model.accomplished && (
                    <span>
                        {smartNum(model.accomplished)}<IconAccomplished style={iconStyle}/>
                    </span>
                )}
                {!!model.tasking && (
                    <span>
                        {smartNum(model.tasking)}<IconTasking style={iconStyle}/>
                    </span>
                )}
                {children}
            </div>
        )
    }
}

const IMG=({src})=>{
    if(src.startsWith("mindmap://")){
        return <x-mindmap className="img" src={src}/>
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

                favorited
				viewed
                accomplished
                tasking
			}
		`}
	)
)(Item)
