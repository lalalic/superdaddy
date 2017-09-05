import React, {Component, PropTypes} from "react"
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Waypoint from "react-waypoint"

export class PullToRefresh extends Component{
	state={
		refresh:false,
		more:false
	}
	render(){
		const {onMore, onRefresh, children}=this.props
		const {more, refresh}=this.state
		let elMore, elRefresh
		if(more){
			elMore=(
				<center>
					<RefreshIndicator
						  size={20}
						  top={0}
						  left={0}
						  status="loading"
						  style={{display:"inline-block",position:"relative"}}
						/>
					<span>正在载入更多...</span>
				</center>
			)
		}else{
			elMore=(<Waypoint onEnter={e=>{}}/>)
		}
		
		if(refresh){
			
		}else{
			
		}
		return (
			<div>
				{elRefresh}
				{children}
				{elMore}
			</div>
		)
	}	
}

export default PullToRefresh