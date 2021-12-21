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
        "user":{
            "userName":userName,
            "email":email,
            "password":password,
            "moreInfo":moreInfo,
            "personalImg":"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
        },
        "role_id":1
    }

    const getInfo = ()=>{
        if(userName.length<1 || password.length<1 || email.length<1 || confirmPassword.length<1){
            setErrMsg("Please fill all fields with * sign")
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
                    navigate("/LogIN")
                })
                .catch(err=>{setErrMsg(err.response.data)})
        }
    }
}
    return(
        <>
        <div className="logInPage">
            <div className="form">
                <section class="signup">
                    <div class="container">
                        <div class="signup-content">
                            <form method="POST" id="signup-form" class="signup-form">
                                <h2 class="form-title">Sign UP</h2>
                                <div class="form-group">
                                    <div className="errMsg">
                                        {errMsg}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-input" placeholder={"Email * "} onChange={e=>setEmail(e.target.value.trim())}/>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-input" name="name" id="name" placeholder={"User Name * " } onChange={e=>setUserName(e.target.value.trim())}/>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-input" placeholder={"Password * "} onChange={e=>setPassword(e.target.value.trim())}/>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-input" placeholder={"Confirm Password * "} onChange={e=>setConfirmPassword(e.target.value.trim())}/>
                                </div>
                                <div class="form-group">
                                    <textarea class="form-input" placeholder={"Tell Us More About Your Self"} onChange={e=>setMoreInfo(e.target.value.trim())}/>
                                </div>
                                <div class="form-group">
                                    <input type="button"  class="form-submit" value="Sign up" onClick={getInfo}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </section> 
            </div>
        </div>
        </>
    )
}

export default SignUp