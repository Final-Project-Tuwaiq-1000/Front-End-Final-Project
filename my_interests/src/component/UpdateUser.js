import "./UpdateUser.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

function UpdateUser() {
  const state = useSelector((state) => {
    return {
      userInfo: state.UserReducer,
      token: state.UserReducer.token,
    };
  });

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [requiredField, setRequiredField] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const { user_id } = useParams();

  const data = {
    userName: userName,
    email: email,
    moreInfo: moreInfo,
    personalImg: image,
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://final-project-tuwaiq.herokuapp.com/user/${user_id}`)
      .then((response) => {
        setUserName(`${response.data.userName}`);
        setEmail(`${response.data.email}`);
        setMoreInfo(`${response.data.moreInfo}`);
        setImage(`${response.data.personalImg}`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const UpdateInfo = () => {
    if (email.length < 1 || userName.length < 1) {
      setRequiredField("Please Fill All Feilds With ' * ' Sign");
    } else {
      const config = {
        headers: { Authorization: `Bearer ${state.token}` },
      };
      axios
        .put(
          `https://final-project-tuwaiq.herokuapp.com/user/${user_id}`,
          data,
          config
        )
        .then((response) => {
          navigate(`/${user_id}`);
        })
        .catch((err) => console.log(err.response));
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

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
        <div className="form">
          <section class="signup">
            <div class="container">
              <div class="signup-content">
                <form method="POST" id="signup-form" class="signup-form">
                  <h2 class="form-title">Update User</h2>
                  <div className="errMsg">{requiredField}</div>
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
                    <input
                      type="email"
                      class="form-input"
                      defaultValue={email}
                      placeholder={"Email * "}
                      onChange={handleChangeEmail}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-input"
                      name="name"
                      id="name"
                      defaultValue={userName}
                      placeholder={"User Name * "}
                      onChange={(e) => setUserName(e.target.value.trim())}
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-input"
                      defaultValue={moreInfo}
                      placeholder={"Tell Us More About Your Self"}
                      onChange={(e) => setMoreInfo(e.target.value.trim())}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="button"
                      class="form-submit"
                      value="Update"
                      onClick={UpdateInfo}
                    />
                  </div>
                  <div class="form-group"></div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
