import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import "./Profile.css"

function Profile(){

    const {user_id} = useParams();
    const [userInfo, setUserInfo] = useState([])

    useEffect(()=>{
        axios
        .get(`http://localhost:8080/user/${user_id}`)
        .then(response=>{setUserInfo(response.data)})
        .catch(err=>{console.log(err)})
    },[])
    return(
        <>  
            <div className="mainProfile">
                <div></div>
                {userInfo == undefined ?"":
                <div className="centerPosts">
                    <div className="profileDiv">
                        <input type="image" src={userInfo.personalImg} className="imgProfile"/>
                        <div>
                            <div className="userName2">{userInfo.userName}</div>
                            <div>{userInfo.moreInfo}</div>
                        </div>
                    </div>
                    <div className="userCard">
                        <div className="postsGrid">
                            <div></div>
                            <div>Posts</div>
                            <div className="widthDiv"></div>
                            {userInfo.posts == undefined ?"":
                            userInfo.posts.map(e=>{
                                return(
                                <div>
                                    <Link to={`/Post/${e.id}`}><input type="image" className="imgSize" src={e.image}/></Link>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default Profile 