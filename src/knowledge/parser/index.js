import docx4js from "docx4js"
import react from "react"
import reactDOM from "react-dom/server"

export default function parse(file){
	return docx4js.load(file).then(docx=>{
		let doc=docx.render(createComponent)
		let html=reactDOM.renderToStaticMarkup(doc)
		let {properties, steps, images}=doc.props
		return {
			html,
			properties,
			steps,
			images
		}
	})
}

const TYPE={
	"p":"p",
	"r":"span",
	"t":({children})=>children,
	"inline.picture":"img",
	"hyperlink":"a",
	"tbl":"table",
	"tr":"tr",
	"td":"td",
	"property":()=>null
}

function createComponent(type){
	return TYPE[type]||"span"
}
