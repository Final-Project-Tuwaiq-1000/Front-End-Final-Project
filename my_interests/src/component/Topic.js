import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./Topic.css";

function Topic() {
  const { topic_id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/category/${topic_id}`)
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
        <div></div>
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
