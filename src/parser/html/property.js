import Visitor from "./visitor"

export default class Property extends Visitor{
    _shouldIgnore(){
        return this.constructor.Properties.indexOf(this.srcModel.key)!=-1
    }
	
	static Properties="title,keywords,category".split(',')
}