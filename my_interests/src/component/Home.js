import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css"

function Home(){

    const [posts , setPosts] = useState([])
    const state = useSelector((state)=>{
        return {
            userInfo: state.UserReducer,
            token: state.UserReducer.token
        }
    })
    const newArray = []

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/follow/${state.userInfo.userLogged.id}`)
        .then((response)=>setPosts(response.data))
        .catch((error)=>{console.log(error);})
    },[]);

    console.log(posts)
    posts.map(e=>{e.category.postsC.map(ell=>newArray.push({
        "id":e.category.id,
        "category":e.category.category,
        "post":ell
    }))})
    console.log(newArray);
    const sortedArray =  newArray.slice().sort((a,b) => {
    return b.post.id - a.post.id
})
    console.log(sortedArray.reverse());
    
    return(
        <>
        <div className='mainPage'>
            <div></div>
            <div className="midGrid">
                {sortedArray.reverse().map(e=>{
                    return(
                        <>
                        <div className="postDiv">
                            <div className="postHead">
                                <div className="divWidth">
                                <input type="image" src={e.post.user.personalImg} className="personalImg"/>
                                </div>
                                
                                <Link to={`/${e.post.user.id}`} className="userName">{e.post.user.userName}</Link>
                            </div>
                            <Link to={`/Post/${e.post.id}`}><input type="image" src={e.post.image} className="imgWidth"/></Link>
                            <div className="categoryCSS">Subject: <Link to={`category/${e.id}`} className="category2"> {e.category}</Link></div>
                            <div className="caption"><Link to={`/${e.post.user.id}`} className="userName2">{e.post.user.userName}</Link> {e.post.caption}</div>
                        </div>
                        </>
                    )
                })}
            </div>
            <div></div>
    </div>
        </>
    )
}

export default Home