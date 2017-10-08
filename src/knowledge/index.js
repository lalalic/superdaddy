import file from "qili/components/file"
import extract from './extract'
import Assembler from "publish/assemble"

export {default as Knowledges} from "./list"
export {default as Creatable} from "./list-with-creator"
export {default as NewKnowledge} from "./create"
export {default as Knowledge} from "./info"


const DOMAIN="knowledge"
export const ACTION={
    SELECT_DOCX: a=>dispatch=>file.select()
		.then(file=>extract(file))
        .then(docx=>dispatch({type:`@@${DOMAIN}/selectedDocx`,payload:docx})),
		
	RESET: ()=>({type:`@@${DOMAIN}/reset`}),
	
	PREVIEW: (knowledge, props)=>()=>{
		return new Assembler({template:knowledge.template, goal:"print", ...props})
			.assemble()
			.then(docx=>docx.save(`打印(${knowledge.title}).docx`))
	},
	
	BUY: ({sale})=>{
		window.open(sale,"superdaddy buy")
	},
	
	HOMEWORK: (knowledge, props)=>()=>{
		return new Assembler({template:knowledge.template, goal:"homework", ...props})
			.assemble()
			.then(docx=>docx.save(`作业(${knowledge.title}).docx`))
	},
	WECHAT: ({title,summary,figure,_id},scene)=>{
		Wechat.share({
				scene:Wechat.Scene[scene]
				,message:{
					title
					,messageExt: summary || title
					,thumb: figure
					,media:{
						type: Wechat.Type.WEBPAGE
						,webpageUrl: `http://static.papazai.com/${_id}.html`
					}
				}
			},a=>1,e=>e)
		return {type:`@@{DOMAIN}/share2wechat`, payload:knowledge}
	},
}

export const REDUCER=(state={}, {type, payload})=>{
    switch(type){
    case `@@${DOMAIN}/selectedDocx`:
        if(state.selectedDocx)
            state.selectedDocx.revoke()
        return {...state,selectedDocx:payload}
	case `@@${DOMAIN}/reset`:
		if(state.selectedDocx){
            state.selectedDocx.revoke()
			return {...state, selectedDocx:undefined}
		}
		break

    }
	return state
}