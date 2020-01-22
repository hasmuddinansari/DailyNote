import React, { Component } from 'react'
import {connect} from "react-redux"
import {changeEmail,updateState} from "../../REDUX/Action"
import firebase from 'firebase'
import 'firebase/database'

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
            wish:""
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
                email:newEmail,
            })
            this.props.changeEmail(newEmail, auth.name, auth.username)
            }

            this.setState({
                ...this.state,
                authenticated:auth.authenticated,
            })
            
          })
    }
    render() {
        const {notes,name} = this.props
        console.log(name)
        console.log("time",this.state.wish)
        if(this.state.authenticated){
            return <div className="p-2">
               <h3>Hello {name} !</h3>
               <p>
                   Welcome to <strong>MakeNotes.com</strong>. You have Total {notes.length} notes in your list. <br/>
                   
               </p>
            </div>
        }
        else {
            return (
                <div className="bg-home p-5 text-center">
                   <h1 className="text-white">
                       Welcome 
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
        state:state,
        name:state.name
    }
}
const mapStateToDispatch= dispatch=>{
    return {
      changeEmail:(email,name)=>dispatch(changeEmail(email,name)),
      updateState:state=>dispatch(updateState(state))
    }
  }

export default connect(mapStateToProps, mapStateToDispatch)(Dashboard)
