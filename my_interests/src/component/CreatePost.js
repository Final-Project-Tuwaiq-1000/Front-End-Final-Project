import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import "./CreatePost.css"

function CreatePost(){

    const [caption, setCaption] = useState("")
    const [img, setImg] = useState("")
    const [requiredField, setRequiredField] = useState()
    const [categories, setCategories] = useState([])
    const [postCategory, setPostCategory] = useState("")

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
        "image":img,
        "category":{"id":postCategory}
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

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/category`)
        .then(response=>{
            setCategories(response.data)
        })
        .catch(err=>console.log(err.response))
    })

    return(
        <>
            <div className="logInPage">
            <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <form method="POST" id="signup-form" class="signup-form">
                        <h2 class="form-title">Create Post</h2>
                        <div class="form-group">
                            <textarea class="form-input textArea" placeholder="Caption" onChange={e=>setCaption(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-input" placeholder="Image" onChange={e=>setImg(e.target.value)}/>
                        </div>
                        <div class="form-group ">
                            <select id="cars" className="option" onChange={(e)=>setPostCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map(e=>{
                                    return(
                                    <option value={e.id}> {e.category} </option>
                                    )
                                })}
                                
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="button" class="form-submit" value="Create" onClick={Create}/>
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