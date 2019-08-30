import React, {Component} from "react"
import IconButton from "material-ui/IconButton"
import IconPrint from "material-ui/svg-icons/action/print"
import Print from "react-to-print"

export default ({onClick, autoPrint, pageStyle,...props})=>(
	<Print 
		trigger={()=>(<PrintTrigger onNativeClick={onClick} printReady={autoPrint}/>)}
		pageStyle={`${defaultPageStyle} ${pageStyle||""}`}
		{...props}
		/>
)
 
export class PrintTrigger extends Component{
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

export function print({html, style, onAfterPrint}){
	const printWindow = document.createElement("iframe");
	printWindow.style.position = "absolute";
	printWindow.style.top = "-10000px";
	printWindow.style.left = "-10000px";
	printWindow.style.width="100%"
	printWindow.style.height="100%"
	printWindow.onload=function(){
		 /* IE11 support */
		 if (window.navigator && window.navigator.userAgent.indexOf("Trident/7.0") > -1) {
			printWindow.onload = null;
		}
		const domDoc = printWindow.contentDocument || printWindow.contentWindow.document;
		domDoc.open();
		domDoc.write(html);
		domDoc.close();

		const styleEl = domDoc.createElement("style");
		styleEl.appendChild(domDoc.createTextNode(`${defaultPageStyle}${style||""}`));
		domDoc.head.insertBefore(styleEl,domDoc.head.firstChild);

		printWindow.contentWindow.focus();
		printWindow.contentWindow.print();
		setTimeout(() => {
            printWindow.parentNode.removeChild(printWindow);
        }, 500);

		if (onAfterPrint) {
			onAfterPrint(printWindow);
		}
	}
	document.body.appendChild(printWindow);
}

export const defaultPageStyle=`
	@page { 
		margin: 0mm auto; 
	} 
	
	@media print {
		body { 
			-webkit-print-color-adjust: exact; 
		}
		.print-page{
			page-break-before:always;
			page-break-after:always;
			page-break-inside:avoid;
		}	
	}
`