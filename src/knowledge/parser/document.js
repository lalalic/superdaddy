import React, {Component, PropTypes} from "react"
import Section from "./section"

export default class Document extends Component{
	render(){
		const {children, content}=this.props
		if(children){
			return <div>{children}</div>
		}else{
			return <Document {...this.props} children={this.parse()}/>
		}
	}
	
	parse(){
		const {content}=this.props
		let lastPieceOfLastSect=null
			content("w\\:sectPr").map(sect=>{
				let lastPiece=content(sect).parentsUtil('w\\:body')
				let children=lastPiece.prevUntil(lastPieceOfLastSect)
				let section=(<Section content={children} />)
				
				return section
			})
		}
		</Document>
	}
}