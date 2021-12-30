import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { logIn, addToken } from "../reducers/actions"
import jwt_decode from "jwt-decode";

import "./LogIn.css"

function LogIn(){
    const [email , setEmail] = useState()
    const [password, setPassword] = useState()
    const [errMsg,setErrMsg] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const data = {
        "email":email,
        "password":password
    }

    const getInfo = ()=>{
        axios
        .post("http://localhost:8080/login",data)
        .then(response=>{
            const token =response.data.access_token
            const decoded = jwt_decode(token);
            const action = logIn({
                "id":decoded.id,
                "userName":decoded.userName,
                "userRole":decoded.roles[0],
                "email":decoded.sub
            })
            dispatch(action)

            const action2 = addToken(token)
            dispatch(action2)

            navigate("/")
        })
        .catch(err=>{setErrMsg("Something wrong happened try again")})
    }

    return(
        <>
        <div className="backGround">
            <div className="logInPage">
            <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <form method="POST" id="signup-form" class="signup-form">
                        <h2 class="form-title">Log In</h2>
                        <div class="form-group">
                            <input type="email" class="form-input" name="name" id="name" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-input" name="password" id="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                            <span toggle="#password" class="zmdi zmdi-eye field-icon toggle-password"></span>
                        </div>
                        <div class="form-group">
                            <input type="button" class="form-submit" value="Log In" onClick={getInfo}/>
                        </div>
                        <div class="form-group">
                            <div className="centerErr">
                                {errMsg}
                            </div>
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

export default LogIn