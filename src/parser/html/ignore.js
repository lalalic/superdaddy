import {Visitor as Any} from "docx4js"

export default class Ignore extends Any{
    _shouldIgnore(){
        return true
    }
}
