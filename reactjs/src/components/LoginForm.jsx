import React, {useState, useRef, useContext, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const LoginForm = () => {



    return (
        <section className="d-flex vh-100">
            <div className="container-fluid row justify-content-center align-content-center">
                <div className="card bg-dark" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center">
                    <h2 className="text-white">LOGIN</h2>
                    <p className="text-white-50 mt-2 mb-5">서비스를 사용하려면 로그인을 해주세요!</p>

                    <div className = "mb-2">
                    <form action="/login" method="POST">
                        <input type="hidden"  />
                        <div className="mb-3">
                        <label className="form-label text-white">Email address</label>
                        <input type="email" className="form-control" name="username" />
                        </div>
                        <div className="mb-3">
                        <label className="form-label text-white">Password</label>
                        <input type="password" className="form-control" name="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                    <button type="button" className="btn btn-secondary mt-3" onclick="location.href='/signup'">회원가입</button>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;