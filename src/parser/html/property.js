import Visitor from "./visitor"
import paragraph from "./p"
import document from "./document"

export default class Property extends Visitor{
	constructor(){
		super(...arguments)
        this.container=this.findTypedParent(paragraph,document)
	}
    _shouldIgnore(){
        return this.constructor.Properties.indexOf(this.srcModel.key)!=-1
    }
	
	static Properties="title,keywords,category".split(',')
}