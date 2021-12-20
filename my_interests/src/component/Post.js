import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import "./Post.css"

function Post(){

    const state = useSelector((state)=>{
        return {
            userInfo: state.UserReducer,
            token: state.UserReducer.token
        }
    })


    const {post_id} = useParams()
    const [post, setPost] = useState("")
    const [comment, setComment] =  useState("")

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/post/${post_id}`)
        .then(response=>{setPost(response.data)})
        .catch(err=>{console.log(err.data);})
    },[])

    const data = {
        "post":{"id":post_id},
        "comment":comment,
        "user":{"id":state.userInfo.userLogged.id}
    }
    
    const navigate = useNavigate()

    const AddComment =()=>{
        const config = {
            headers:{Authorization: `Bearer ${state.token}`}
        }
        axios
        .post(`http://localhost:8080/comment`,data,config)
        .then(response=>{
            axios
            .get(`http://localhost:8080/post/${post_id}`)
            .then(response=>{setPost(response.data)})
            .catch(err=>{console.log(err.data);})
            document.getElementById("textComm").value=""
            setComment("")
        })
    }
    

    const DeletePost =()=>{
        const config = {
            headers:{Authorization: `Bearer ${state.token}`}
        }
        
        axios
        .delete(`http://localhost:8080/post/${post_id}`,config)
        .then(response=>{
            console.log("Deleted");
            navigate(`/`)
        })
        .catch(err=>{console.log(err.response);})
    }

    return(
        <>
            <div className='mainPage'>
            <div></div>
            <div className="midGrid">
                {post === "" ? <h1>THIS PAGE IS NOT EXIST</h1>:
                        <div className="postDiv">
                            <div className="postHead">
                                <div className="divWidth">
                                    <input type="image" src={post === "" ?"":post.user.personalImg} className="personalImg"/>
                                </div>
                                <Link to={`/${post.user.id}`} className="userName">{post.user.userName}</Link>
                               {state.userInfo.userLogged.id === undefined ? false :state.userInfo.userLogged.id == post.user.id&& <div class="dropdown">
                                    <button class="dropbtn">More Options</button>
                                    <div class="dropdown-content">
                                        <Link to={`/UpdatePost/${post_id}`}>Update Post</Link>
                                        <Link to={`/${state.userInfo.userLogged.id}`} onClick={DeletePost}>Delete Post</Link>
                                    </div>
                                </div>
                                }
                            </div>
                            <input type="image" src={post.image} className="imgWidth"/>
                            <div className="caption"><Link to={`/${post.user.id}`} className="userName2">{post.user.userName}</Link> {post.caption}</div>
                            <div>
                                {post.comments == undefined ? "":
                                <div className="marComments">
                               { post.comments.map(e=>{
                                    return (
                                        <>
                                        <div className="commentGrid">
                                        
                                            <Link to={`/${e.user.id}`} className="userName">
                                                {e.user.userName}
                                            </Link>
                                             
                                            <div>
                                                {e.comment}'    
                                            </div>
                                         </div>
                                        </>
                                    )
                                    
                                })}
                                
                                </div>}
                                <div className="gridComment">
                                    <input type="text"  className="textComm" id="textComm" placeholder="Add Comment" onChange={(e)=>setComment(e.target.value)}/> 
                                    <Link to={`/post/${post_id}`} className="linkPost" onClick={AddComment}>Post</Link>
                                </div>
                            </div>
                        </div>
                    
                }
            </div>
            <div></div>
    </div>
        </>
    )
}

export default Post