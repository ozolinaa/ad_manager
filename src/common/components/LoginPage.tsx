import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="container">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div className="jumbotron text-center text-primary">
            <h1><span className="fa fa-lock"></span> Social Authentication</h1>
            <p>Login or Register with:</p>
            <a href="/auth/google" className="btn btn-danger"><span className="fa fa-google"></span> SignIn with Google</a>
        </div>
    </div>  
  );
};

export default LoginPage;
