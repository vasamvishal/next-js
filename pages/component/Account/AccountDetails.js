import React from "react";
import CheckIcon from '@material-ui/icons/Check';
export default class AccountDetails extends React.PureComponent{
    render(){
        return(
            <div style={{display:"flex",justifyContent:"center"}}>
            <div><CheckIcon/></div>
            <br/>
            <br/>
            <div style={{fontWeight:"700"}}>{this.props.title}</div>
            </div>
        )
    }
}