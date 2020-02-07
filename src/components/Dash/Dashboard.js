import React, { Component } from 'react'
import {connect} from "react-redux"
import {changeEmail,updateState} from "../../REDUX/Action"
import firebase from 'firebase'
import 'firebase/database'
import RegisterForm from '../Auth/RegisterForm'

// import Perfomance from "./Perfomance"

export class Dashboard extends Component {
    constructor(props){
        super(props)
        this.database = firebase.database()
        this.rootRef = this.database.ref("notes")
        this.state={
            data:[],
            authenticated:'',
            email:"",
            name:"",
            username:"",
            isLoading:true,
        }
    }
    componentDidMount(){
        document.title ="Dashboard"
        // ordering auth to bring data to show their table
            const{email, authenticated} = this.props.auth
            if(authenticated){
                let newEmail = ""
            for(let i=0; i <email.length; i++){
                if(email[i]=="@"){
                  newEmail += "AT"
                }
                else if(email[i]=="."){
                  newEmail += "dot"
                }
                else{
                  newEmail += email[i]
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
                authenticated:this.props.auth.authenticated,
                email:newEmail
            })
            this.props.changeEmail(newEmail, "auth.name", "auth.username")
            }

            this.setState({
                ...this.state,
                authenticated:this.props.auth.authenticated,
                isLoading:false
            })
            
          
    }
    render() {
        const {notes} = this.props
        const {authenticated}=this.props.auth
        if(authenticated){
            return <div className="p-2 bg-white">
               <h3>Hello !</h3>
               <p className="d-flex flex-column">
                   <img src="./images/cycle2.gif" className="img-fluid cycle-animate"/>
                  <p> Welcome to <strong>MakeNotes.com</strong>. You have Total {notes.length} notes in your list. <br/></p>
               </p>
            </div>
        }
        else {
            if(this.state.isLoading){
                return <h4>Loding....</h4>
            }
            else{
                return (
                    <RegisterForm/>
                )
            }
            

        }
       
    }
}
const mapStateToProps = state=>{
    return {
        email:state.email,
        notes:state.notes,
        state:state,
        name:state.name,
        auth:state.auth
    }
}
const mapStateToDispatch= dispatch=>{
    return {
      changeEmail:(email,name)=>dispatch(changeEmail(email,name)),
      updateState:state=>dispatch(updateState(state))
    }
  }

export default connect(mapStateToProps, mapStateToDispatch)(Dashboard)
