import React, { Component } from 'react'
import {connect} from "react-redux"
import {changeEmail,updateState} from "../../REDUX/Action"
import firebase from 'firebase'
import 'firebase/database'

export class Dashboard extends Component {
    constructor(props){
        super(props)
        this.database = firebase.database()
        this.rootRef = this.database.ref("notes")
        this.state={
            data:[],
            authenticated:'',
            email:""
        }
    }
    componentDidMount(){
        document.title ="Dashboard"
        // ordering auth to bring data to show their table
        this.database.ref('auth').orderByKey().on('value', snapshot=>{
            let auth = snapshot.val()
            if(auth.authenticated){
                let newEmail =""
            for(let i=0; i < auth.email.length; i++){
                if(auth.email[i]=="@"){
                  newEmail += "AT"
                }
                else if(auth.email[i]=="."){
                  newEmail += "dot"
                }
                else{
                  newEmail += auth.email[i]
                }
            }
            this.database.ref("notes").child(newEmail).orderByKey().on('value',snapshot=>{
                    let myData = snapshot.val()
                    if(myData !=undefined || myData!=null){
                        const data = Object.values(myData)
                        if(data.length !==0){
                            this.props.updateState(data)
                        } 
                        }
            })
            // console.log("didmoutn email", this.props)

            this.setState({
                ...this.state,
                authenticated:auth.authenticated,
                email:newEmail
            })
            this.props.changeEmail(newEmail)
            }

            this.setState({
                ...this.state,
                authenticated:auth.authenticated,
            })
            
          })
    }
    render() {
        const {notes} = this.props
        if(this.state.authenticated){
            return <h1>
                Working
            </h1>
        }
        else {
            return (
                <div>
                   <h1>
                       Welcome {}
                    </h1> 
                </div>
            )

        }
       
    }
}
const mapStateToProps = state=>{
    return {
        email:state.email,
        notes:state.notes,
        state:state
    }
}
const mapStateToDispatch= dispatch=>{
    return {
      changeEmail:(email,name)=>dispatch(changeEmail(email,name)),
      updateState:state=>dispatch(updateState(state))
    }
  }

export default connect(mapStateToProps, mapStateToDispatch)(Dashboard)
