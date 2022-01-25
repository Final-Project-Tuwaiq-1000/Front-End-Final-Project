import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Post.css";

function Post() {
  const state = useSelector((state) => {
    return {
      userInfo: state.UserReducer,
      token: state.UserReducer.token,
    };
  });

  const [posts, setPosts] = useState([]);
  const { post_id } = useParams();
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`https://final-project-tuwaiq.herokuapp.com/post/${post_id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err.data);
      });

    axios
      .get(
        `https://final-project-tuwaiq.herokuapp.com/follow/${state.userInfo.userLogged.id}`
      )
      .then((response) => setPosts(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const data = {
    post: { id: post_id },
    comment: comment,
    user: { id: state.userInfo.userLogged.id },
  };

  const navigate = useNavigate();

  const AddComment = () => {
    if (comment.length > 0) {
      const config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };
      axios
        .post(
          `https://final-project-tuwaiq.herokuapp.com/comment`,
          data,
          config
        )
        .then((response) => {
          axios
            .get(`https://final-project-tuwaiq.herokuapp.com/post/${post_id}`)
            .then((response) => {
              setPost(response.data);
            })
            .catch((err) => {
              console.log(err.data);
            });
          document.getElementById("textComm").value = "";
          setComment("");
        });
    }
  };

  const DeletePost = () => {
    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };

    axios
      .delete(
        `https://final-project-tuwaiq.herokuapp.com/post/${post_id}`,
        config
      )
      .then((response) => {
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <div className="mainPage">
        <div>
          <div className="thirdDiv">
            <h1>Topics You Follow</h1>
            {posts.map((e) => {
              return (
                <>
                  <h3 className="categoryStyle">
                    <Link to={`/Topic/${e.category.id}`} className="category2">
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
          {post === "" ? (
            <h1>THIS PAGE IS NOT EXIST</h1>
          ) : (
            <div className="postDiv">
              <div className="postHead">
                <div className="divWidth">
                  <input
                    type="image"
                    src={post === "" ? "" : post.user.personalImg}
                    className="personalImg"
                  />
                </div>
                <Link to={`/${post.user.id}`} className="userName">
                  {post.user.userName}
                </Link>
                {state.userInfo.userLogged.id === undefined
                  ? false
                  : state.userInfo.userLogged.id == post.user.id && (
                      <div class="dropdown">
                        <button class="dropbtn">More Options</button>
                        <div class="dropdown-content">
                          <Link to={`/UpdatePost/${post_id}`}>Update Post</Link>
                          <Link
                            to={`/${state.userInfo.userLogged.id}`}
                            onClick={DeletePost}
                          >
                            Delete Post
                          </Link>
                        </div>
                      </div>
                    )}
              </div>
              <input type="image" src={post.image} className="imgWidth" />
              <div className="categoryCSS">
                Topic:{" "}
                <Link to={`/Topic/${post.category.id}`} className="category2">
                  {" "}
                  {post.category.category}
                </Link>
              </div>
              <div className="caption">
                <Link to={`/${post.user.id}`} className="userName2">
                  {post.user.userName}
                </Link>{" "}
                {post.caption}
              </div>
              <div>
                {post.comments == undefined ? (
                  ""
                ) : (
                  <div className="marComments">
                    {post.comments.map((e) => {
                      return (
                        <>
                          <div className="commentGrid">
                            <Link to={`/${e.user.id}`} className="userName">
                              {e.user.userName}
                            </Link>

                            <div>{e.comment}</div>
                            {state.userInfo.userLogged.id == e.user.id && (
                              <input
                                type="image"
                                src="https://image.flaticon.com/icons/png/512/401/401036.png"
                                className="deleteIcon"
                                onClick={() => {
                                  const config = {
                                    headers: {
                                      Authorization: `Bearer ${state.token}`,
                                    },
                                  };
                                  axios
                                    .delete(
                                      `https://final-project-tuwaiq.herokuapp.com/comment/${e.id}`,
                                      config
                                    )
                                    .then((response) => {
                                      axios
                                        .get(
                                          `https://final-project-tuwaiq.herokuapp.com/post/${post_id}`
                                        )
                                        .then((response) => {
                                          setPost(response.data);
                                        })
                                        .catch((err) => {
                                          console.log(err.data);
                                        });
                                      document.getElementById(
                                        "textComm"
                                      ).value = "";
                                      setComment("");
                                    })
                                    .catch((err) => {
                                      console.log(err.response);
                                    });
                                }}
                              />
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}
                {state.userInfo.isLogged && (
                  <div className="gridComment">
                    <input
                      type="text"
                      className="textComm"
                      id="textComm"
                      placeholder="Add Comment"
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Link
                      to={`/post/${post_id}`}
                      className="linkPost"
                      onClick={AddComment}
                    >
                      Send
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Post;
