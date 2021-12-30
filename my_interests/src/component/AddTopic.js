import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function AddTopic() {
  const [topic, setTopic] = useState();

  const state = useSelector((state)=>{
    return {
        userInfo: state.UserReducer,
        token: state.UserReducer.token
    }
})

  const data = {
    "category":topic
  }


  const navigate = useNavigate()

  const CreateTopic = () => {
      const config = {
        headers:{Authorization: `Bearer ${state.token}`}
    }
    axios
    .post("http://localhost:8080/category",data,config)
    .then(response=>{
        navigate("/Admin")
    })
    .catch(err=>{console.log(err.response)})
  };

  return (
    <>
      <section class="signup">
        <div class="container">
          <div class="signup-content">
            <form method="POST" id="signup-form" class="signup-form">
              <h2 class="form-title">Add New Topic</h2>
              <div class="form-group">
                <input
                  type="text"
                  class="form-input"
                  placeholder="Topic"
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div class="form-group">
                <input
                  type="button"
                  class="form-submit"
                  value="Add Topic"
                  onClick={CreateTopic}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddTopic;
