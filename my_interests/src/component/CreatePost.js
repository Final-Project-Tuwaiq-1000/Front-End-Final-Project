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
            userInfo: state.UserReducer
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
            axios
            .post("http://localhost:8080/post",data)
            .then(response=>{navigate("/")})
            .catch(err=>{console.log(err.response.data)})
        }
    }
        
        
    }
    return(
        <>
            <div className="logInPage">
                <div className="form">
                    <h3>Create Post</h3>
                    <div>Caption:</div> <textarea className="textArea fontType" placeholder={requiredField} onChange={(e)=>setCaption(e.target.value)}/>
                    <div>Image</div> <input type="text" className="mar"placeholder={requiredField} onChange={(e)=>setImg(e.target.value)}/>  
                    <div className="errMsg"></div>
                    <input type="button" value={"Create"} className="mar btn" onClick={Create}/>  
                </div>
            </div>
        </>
    )
}

export default CreatePost