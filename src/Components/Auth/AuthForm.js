import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';
import { useNavigate } from 'react-router';
import { FaUser, FaKey } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../Store/UserAction';


const AuthForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const emailRef = useRef();
  const passRef = useRef();
  const pass2Ref = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [sending, setSending] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError('');
  };

  const checkValidity = (pass1, pass2) => {
    if (pass1 === pass2) {
      setValid(true);
    } else {
      setValid(false);
      setError('Password does not match.');
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    setSending(true);
    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;
console.log(enteredEmail);

    if (!isLogin) {
      const confirmPass = pass2Ref.current.value;
      checkValidity(enteredPass, confirmPass);

      if (!valid) {
        setSending(false);
        return;
      }
    }
    navigate('/home')
      let url;

      if (isLogin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJbcNpE21o9jg7AVvSj6jW5HfjfViHduc';
      } else {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJbcNpE21o9jg7AVvSj6jW5HfjfViHduc';
      }

      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          setSending(false);
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              console.log(data);
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          dispatch(fetchUserData(data.idToken))
          const user ={
            token : data.idToken,
            email : data.email,
          }
          localStorage.setItem('userDetails',  JSON.stringify(user))
          navigate('/home');
        })
        .catch((err) => {
          setError(err.message);
        });
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
    navigate('/forgotPassword')
  };

  return (
    <div className={classes.container}>
      <section className={classes.auth}>
        <h1>{isLogin ? 'Welcome Back User !!' : 'Be a member of our community  !!'}</h1>
        <hr />
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email"> <FaUser /> Your Email : </label>
            <input type="email" id="email" required ref={emailRef} />
          </div>
          <hr />
          <div className={classes.control}>

            <label htmlFor="password"><FaKey /> Your Password : </label>
            <input type="password" id="password" required ref={passRef} />
            <hr />

          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="confirmPassword"> <FaKey /> Confirm Password  : </label>
              <input type="password" id="confirmPassword" required ref={pass2Ref} />
              <hr />

            </div>

          )}
          {error && <p className={classes.error}>{error}</p>}
          {sending && <p style={{ color: 'aqua' }}>Sending Request...</p>}
          <div className={classes.actions}>
            {!sending && (
              <button>{isLogin ? 'Log In' : 'Create Account'}</button>
            )}
            {
              !isLogin && 
              <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >Have an account ?? Click to login !!
            </button>
            }
              {!forgotPassword && isLogin && (
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >Create new account !!
              </button>
              <span style={{ margin: '10px 50px' }}>
                
                  <button
                    type="button"
                    className={classes.toggle}
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
              </span>
            </div>
              )}
          </div>
         
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
