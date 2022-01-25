import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./SignUp.css";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const userInfo = {
    user: {
      userName: userName,
      email: email,
      password: password,
      moreInfo: moreInfo,
      personalImg:
        profileImg === ""
          ? "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
          : profileImg,
    },
    role_id: 1,
  };

  const getInfo = () => {
    if (
      userName.length < 1 ||
      password.length < 1 ||
      email.length < 1 ||
      confirmPassword.length < 1
    ) {
      setErrMsg("Please fill all fields with * sign");
    } else {
      if (password !== confirmPassword) {
        setErrMsg("Password is NOT the Same");
      } else {
        axios
          .post("https://final-project-tuwaiq.herokuapp.com/user", userInfo)
          .then((response) => {
            navigate("/LogIN");
          })
          .catch((err) => {
            setErrMsg(err.response.data);
          });
      }
    }
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
    setProfileImg(file.secure_url);
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
                  <h2 class="form-title">Sign UP</h2>
                  <div class="form-group">
                    <div className="errMsg">{errMsg}</div>
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-input"
                      placeholder={"Email * "}
                      onChange={(e) => setEmail(e.target.value.trim())}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-input"
                      name="name"
                      id="name"
                      placeholder={"User Name * "}
                      onChange={(e) => setUserName(e.target.value.trim())}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-input"
                      placeholder={"Password * "}
                      onChange={(e) => setPassword(e.target.value.trim())}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-input"
                      placeholder={"Confirm Password * "}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value.trim())
                      }
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-input"
                      placeholder={"Tell Us More About Your Self"}
                      onChange={(e) => setMoreInfo(e.target.value.trim())}
                    />
                  </div>
                  <div class="form-group">
                    <label htmlFor="filePicker">
                      Upload Image for your Profile:
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="filePicker"
                      className="form-input backGroundUpload"
                      placeholder="Upload an Image"
                      onChange={UploadImage}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="button"
                      class="form-submit"
                      value="Sign up"
                      onClick={getInfo}
                    />
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
export default SignUp;
