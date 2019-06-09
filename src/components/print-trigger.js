import React, {Component} from "react"
import {IconButton} from "material-ui"
import IconPrint from "material-ui/svg-icons/action/print"

export default class PrintTrigger extends Component{
	render(){
		const {onNativeClick}=this.props
		return (
			<IconButton onClick={onNativeClick}>
				<IconPrint color="white"/>
			</IconButton>
		)
	}

	shouldComponentUpdate({printReady, onClick:print}){
		if(printReady){
			print()
		}
		return false
	}
}

class Print extends Component{
	constructor(){
		super(...arguments)
		this.iframe=React.createRef()
		this.load=this.load.bind(this)
	}

	componentDidMount(){
		this.iframe.current.con
	}

	render(){
		return <iframe ref={this.iframe} src="blank" onload={this.load}/>
	}

	load(){
		
	}
}

export function print({html, style, onAfterPrint}){
	const printWindow = document.createElement("iframe");
	printWindow.style.position = "absolute";
	printWindow.style.top = "-1000px";
	printWindow.style.left = "-1000px";
	printWindow.onload=function(){
		 /* IE11 support */
		 if (window.navigator && window.navigator.userAgent.indexOf("Trident/7.0") > -1) {
			printWindow.onload = null;
		}
		const domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
		domDoc.open();
		domDoc.write(html);
		domDoc.close();

		const defaultPageStyle = style === undefined
                ? "@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
				: style;
		const styleEl = domDoc.createElement("style");
		styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
		domDoc.head.appendChild(styleEl);

		printWindow.contentWindow.focus();
		printWindow.contentWindow.print();
		setTimeout(() => {
            //printWindow.parentNode.removeChild(printWindow);
        }, 500);

		if (onAfterPrint) {
			onAfterPrint(printWindow);
		}
	}
	document.body.appendChild(printWindow);
}