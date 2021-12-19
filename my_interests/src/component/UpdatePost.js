import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import "./UpdatePost.css"

function UpdatePost(){
    const [caption, setCaption] = useState("")
    const [img, setImg] = useState("")
    const [requiredField, setRequiredField] = useState()
    const [post, setPost] = useState()

    const {post_id} = useParams()

    const navigate = useNavigate()

    const data = {
        "caption":caption,
        "image":img
    }

    const state = useSelector((state)=>{
        return {
            userInfo: state.UserReducer
        }
    })

    const Update = ()=>{
        if(state.userInfo.userLogged.id===undefined){
            navigate("/LogIn")
        }
        else{
            if(caption.length<1 || img.length<1){
                setRequiredField("This Field is Requierd")
            }
            else{
                axios
                .put(`http://localhost:8080/post/${post_id}`,data)
                .then(response=>navigate(`/Post/${post_id}`))
            }
        }
        console.log(data);
    }

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/post/${post_id}`)
        .then(response=>{
            setPost(response.data)
            setCaption(`${response.data.caption}`)
            setImg(`${response.data.image}`)
        })
        .catch(err=>{console.log(err.response);})
    },[])
    return(
        <>
         <div className="logInPage">
            <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <form method="POST" id="signup-form" class="signup-form">
                        <h2 class="form-title">Create Post</h2>
                        <div class="form-group">
                            <textarea class="form-input" placeholder="Caption" defaultValue={caption} onChange={e=>setCaption(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-input" placeholder="Image" defaultValue={img} onChange={e=>setImg(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <input type="button" class="form-submit" value="Update" onClick={Update}/>
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

export default UpdatePost