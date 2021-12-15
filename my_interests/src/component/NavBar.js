import "./NavBar.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../reducers/actions"

function NavBar(){

    const state = useSelector((state)=>{
        return {
            userInfo: state.UserReducer
        }
    })

console.log(state.userInfo.userLogged);
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
                        {state.userInfo.isLogged &&<li>Welcome<Link to={`${state.userInfo.userLogged.id}`} className="textDesign"> {state.userInfo.userLogged.userName}</Link></li>}
                            <li><Link to={"/"} className="textDesign"><input type="image"src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/1200px-Home-icon.svg.png" className="imgNav"/></Link></li>
                           {state.userInfo.isLogged && <li><Link to={"/createPost"}><input type="image"src="https://cdn2.iconfinder.com/data/icons/lucid-generic/24/new_artboard_file_create_post-512.png" className="imgNav"/> </Link> </li>}
                            {!state.userInfo.isLogged &&<li><Link to={"/LogIn"} className="textDesign"><input type="image"src="https://image.flaticon.com/icons/png/512/152/152532.png" className="imgNav"/></Link></li>}
                            {!state.userInfo.isLogged &&<li><Link to={"/SignUp"} className="textDesign"><input type="image"src="https://static.thenounproject.com/png/736543-200.png" className="imgNav"/></Link></li>}
                            {state.userInfo.isLogged &&<li onClick={LogOut}><Link to={"/LogIn"} className="textDesign"><input type="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/OOjs_UI_icon_logOut-ltr.svg/2048px-OOjs_UI_icon_logOut-ltr.svg.png" className="imgNav"/></Link></li>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar