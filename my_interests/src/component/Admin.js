import "./Admin.css";
import AddTopic from "../images/icons8-new-100.png";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <>
      <div className="mainPage">
        <div></div>
        <div className="midGrid">
          <Link to="/Admin/AddTopic" className="textAdmin">
            <div className="gridAdminPage">
              <input type="image" src={AddTopic} />
              <div>Add New Topic</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Admin;
