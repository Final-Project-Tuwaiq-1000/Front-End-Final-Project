import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./Topic.css";

function Topic() {
  const { topic_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [postsFollow, setPostsFollow] = useState([]);

  const state = useSelector((state) => {
    return {
      userInfo: state.UserReducer,
      token: state.UserReducer.token,
    };
  });

  useEffect(() => {
    axios
      .get(
        `https://final-project-tuwaiq.herokuapp.com/follow/${state.userInfo.userLogged.id}`
      )
      .then((response) => setPostsFollow(response.data))
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`https://final-project-tuwaiq.herokuapp.com/category/${topic_id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const sortedArray =
    posts.category === undefined
      ? []
      : posts.postsC.slice().sort((a, b) => {
          return b.id - a.id;
        });

  return (
    <>
      <div className="mainPage">
        <div>
          <div className="thirdDiv">
            <h1>Topics You Follow</h1>
            {postsFollow.map((e) => {
              return (
                <>
                  <h3 className="categoryStyle">
                    <Link
                      to={`/Topic/${e.category.id}`}
                      className="category2"
                      onClick={() => {
                        axios
                          .get(
                            `http://localhost:8080/category/${e.category.id}`
                          )
                          .then((response) => {
                            setPosts(response.data);
                          })
                          .catch((err) => console.log(err.response));
                      }}
                    >
                      {" "}
                      {e.category.category}
                    </Link>
                  </h3>
                </>
              );
            })}
          </div>
        </div>
        <div className="midGrid">
          <h1>
            {posts.category === undefined ? "" : posts.category.toUpperCase()}
          </h1>
          {sortedArray.map((e) => {
            return (
              <>
                <div className="postDiv">
                  <div className="postHead">
                    <div className="divWidth">
                      <input
                        type="image"
                        src={e.user.personalImg}
                        className="personalImg"
                      />
                    </div>

                    <Link to={`/${e.user.id}`} className="userName">
                      {e.user.userName}
                    </Link>
                  </div>
                  <Link to={`/Post/${e.id}`}>
                    <input type="image" src={e.image} className="imgWidth" />
                  </Link>
                  <div className="caption">
                    <Link to={`/${e.user.id}`} className="userName2">
                      {e.user.userName}
                    </Link>{" "}
                    {e.caption}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Topic;
