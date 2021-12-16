import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { logIn } from "../reducers/actions"
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
        axios.post("http://localhost:8080/user/logIn",data)
        .then(response=>{
            console.log(response.data);
            dispatch(logIn(response.data))
            navigate("/")
        })
        .catch(err=>{setErrMsg(err.response.data)})
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