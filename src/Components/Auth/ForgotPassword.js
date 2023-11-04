import React, { useRef } from 'react';
import './ForgotPassword.css';
// import axios from 'axios';

const ForgotPassword = () => {
    const emailRef = useRef();

    // const changePassword =async (email)=>{
    //     try{
    //      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDBUXC46Nhb92NFzchS0XTtwXge3LCkC80',
    //      {
    //         requestType :"PASSWORD_RESET",
    //         email : email
    //     });
    //         console.log('changePassword Success');
    //         console.log(response);
    //         alert('please check your mail to change password')
    //       } catch (error) {
    //         console.error("change password failed:", error);

    //     }
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        console.log('Email submitted:', email);
        // changePassword(email);
        emailRef.current.value = "";
    };

    return (
        <div className='bodyForgot'>

        <div className="card text-center">
        <div className="card-header h5 text-white bg-primary">Password Reset</div>
        <div className="card-body px-8">
          <p className="card-text py-3">
            Enter your email address and we'll send you an email with instructions to reset your password.
          </p>
          <div className="form-outline">
            <input
              type="email"
              id="typeYourEmail"
              className="form-control my-3"
              ref={emailRef}
              required
            />
           
          </div>
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Reset password
          </button>
          <div className="d-flex justify-content-between mt-3" >
            <a href="/login" style={{ color: '#000' }}>Login</a>
            <a href="/login" style={{ color: '#000' }}>Register</a>
          </div>
        </div>
      </div>
        </div>
    );
  };

export default ForgotPassword;
