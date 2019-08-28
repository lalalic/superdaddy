import React from "react"
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'

import Content from "knowledge/content"
import AD from 'components/ad'

import { compose } from "recompose";
import {withFragment} from "qili-app/graphql"

import IconBuy from "material-ui/svg-icons/action/add-shopping-cart"
import IconPreview from "material-ui/svg-icons/action/print"
import IconTimer from "material-ui/svg-icons/av/av-timer"
import IconHomework from "material-ui/svg-icons/notification/event-note"


const TitleBar=({title})=><h1><center>{title}</center></h1>

export class Knowledge extends React.Component{
    goApp(){
        window.location.href=`https://app.jiliguan.com/${location.pathname}`
    }

    render (){
        const {knowledge, buy}=this.props
        const {sale, hasPrint, hasHomework, supportTimer}=knowledge
        const tools=[]


		if(sale){
			tools.push(<BottomNavigationItem
						key="sale"
						label="购买"
						icon={<IconBuy color="red"/>}
						onClick={buy}
						/>)
        }

        if(hasHomework){
			tools.push(<BottomNavigationItem
						key="homework"
						label="作业"
                        icon={<IconHomework color="aqua"/>}
                        onClick={this.goApp}
						/>)
		}        
        
        if(hasPrint){
			tools.push(<BottomNavigationItem
						key="preview"
						label="预览打印"
						icon={<IconPreview color="fuchsia"/>}
                        onClick={this.goApp}
						/>)
        }
        
        if(supportTimer){
			tools.push(<BottomNavigationItem
						key="startTimer"
						label="记时器"
						icon={<IconTimer color="black"/>}
						onClick={this.goApp}
						/>
			)
        }

        
        return (
            <div>
                <div className="knowledge">
                    <Content knowledge={knowledge} titleBar={<TitleBar/>}/>
                </div>

                <article>
                    <section>
                        <center style={{fontSize:"x-small"}}><i>以下功能只有登录用户才能使用</i></center>
                        <BottomNavigation>
                            {tools}
                        </BottomNavigation>

                        <AD object={knowledge}/>
                    </section>
                </article>
            </div>
        )
    }
}

export default compose(
    withFragment({
        knowledge:graphql`
            fragment knowledge on Knowledge{
                hasHomework
                hasPrint
                supportTimer
                sale
                ...content_knowledge
            }
        `
    })
)(Knowledge)