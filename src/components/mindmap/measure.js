let tester=null
export class Measure{
    constructor({fonts,size}){
		this.fontFamilys=fonts.split(",").map(a=>a.trim()).filter(a=>!!a)
        this.fontFamily=this.fontFamilys[0]
        this.size=size
        if(!tester){
            this.lineHeight()
        }
    }

	widthString(width,string){
		return Array.prototype.reduce.call(string,(state,a)=>{
			if(state.done)
				return state

			let aWidth=this.stringWidth(a)
			if(state.width+aWidth>width){
				state.done=true
				if(width-state.width>state.width+aWidth-width){
					state.width+=aWidth
					state.text+=a
				}
			}else{
				state.width+=aWidth
				state.text+=a
			}
			return state
		},{width:0,text:"",done:false}).text.length
    }
    
    lineHeight(){
		if(!tester){
			let container=document.createElement("div")
			container.style="position:absolute;top:-1000px"
			document.body.appendChild(container)
			container.innerHTML=`<svg viewBox="0 0 ${100} ${100}" xmlns="http://www.w3.org/2000/svg"><text>Ä</text></svg>`
			tester=container.querySelector('text')
		}
		tester.style=this.cssStyle()
        tester.firstChild.data="Ä"
        const {height,y, baseline=-y}=tester.getBBox()
        return height
    }

    cssStyle(){
        return `white-space:pre;
            font-family:${this.fontFamily};
            font-size:${this.size}pt;
            `
    }

    stringWidth(word){
		tester.style=this.cssStyle()
        tester.firstChild.data=word
        return tester.getBBox().width
    }
}