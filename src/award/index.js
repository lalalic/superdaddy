import React, {Component,Fragment} from "react"
import Editor from "./editor"

export default class extends Component{
    render(){
        const {awards, active}=this.props
        return (
            <Fragment>
                <Editor award={active}/>
                <table>
                    <th>
                        <td></td>
                        <td>名称</td>
                        <td>分数</td>
                    </th>    
                    <tbody>
                        {awards.map(({_id,name,score,url})=>{
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td><a href={url}>{name}</a></td>
                                <td>{score}</td>
                            </tr>
                        })}
                    </tbody>    
                </table>
            </Fragment>
        )
    }
}