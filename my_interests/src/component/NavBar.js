import "./NavBar.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../reducers/actions"
import search from "../images/icons8-search-500.png"
import addPost from "../images/icons8-add-new-100.png"
import {AiOutlineHome,AiOutlineUserAdd} from "react-icons/ai"

function NavBar(){

    const state = useSelector((state)=>{
        return {
            userInfo: state.UserReducer
        }
    })

    const dispatch = useDispatch()

    const LogOut =() =>{
     dispatch(logOut())   
    }

    return(
        <>
            <div class="navbar navbar-fixed-top">
                <div class="navbar-inner">
                    <div class="nav-collapse">
                        <ul class="nav">
                        {state.userInfo.isLogged &&<li className="textSize1">Welcome<Link to={`${state.userInfo.userLogged.id}`} className="textDesign"> {state.userInfo.userLogged.userName}</Link></li>}
                            <li><Link to={"/"} ><AiOutlineHome className="imgSizeNav"/></Link></li>
                            <li><Link to={"/Search"} ><input type="image"src={search} className="imgNav"/></Link></li>
                           {state.userInfo.isLogged && <li><Link to={"/createPost"}><input type="image"src={addPost} className="imgNav"/> </Link> </li>}
                            {!state.userInfo.isLogged &&<li><Link to={"/LogIn"} ><input type="image"src="https://image.flaticon.com/icons/png/512/152/152532.png" className="imgNav"/></Link></li>}
                            {!state.userInfo.isLogged &&<li><Link to={"/SignUp"} className="imgSizeNav"><AiOutlineUserAdd className="imgSizeNav"/></Link></li>}
                            {state.userInfo.isLogged && <li><Link to={"/Follow"}><input type="image"src="https://cdn-icons-png.flaticon.com/512/3893/3893183.png" className="imgNav"/> </Link> </li>}
                            {state.userInfo.isLogged &&<li onClick={LogOut}><Link to={"/LogIn"}><input type="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/OOjs_UI_icon_logOut-ltr.svg/2048px-OOjs_UI_icon_logOut-ltr.svg.png" className="imgSizeNav"/></Link></li>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar