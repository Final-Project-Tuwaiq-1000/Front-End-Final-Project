import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import React from "react";
import "./CreatePost.css";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [requiredField, setRequiredField] = useState();
  const [categories, setCategories] = useState([]);
  const [postCategory, setPostCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const state = useSelector((state) => {
    return {
      userInfo: state.UserReducer,
      token: state.UserReducer.token,
    };
  });

  const navigate = useNavigate();
  const data = {
    user: {
      id:
        state.userInfo.userLogged.id == undefined
          ? ""
          : state.userInfo.userLogged.id,
    },
    caption: caption,
    image: image,
    category: { id: postCategory },
  };
  const Create = () => {
    if (state.userInfo.userLogged.id === undefined) {
      navigate("/LogIn");
    } else {
      if (caption.length < 1 || image.length < 1) {
        setRequiredField("This Field is Requierd");
      } else {
        const config = {
          headers: { Authorization: `Bearer ${state.token}` },
        };
        axios
          .post("http://localhost:8080/post", data, config)
          .then((response) => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/category`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const UploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "my_interests_images");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/my-interests-nasser/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <>
      <div className="logInPage">
        <section class="signup">
          <div class="container">
            <div class="signup-content">
              <form method="POST" id="signup-form" class="signup-form">
                <h2 class="form-title">Create Post</h2>
                <div class="form-group">
                  <input
                    type="file"
                    name="file"
                    className="form-input backGroundUpload"
                    placeholder="Upload an Image"
                    onChange={UploadImage}
                  />
                </div>
                <div class="form-group">
                  <textarea
                    class="form-input textArea"
                    placeholder="Caption"
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>
                <div class="form-group ">
                  <select
                    id="cars"
                    className="option"
                    onChange={(e) => {
                      setPostCategory(e.target.value);
                    }}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((e) => {
                      return <option value={e.id}> {e.category} </option>;
                    })}
                  </select>
                </div>
                <div class="form-group">
                  <input
                    type="button"
                    class="form-submit"
                    value="Create"
                    onClick={Create}
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CreatePost;
