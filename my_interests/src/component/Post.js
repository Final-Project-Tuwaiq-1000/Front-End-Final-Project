import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import "./Post.css"

function Post(){
    const {post_id} = useParams()
    const [post, setPost] = useState()
    const [comment, setComment] =  useState()

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/post/${post_id}`)
        .then(response=>{setPost(response.data)})
        .catch(err=>{console.log(err.data);})
    },[])

    const data = {
        "post":{"id":post_id},
        "comment":comment
    }
    
    const navigate = useNavigate()

    const AddComment =()=>{
        axios
        .post(`http://localhost:8080/comment`,data)
        .then(response=>{
            axios
            .get(`http://localhost:8080/post/${post_id}`)
            .then(response=>{setPost(response.data)})
            .catch(err=>{console.log(err.data);})
            document.getElementById("textComm").value=""
            setComment("")
        })
    }
    const state = useSelector((state)=>{
        return {
            userInfo: state.UserReducer
        }
    })

    const DeletePost =()=>{
        for (let i=0 ;i<post.comments.length;i++){
            console.log(post.comments[i].comment);
            axios
            .delete(`http://localhost:8080/comment/${post.comments[i].id}`)
            .then(response=>{
                console.log(response.data)
            })
            .catch(err=>{console.log(err.response)})
        }
        axios
        .delete(`http://localhost:8080/post/${post_id}`)
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
                {post === undefined ? <div>LOADING</div>:
                        <div className="postDiv">
                            <div className="postHead">
                                <div className="divWidth">
                                <input type="image" src={post.user.personalImg} className="personalImg"/>
                                </div>
                                <Link to={`/${post.user.id}`} className="userName">{post.user.userName}</Link>
                               {state.userInfo.userLogged.id === undefined ? false :state.userInfo.userLogged.id=== post.user.id&& <div class="dropdown">
                                    <button class="dropbtn">More Options</button>
                                    <div class="dropdown-content">
                                        <Link to={"/updatePost"}>Update Post</Link>
                                        <Link to={`/${state.userInfo.userLogged.id}`} onClick={DeletePost}>Delete Post</Link>
                                    </div>
                                </div>
                                }
                            </div>
                            <input type="image" src={post.image} className="imgWidth"/>
                            <div className="caption"><Link to={`/${post.user.id}`} className="userName">{post.user.userName}</Link> {post.caption}</div>
                            <div>
                                {post.comments == undefined ? "":
                                <div className="marComments">
                               { post.comments.map(e=>{
                                    return (
                                        <>
                                        <div>
                                            {e.comment}
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