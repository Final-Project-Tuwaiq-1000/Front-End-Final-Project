import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { logIn } from "../reducers/actions"
import "./LogIn.css"

function LogIn(){
    const [email , setEmail] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const data = {
        "email":email,
        "password":password
    }

    const getInfo = ()=>{
        axios.post("http://localhost:8080/user/logIn",data)
        .then(response=>{
            console.log(response.data);
            dispatch(logIn(response.data))
            navigate("/")
        })
        .catch(err=>{console.log(err.response.data);})
    }

    return(
        <>
        <div className="logInPage">
            <div className="form">
                <h3>Log In</h3>
                <div>Email:</div> <input type="email" className="mar" onChange={(e)=>{setEmail(e.target.value)}}/>
                <div>Password:</div> <input type="password" className="mar" onChange={(e)=>{setPassword(e.target.value)}}/>  
                <input type="button" value={"Log In"} className="mar btn" onClick={getInfo}/>  
            </div>
        </div>
        </>
    )
}

export default LogIn