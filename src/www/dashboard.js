import React,{Fragment} from "react"
import Tutorial from "qili-app/components/tutorial"

export default ({children, routes:[root],location:{pathname},...props})=>{
    return (
        <Fragment>
            <header style={{clear:"both",zIndex:2,position:"fixed",top:0,width:"100%",height:50,lineHeight:"50px",display:"flex",flexDirection:"row",backgroundColor:"#303848",color:"white"}}>
                <div style={{flex:"none",paddingLeft:20,margin:"auto"}}>
                    <a href="/">
                        <img src="/images/logo.svg" style={{width:30,height:30,padding:10}}/>
                        <strong style={{float:"right"}}>激励馆</strong>
                    </a>
                </div>

                <center style={{flex:"1 1 100%"}} className="fs">
                    <a href="/knowledge/">发现经验</a>
                    <a href="/tool/">学习工具</a>
                    <a href="/daka/">激励打卡</a>
                </center>

                <div style={{flex:"none",paddingRight:20,margin:"auto"}}>
                    <a href="https://app.jiliguan.com" style={{textDecoration:"none",padding:10,whiteSpace:"nowrap", borderRadius:5, border:"1px solid white",background:'transparent',color:"white"}}>
                        登录/注册
                    </a>
                </div>
            </header>

            <Tutorial 
                    style={{height:500,zIndex:"initial",position:"initial",marginTop:50}}
                    label={null}
                    slides={
                        [
                            {
                                media:`/images/tutorial/time.png`,
                                mediaBackgroundStyle:{
                                    height:'calc(100% - 60px)'
                                },
                                title: "时间管理"
                            },
                            {
                                media:`/images/tutorial/score.png`,
                                mediaBackgroundStyle:{
                                    height:'calc(100% - 60px)'
                                },
                                title:"激励积分"
                            },
                            {
                                media:`/images/tutorial/knowledge.png`,
                                mediaBackgroundStyle:{
                                    height:'calc(100% - 60px)'
                                },
                                title:"发现分享"
                            }
                        ]
                    }
                    {...props}/>
            
                    
            <section style={{background:"white",marginTop:55}}>
                <div style={{minHeight:"500px"}} id="app">{children}</div>
            </section>

            <footer style={{padding:10,background:"#303848",color:"white", display:"flex",flexDirection:"column"}}>
                <div style={{flex:"1 1 100%"}}>

                </div>
                <div style={{flex:"none",borderTop:"1px solid gray", fontSize:"small"}}>
                    <p>
                        <span>© 2019 激励馆</span>
                        <span style={{float:"right"}}>京ICP备15008710号-4</span>
                    </p>
                </div>
            </footer>
        </Fragment>
    )
}