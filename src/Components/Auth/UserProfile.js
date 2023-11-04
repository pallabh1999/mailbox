import React, { useState,useRef } from "react";
// import { FaAlignCenter } from "react-icons/fa";
import './UserProfile.css';
import * as FaIcons from "react-icons/fa";
import { Form, Button, Alert } from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import { onUpdate} from '../../Store/UserAction';
import { userAction } from "../../Store/UserSlice";

const UserProfile = () => {
const dispatch = useDispatch();
  const[changePass, setChangePass] = useState(false);
  const [valid, setValidity] = useState(true);
  const passRef = useRef();
  const pass2Ref = useRef();
  const nameRef = useRef();
  const profileRef = useRef();
  const profilePicture = useSelector((state) => state.userInfo.profilePicture);
  const userName = useSelector((state) => state.userInfo.userName);
  const token = useSelector((state) => state.userInfo.token);
  const profilePIcDefault =
    "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";

  const userData = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const profile = profileRef.current.value;
    const data ={
      name : name,
      profile : profile,
      token :token
    }
    console.log(data);
    dispatch(onUpdate(data));
  };
  const checkValidity = (pass1, pass2) => {
    if (pass1 === pass2) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  };

  const passwordChange = (event) => {
    event.preventDefault();

    const enteredPass = passRef.current.value;
    const confirmPAss = pass2Ref.current.value;
    console.log(enteredPass, confirmPAss);
    checkValidity(enteredPass, confirmPAss);
    if (valid) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBJbcNpE21o9jg7AVvSj6jW5HfjfViHduc', {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: enteredPass,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.ok) {
          
          dispatch(
            userAction.showNotification({
              status: 'success',
              title: 'Success...',
              message: 'Password Updated successfully!',
            }));
            dispatch(userAction.logOutMethod());
        } else {
          response.json().then((data) => {
            const errorMessage = data.error.message;
            alert(`Error: ${errorMessage}`);
            console.error(`Error: ${errorMessage}`);
          });
        }
      }).catch((error) => {
        dispatch(
          userAction.showNotification({
            status: 'error',
            title: 'Failed...',
            message: error,
          }));
      });
    }
    passRef.current.value = '';
    pass2Ref.current.value = '';
  };

  const togglePass=()=>{
    setChangePass(!changePass);
  }

  return (
    <>
      <div className="container content mt-4">
       <h5>Update Profile <FaIcons.FaAddressCard /> </h5>
       <hr/>
        <div className="col-md-4 ">
            <div className="profile_section">
              <img
                src={
                  localStorage.getItem("img")
                    ? localStorage.getItem("img")
                    : profilePIcDefault
                }
                alt="profile_pic"
                className="img-thumbnail"
                height={250}
                width={250}
              />
            </div>
          </div>
        <div className="row border p-4">
          <form onSubmit={userData}>
          <div className="col-md-6">
          <label style={{ color: '#fff' }}>User Name : </label>
            <div className="mb-3">
             
              <input
                type="text"
                className="form-control"
                defaultValue={userName || ''}
                ref={nameRef}
                required
                id="exampleInputName"
                placeholder="Enter full name"
              />
            </div>
            <label style={{ color: '#fff' }}>Profile Photo Url : </label>
            <div className="mb-3">
             
             <input
               type="text"
               className="form-control"
               id="profilePhoto"
               defaultValue={profilePicture || ''}
            required
               ref={profileRef}
               placeholder="paste file link"
             />
           </div>
            <button
              type="submit"
              className=" form__submit-btn center-button"
              
            >
              Submit
            </button>
          </div>
          </form>
          

         
        </div>

        <hr/>
    
          {!changePass && (
    <div>
            <h5>Or Having Security issue.....  Want to change password ?</h5>
          <button
              type="submit"
              className=" form__submit-btn center-button"
              onClick={togglePass}
            >Change Password
           </button>
           
          </div>
          )}
          {changePass &&(
            <div className='changePass'>
            <p style={{ color: '#fff' }}>It is advised to change password in month for avoiding any security issue</p>
            {!valid && (
              <Alert variant='danger'>
                Passwords did not match. Please make sure both passwords are the same.
              </Alert>
            )}
            <Form onSubmit={passwordChange}>
            <Form.Group controlId='new-password'>
            <label style={{ color: '#fff' }}>New Password : </label>
            <Form.Control type='password' minLength='7' ref={passRef} required />
          </Form.Group>

          <Form.Group controlId='new-password2'>
            <label style={{ color: '#fff' }}>Confirm Password : </label>
            <Form.Control type='password' minLength='7' ref={pass2Ref} required />
          </Form.Group>
              <Button type='submit' className="form__submit-btn center-button">Change Password</Button>
            </Form>
          </div>
    
          )}
      </div>
    </>
  );
};

export default UserProfile;
