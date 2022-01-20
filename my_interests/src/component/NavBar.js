import "./NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../reducers/actions";
import search from "../images/icons8-search-500.png";
import addPost from "../images/icons8-add-new-100.png";
import LogOut22 from "../images/icons8-logout-100.png";
import LogInIcon from "../images/icons8-enter-100.png";
import AdminIcon from "../images/icons8-admin-settings-male-100.png";
import ProjectLogo from "../images/ProjectLogo_2.png";
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";

function NavBar() {
  const state = useSelector((state) => {
    return {
      userInfo: state.UserReducer,
    };
  });

  const dispatch = useDispatch();

  const LogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <div className="navbar navbar-fixed-top">
        <div class="navbar-inner">
          <div class="nav-collapse">
            <div className="logo">
              <li className="logoImg">
                <Link to="/">
                  <input type="image" src={ProjectLogo} className="logoImg" />
                </Link>
              </li>
            </div>

            <div className="icons-home">
              <ul class="nav">
                <li className="ulDiv">
                  <Link to={"/"}>
                    <AiOutlineHome className="imgSizeNav" />
                  </Link>
                  <div>Home</div>
                </li>
                <li className="ulDiv">
                  <Link to={"/Search"}>
                    <input type="image" src={search} className="imgNav" />
                  </Link>
                  <div>Search</div>
                </li>
                {state.userInfo.isLogged && (
                  <li className="ulDiv">
                    <Link to={"/createPost"}>
                      <input type="image" src={addPost} className="imgNav" />{" "}
                    </Link>{" "}
                    <div>Create Post</div>
                  </li>
                )}
                {!state.userInfo.isLogged && (
                  <li className="ulDiv">
                    <Link to={"/LogIn"}>
                      <input type="image" src={LogInIcon} className="imgNav" />
                    </Link>
                    <div>Log In</div>
                  </li>
                )}
                {!state.userInfo.isLogged && (
                  <li className="ulDiv">
                    <Link to={"/SignUp"} className="imgSizeNav">
                      <AiOutlineUserAdd className="imgSizeNav" />
                    </Link>
                    <div>Sign Up</div>
                  </li>
                )}

                {state.userInfo.isLogged && (
                  <li className="ulDiv">
                    <Link to={"/Follow"}>
                      <input
                        type="image"
                        src="https://cdn-icons-png.flaticon.com/512/3893/3893183.png"
                        className="imgNav"
                      />{" "}
                    </Link>{" "}
                    <div>Follow / UnFollow</div>
                  </li>
                )}
                {state.userInfo.isLogged && (
                  <li className="ulDiv" onClick={LogOut}>
                    <Link to={"/LogIn"}>
                      <input
                        type="image"
                        src={LogOut22}
                        className="imgSizeNav"
                      />
                    </Link>
                    <div>Log Out</div>
                  </li>
                )}
                {state.userInfo.userLogged.userRole === "ADMIN" && (
                  <li className="ulDiv">
                    <Link to={"/Admin"}>
                      <input
                        type="image"
                        src={AdminIcon}
                        className="imgSizeNav"
                      />
                    </Link>
                    <div>Admin Page</div>
                  </li>
                )}
              </ul>
            </div>
            <div className="user-name">
              {state.userInfo.isLogged && (
                <div>
                  Welcome
                  <Link
                    to={`${state.userInfo.userLogged.id}`}
                    className="textDesign"
                  >
                    {" "}
                    {state.userInfo.userLogged.userName}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
