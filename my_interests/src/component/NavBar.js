import "./NavBar.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../reducers/actions"
import home from "../images/icons8-home-50.png"
import signUp from "../images/icons8-add-user-male-96.png"
import addPost from "../images/icons8-add-100.png"

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
                            <li><Link to={"/"} className="textDesign"><input type="image"src={home} className="imgNav"/></Link></li>
                           {state.userInfo.isLogged && <li><Link to={"/createPost"}><input type="image"src={addPost} className="imgNav"/> </Link> </li>}
                            {!state.userInfo.isLogged &&<li><Link to={"/LogIn"} className="textDesign"><input type="image"src="https://image.flaticon.com/icons/png/512/152/152532.png" className="imgNav"/></Link></li>}
                            {!state.userInfo.isLogged &&<li><Link to={"/SignUp"} className="textDesign"><input type="image"src={signUp} className="imgNav"/></Link></li>}
                            {state.userInfo.isLogged && <li><Link to={"/Follow"}><input type="image"src="https://cdn-icons-png.flaticon.com/512/3893/3893183.png" className="imgNav"/> </Link> </li>}
                            {state.userInfo.isLogged &&<li onClick={LogOut}><Link to={"/LogIn"} className="textDesign"><input type="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/OOjs_UI_icon_logOut-ltr.svg/2048px-OOjs_UI_icon_logOut-ltr.svg.png" className="imgNav"/></Link></li>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar