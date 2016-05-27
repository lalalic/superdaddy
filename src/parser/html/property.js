import Visitor from "./visitor"

export default class Property extends Visitor{
    visit(){
		
	}
    _shouldIgnore(){
        return this.constructor.Properties.indexOf(this.srcModel.key)!=-1
    }
	
	static Properties="title,keywords,category,abstract,subject".split(',')
}