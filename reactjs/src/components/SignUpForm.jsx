import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUpForm () {
  let navigate = useNavigate();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const nicknameInputRef = useRef(null);
  
  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredNickname = nicknameInputRef.current.value;
    
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

    fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        "Content-Type": jsonContent,
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        nickname: enteredNickname,
      })
    }).then(data => {
       console.log(data);
       console.log('status: ', data.status);
      if (data && data.status === 200) {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      } else {
        alert('회원등록이 실패되었습니다.');
      }
    });
  }

  return (
    <section className="d-flex vh-100" style={{ backgroundColor: "rgb(33,37,41)" }}>
      <div className="container-fluid justify-content-center align-content-center">
        <div className="card bg-dark" style={{ borderRadius: '1rem', border: '0px' }}>
          <div className="card-body p-5 text-center">
            <h2 className="text-white">회원가입</h2>
            <p className="text-white-50 mt-2 mb-5">서비스 사용을 위해서 회원가입을 해주세요</p>
            <div className="mb-2">
              {/* <form method="POST" onSubmit={submitHandler}> */}
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label text-white">Email address</label>
                  <input type="email" className="form-control" name="email" id='email' required ref={emailInputRef} />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input type="password" className="form-control" name="password" id='password' required ref={passwordInputRef} />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Nickname</label>
                  <input type="text" className="form-control" name="nickname" required ref={nicknameInputRef} />
                </div>
                <button type="submit" className="btn btn-primary">회원가입</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;