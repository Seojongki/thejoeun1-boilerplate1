import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';


function LoginForm () {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [cookies, setCookie] = useCookies(); //쿠키

  const submitHandler = async (event) => {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": jsonContent,
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      })
    })
    .then(res => {
      console.log('res.status: ', res.status);
      if (res.status !== 200) {
        return alert('로그인에 실패하였습니다. 다시 시도해주세요~');
      }

      return res.json();
    })
    .then(data => {      
      if (data) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('expirationTime', String(data.tokenExpiresIn));

        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('expirationTime', String(data.tokenExpiresIn));

        const expireTimeDate = new Date(Number(data.tokenExpiresIn));
        // console.log('expireTime: ', expireTimeDate.toLocaleString());
        setCookie('token', data.accessToken, { expires: expireTimeDate });
       
        
        navigate('/');
      }
    });
  };







  return (
    <section className="d-flex vh-100" style={{ backgroundColor: "rgb(33,37,41)" }}>
      <div className="container-fluid justify-content-center align-content-center" style={{}}>
        <div className="card bg-dark" style={{borderRadius: '1rem', border: '0px' }}>
          <div className="card-body p-5 text-center">
            <h2 className="text-white">LOGIN</h2>
            <p className="text-white-50 mt-2 mb-5">서비스를 사용하려면 로그인을 해주세요!</p>
            <div className="mb-2">
              <form className='' onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label text-white">Email address</label>
                  <input type="email" style={{}} className="form-control" name="email" id='email' required ref={emailInputRef}/>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input type="password" style={{}} className="form-control" name="password" required ref={passwordInputRef} />
                </div>
                <button type="submit" className="btn btn-primary">로그인</button>
              </form>
              <br />
              <div>
                <a href={`${process.env.API_GATEWAY_HOST}/oauth2/authorization/google`}>
                  <img src={`${process.env.PUBLIC_URL}/img/google3.png`} alt="google" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm;