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
                            {state.userInfo.isLogged &&<li>Welcome<Link to={`${state.userInfo.userLogged[0].id}`} className="textDesign"> {state.userInfo.userLogged.map(e=>{return (<>{e.userName}</>)})}</Link></li>}
                            {!state.userInfo.isLogged &&<li><Link to={"/LogIn"} className="textDesign">Log In</Link></li>}
                            {!state.userInfo.isLogged &&<li><Link to={"/SignUp"} className="textDesign">Sign Up</Link></li>}
                            {state.userInfo.isLogged &&<li onClick={LogOut}><Link to={"/LogIn"} className="textDesign">Log Out</Link></li>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar