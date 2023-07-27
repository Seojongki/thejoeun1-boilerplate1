import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useRef, useContext, useEffect} from 'react';

const SignUpForm = () => {
    return (
        <section className="d-flex vh-100">
            <div className="container-fluid row justify-content-center align-content-center">
                <div className="card bg-dark" style={{borderRadius:"1rem"}}>
                <div className="card-body p-5 text-center">
                    <h2 className="text-white">SIGN UP</h2>
                    <p className="text-white-50 mt-2 mb-5">서비스 사용을 위한 회원 가입</p>

                    <div className = "mb-2">
                    <form  method="POST">
                        {/* <!-- 토큰을 추가하여 CSRF 공격 방지 --> */}
                        <input type="hidden"  />
                        <div className="mb-3">
                        <label className="form-label text-white">Email address</label>
                        <input type="email" className="form-control" name="email" />
                        </div>
                        <div className="mb-3">
                        <label className="form-label text-white">Password</label>
                        <input type="password" className="form-control" name="password" />
                        </div>
                        <div className="mb-3">
                        <label className="form-label text-white">nickname</label>
                        <input type="text" className="form-control" name="nickname" />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </section>        
    );
};

export default SignUpForm;