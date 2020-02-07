import React, { Component } from 'react'
import {connect} from "react-redux"
import {changeEmail,updateState} from "../../REDUX/Action"
import firebase from 'firebase'
import 'firebase/database'
import RegisterForm from '../Auth/RegisterForm'
import {Link} from "react-router-dom"

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
        const myNotes = this.props.state.notes
        const recently = []
        for(let i=myNotes.length-1; i>=myNotes.length-5; i--){
            if(myNotes[i] !==undefined){
                recently.push(myNotes[i])
            }
        }
        console.log("recent", recently)
        const {authenticated}=this.props.auth
        if(authenticated){
            return <div className="p-2 bg-white table-responsive">
               <p className="d-flex flex-column">
                   <img src="./images/cycle2.gif" className="img-fluid cycle-animate"/>
                  <p className="h4 animated fadeInDown" > Welcome to <strong>MakeNotes.com</strong>. You have Total {notes.length} notes in your list. <br/></p>
               </p>
               <h2>Recently Added !</h2>
               <table className="table border">
                   <thead className="bg-dark text-white border">
                       <tr>
                           <td>
                           Note's Name
                           </td>
                           <td>
                           Created At
                           </td>
                       </tr>
                   </thead>
                   <tbody className="bg-light">
                       {recently[0]!==undefined ? recently.map(item=>{
                           return <tr className="animated fadeInUp">
                               <td>
                                   <Link to={`/note/${item.id}`}>{item.disc}</Link>
                               </td>
                               <td>
                                   {item.date}, {item.time}
                               </td>
                           </tr>
                       }):null}
                   </tbody>

               </table>

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
        state:state,
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
