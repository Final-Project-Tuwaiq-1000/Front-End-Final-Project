import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { logOut } from "../reducers/actions";

function Profile() {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      userInfo: state.UserReducer,
      token: state.UserReducer.token,
    };
  });

  const { user_id } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const LogOut = () => {
    // const config = {
    //   headers: { Authorization: `Bearer ${state.token}` },
    // };
    axios
      .delete(`http://localhost:8080/user/${state.userInfo.userLogged.id}`)
      .then((response) => {
        dispatch(logOut());
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${user_id}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sortedArray =
    userInfo.posts == undefined
      ? []
      : userInfo.posts.slice().sort((a, b) => {
          return b.id - a.id;
        });

  return (
    <>
      <div className="mainProfile">
        <div></div>
        {userInfo == undefined ? (
          ""
        ) : (
          <div className="centerPosts">
            <div className="profileDiv">
              <input
                type="image"
                src={userInfo.personalImg}
                className="imgProfile"
              />
              <div>
                <div className="userName2">{userInfo.userName}</div>
                <div>{userInfo.moreInfo}</div>
              </div>
              <div className="update">
                {state.userInfo.userLogged.id === undefined
                  ? false
                  : state.userInfo.userLogged.id == user_id && (
                      <div class="dropdown">
                        <button class="dropbtn">More Options</button>
                        <div className="dropdown-content textSizeUpdate">
                          <Link to={`/UpdateUser/${user_id}`}>
                            Update My Information
                          </Link>
                          <Link to={`/LogIn`} onClick={LogOut}>
                            Delete my Account
                          </Link>
                        </div>
                      </div>
                    )}
              </div>
            </div>
            <div className="userCard">
              <div className="postsGrid">
                <div></div>
                <div>Posts</div>
                <div className="widthDiv"></div>
                {userInfo.posts == undefined
                  ? ""
                  : sortedArray.map((e) => {
                      return (
                        <div>
                          <Link to={`/Post/${e.id}`}>
                            <input
                              type="image"
                              className="imgSize"
                              src={e.image}
                            />
                          </Link>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
