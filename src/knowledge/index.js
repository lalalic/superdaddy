import {File as file, ACTION as qiliACTION} from "qili-app"
import extract from './extract'
import Assembler from "publish/assemble"

export {default as Knowledges} from "./list"
export {default as Creatable} from "./list-with-creator"
export {default as NewKnowledge} from "./create"
export {default as Knowledge} from "./info"
import {compile} from "./code"


const DOMAIN="knowledge"
export const ACTION={
    SELECT_DOCX: a=>dispatch=>{
		return file.select()
			.then(file=>{
				dispatch(qiliACTION.LOADING(true))
				return extract(file)
			})
			.then(docx=>dispatch({type:`@@${DOMAIN}/selectedDocx`,payload:docx}))
			.finally(()=>dispatch(qiliACTION.LOADING(false)))
	},
		
	RESET: ()=>({type:`@@${DOMAIN}/reset`}),
	
	PREVIEW: (knowledge, props)=>dispatch=>{
		dispatch(qiliACTION.LOADING(true))
		return new Assembler({template:knowledge.template, goal:"print", ...props})
				.assemble()
				.then(docx=>docx.save(`打印(${knowledge.title}).docx`))
				.finally(()=>dispatch(qiliACTION.LOADING(false)))
	},
	
	BUY: ({sale})=>{
		window.open(sale,"superdaddy buy")
	},
	
	HOMEWORK: (knowledge, props)=>dispatch=>{
		dispatch(qiliACTION.LOADING(true))
		return new Assembler({template:knowledge.template, goal:"homework", ...props})
				.assemble()
				.then(docx=>docx.save(`作业(${knowledge.title}).docx`))
				.finally(()=>dispatch(qiliACTION.LOADING(false)))
	},
	WECHAT: ({title,summary,figure,id},scene)=>{
		Wechat.share({
				scene:Wechat.Scene[scene]
				,message:{
					title
					,messageExt: summary || title
					,thumb: figure
					,media:{
						type: Wechat.Type.WEBPAGE
						,webpageUrl: `https://static.papazai.com/1/static/knowledge/${id}.html`
					}
				}
			},a=>1,e=>e)
		return {type:`@@{DOMAIN}/share2wechat`, payload:knowledge}
	},
}

export const REDUCER=(state={}, {type, payload})=>{
    switch(type){
    case `@@${DOMAIN}/selectedDocx`:
        if(state.selectedDocx && state.selectedDocx.revoke)
            state.selectedDocx.revoke()
        return {...state,selectedDocx:payload}
	case `@@${DOMAIN}/reset`:
		if(state.selectedDocx && state.selectedDocx.revoke){
            state.selectedDocx.revoke()
		}
		return {...state, selectedDocx:undefined}
    }
	return state
}