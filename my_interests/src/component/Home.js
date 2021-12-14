import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "./Home.css"

function Home(){

    const [posts , setPosts] = useState([])

    useEffect(()=>{
        axios
        .get("http://localhost:8080/post")
        .then((response)=>{setPosts(response.data)})
        .catch((error)=>{console.log(error);})
    },[]);

    return(
        <>
        <div className='mainPage'>
            <div></div>
            <div className="midGrid">
                {posts.map(e=>{
                    return(
                        <>
                        <div className="postDiv">
                            <div className="postHead">
                                <div className="divWidth">
                                <input type="image" src={e.user.personalImg} className="personalImg"/>
                                </div>
                                <Link to={`/${e.user.id}`} className="userName">{e.user.userName}</Link>
                            </div>
                            <input type="image" src={e.image} className="imgWidth"/>
                            <div className="caption"><Link to={`/${e.user.id}`} className="userName">{e.user.userName}</Link> {e.caption}</div>
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