export default class Template{
    constructor(html){
        this.contents=[]
        var matcher, lastIndex=0, reg=this.constructor.EDITABLE_REG, len=html.length
        var staticContent,key, alt
        while((matcher=reg.exec(html))!=null){
            staticContent=html.substring(lastIndex,matcher.index)
            key=matcher[1]
            alt=matcher[2]
            lastIndex=reg.lastIndex
            if(staticContent)
                this.contents.push(staticContent)
            if(key || alt)
                this.contents.push({key,alt})
        }

        if(lastIndex!=len-1)
            this.contents.push(html.substring(lastIndex,len))
    }

    static placeholder(key,alt){
        return `<editable key="${key}">${alt}</editable>`
    }

	static EDITABLE_REG=/<editable\s+key="(.*?)">(.*?)<\/editable>/gm
}
