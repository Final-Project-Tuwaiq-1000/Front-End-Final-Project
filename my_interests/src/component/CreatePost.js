import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import "./CreatePost.css"

function CreatePost(){

    const [caption, setCaption] = useState("")
    const [img, setImg] = useState("")
    const [requiredField, setRequiredField] = useState()
    const state = useSelector((state)=>{
        return {
            userInfo: state.UserReducer,
            token: state.UserReducer.token
        }
    })

    const navigate = useNavigate()
    const data = {
        "user":{"id":state.userInfo.userLogged.id==undefined?"":state.userInfo.userLogged.id},
        "caption":caption,
        "image":img
    }
    const Create = ()=>{
        if(state.userInfo.userLogged.id===undefined){
            navigate("/LogIn")
        }
        else{
        if(caption.length<1 || img.length<1){
            setRequiredField("This Field is Requierd")
        }
        else{
            const config = {
                headers:{Authorization: `Bearer ${state.token}`}
            }
            axios
            .post("http://localhost:8080/post",data,config)
            .then(response=>{navigate("/")})
            .catch(err=>{console.log(err.response.data)})
        }
    }
        
        
    }
    return(
        <>
            <div className="logInPage">
            <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <form method="POST" id="signup-form" class="signup-form">
                        <h2 class="form-title">Create Post</h2>
                        <div class="form-group">
                            <textarea class="form-input" placeholder="Caption" onChange={e=>setCaption(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-input" placeholder="Image" onChange={e=>setImg(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <input type="button" class="form-submit" value="Create" onClick={Create}/>
                        </div>
                        <div class="form-group">
                        </div>
                    </form>
                </div>
            </div>
        </section>

            </div>
        </>
    )
}

export default CreatePost