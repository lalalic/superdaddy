import docxHub from "docx-template"
import docx4js from "docx4js"


import Ignore from "./ignore"
import document from "./document"
import documentProperty from "./property"
import paragraph from "./p"
import table from "./table"
import row from "./tr"
import cell from "./td"
import text from "./text"
import image from "./image"
import hyperlink from "./hyperlink"
import step from './step'

const MODELS={
	document,
	documentProperty,
	paragraph,
	table,
	row,
	cell,
	text,
	image,
	hyperlink,
	step,
	heading: paragraph,
	header: Ignore,
	footer: Ignore,
	documentStyles: Ignore
}

class Document1 extends docx4js{
	static Factory=class extends docx4js.Factory{
		create(wXml, doc, parent, more){
			let model=super.create(...arguments)
			if(step.is(model))
				return new step.Model(...arguments)

			return model
		}
	}
}

export default function parse(file){
	return docxHub.assemble(file,{channel:"interactive"})
		.then(docx=>Document1.load(docx.data))
		.then(docx=>docx.parse(Document1.createVisitorFactory(MODELS)))
}
