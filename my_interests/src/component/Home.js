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
    posts.map(e=>{e.category.postsC.map(ell=>newArray.push(ell))})
    console.log(newArray);
    const sortedArray =  newArray.slice().sort((a,b) => {
    return b.id - a.id
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
                                <input type="image" src={e.user.personalImg} className="personalImg"/>
                                </div>
                                <Link to={`/${e.user.id}`} className="userName">{e.user.userName}</Link>
                            </div>
                            <Link to={`/Post/${e.id}`}><input type="image" src={e.image} className="imgWidth"/></Link>
                            <div className="caption"><Link to={`/${e.user.id}`} className="userName2">{e.user.userName}</Link> {e.caption}</div>
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