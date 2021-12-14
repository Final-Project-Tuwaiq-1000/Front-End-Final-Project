import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logIn } from "../reducers/actions";
import "./SignUp.css"


function SignUp(){
    const [userName , setUserName] = useState("")
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [moreInfo, setMoreInfo] = useState("")
    const [checkPass, setCheckPass] = useState("")
    const[requiredField,setRequiredField] = useState("")
    const [errMsg,setErrMsg] = useState()

    const dispatch = useDispatch()

    const navigate = useNavigate()
     
    const userInfo ={
        "userName":userName,
        "email":email,
        "password":password,
        "moreInfo":moreInfo,
        "personalImg":"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    }

    const getInfo = ()=>{
        if(userName.length<1 || password.length<1 || email.length<1 || confirmPassword.length<1){
            setRequiredField("This Field is Requierd")
        }
        else{
            if(password !== confirmPassword){
                setCheckPass("Password is NOT the Same")
                document.getElementById("pass").value = ""
                document.getElementById("cpass").value = ""
            }
            else{
            
                axios.post("http://localhost:8080/user",userInfo)
                .then(response=>{
                    console.log(response);
                    dispatch(logIn(response.data))
                    navigate("/")
                })
                .catch(err=>{setErrMsg(err.response.data)})
        }
    }
}
    return(
        <>
        <div className="logInPage">
            <div className="form">
                <h3>Sign Up</h3>
                <div className="errMsg">{errMsg}</div>
                <div>User Name:</div> <input type="text" className="mar" placeholder={requiredField} onChange={(e)=>{setUserName(e.target.value)}}/>
                <div>Email:</div> <input type="email" className="mar" placeholder={requiredField} onChange={(e)=>{setEmail(e.target.value)}}/>
                <div>Password:</div> <input type="password" placeholder={checkPass|| requiredField} id="pass" className="mar" onChange={(e)=>{setPassword(e.target.value)}}/>
                <div>Confirm Password:</div> <input type="password"  placeholder={checkPass||requiredField}  id="cpass" className="mar" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                <div>Tell Us More About Your Self: </div>
                <textarea className="textArea" onChange={(e)=>{setMoreInfo(e.target.value)}}/>
                <br/>
                <input type="button" value={"Sign Up"} className="mar btn" onClick={getInfo}/> 
                 
            </div>
        </div>
        </>
    )
}

export default SignUp