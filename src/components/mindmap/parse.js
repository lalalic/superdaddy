export default function parse(mind=""){
    if(!mind)
        return null
    if(mind.startsWith("mindmap://")){
        mind=mind.substring("mindmap://".length)
    }
	function tocAppend({outline,name}, toc=[]){
		if(toc.length==0){
			toc.push({outline,name})
		}else if(outline==toc[0].outline){
			toc.push({outline,name})
		}else if(outline>toc[0].outline){
			const current=toc[toc.length-1]
			if(!current.children){
				current.children=[]
			}
			tocAppend(arguments[0], current.children)
		}
		return toc
	}
    let o=0
    const outline=mind.split(",").reduce((as,a)=>{
        as.data.splice(as.data.length,0,...a.split("(").map((b,i)=>{
            o=as.outline+i
            const j=b.indexOf(")")
            if(j!=-1){
                const a={name:b.substring(0,j), outline:o}
				o=o-(b.length-j)
				return a
            }
            return {name:b, outline:o}
        }))
        as.outline=o
        return as
    },{outline:1,data:[]}).data
    const toc=outline.reduce((toc,a)=>tocAppend(a,toc),[])
    return toc[0]
}