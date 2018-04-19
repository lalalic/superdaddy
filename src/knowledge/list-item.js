import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose, getContext, withProps} from "recompose"
import {withFragment} from "qili"

import {relative} from 'components/calendar'

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
                        <div><img src={model.photos[0]}/></div>
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
                    <div><img src={model.photos[0]}/></div>
                    <div><img src={model.photos[1]}/></div>
                    <div><img src={model.photos[2]}/></div>
                </div>
            {this._more(model)}
            </div>
        )
    }

    _more(model){
        var time=relative(model.createdAt||model.updatedAt)

        var zan=model.zans ? (<div><IconThumbup/>{model.zans}</div>) : null
        return (
            <div className="more">
                <time>{time}</time>
                {zan}
            </div>
        )
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
				zans
				createdAt
				updatedAt
			}
		`}
	)
)(Item)
