import React, {useState} from 'react';
import { apiRequest } from "./Api/Index";
import { Redirect } from "react-router-dom";
var constants = require("./Api/ApiRoutes");


function Login(){
    const [redirectionhere, setRedirect] = useState(false);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        console.log("form",form);
        let params = new FormData(form);
        apiRequest(constants.method, constants.loginUser.url)
          .then((response) => {
            if (response.response != "success") {
              console.log("Failure",response);
            } else {
                console.log("response",response );
                let user = {};
                user.name = "David";
                user.image_url ="http://placeimg.com/150/150/tech";
              localStorage.setItem("user", JSON.stringify(user));
              setRedirect(true);
            }
          })
          .catch((error) => {
            alert(error);
          });
    }

    if(redirectionhere){
        window.location.reload();
        return <Redirect to={"/todo"} />;
    };

    return(
        
<div className="container">
    <div className="row">
        <div className="col-md-12">
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username </label>
                    <input type="text" className="form-control" name="username" required placeholder="username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" required placeholder="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
    );
}

export default Login;