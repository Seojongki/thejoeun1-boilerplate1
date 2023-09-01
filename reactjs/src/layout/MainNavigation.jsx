import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap";
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from 'bootstrap/dist/js/bootstrap';

function MainNavigation() {

    const navigate = useNavigate();


    const [cookies, setCookie, removeCookie] = useCookies(['token']); //쿠키
    const [nickName, setNickName] = useState();
    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

    let isLogin = false;
    const cookieToken = cookies.token;
    if (cookies.token){
        isLogin = true;
    }
    
    useEffect(() => {
        if(isLogin){
            const accessToken = 'Bearer ' + cookieToken;

            fetch('/api/member/me', {
                method: 'GET',
                headers:{
                    "Content-Type": jsonContent,
                    "Authorization": accessToken,
                },                
            })
            .then(res => {
                if(!(res && res.status === 200)){
                    alert('회원정보를 가져오는데 실패하였습니다.');
                }

                return res.json();
            })
            .then(data => {
                console.log('member/me', data)
                if(data)
                    setNickName(data.nickname);
            });
        }
    }, [isLogin])

    const toggleLogoutHandler = () => {
        removeCookie('token');

        alert('로그아웃하였습니다.');
        navigate('/', true);

    }


    return (
        <header>
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div class="container-fluid">
                    <Link to='/' className='navbar-brand '>LOGO</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
          <div className='collapse navbar-collapse justify-content-between' id='navbarSupportedContent'>
                        <ul className='navbar-nav'>
                            <li><Link to='/' className='nav-link'>Home</Link></li>
                            <li><Link to='/about' className='nav-link'>About</Link></li>
                        </ul>
                        <ul className='navbar-nav'><li>
                            {!isLogin && <Link to='/login' className='nav-link'>Login</Link>}
                            </li><li>
                            {!isLogin && <Link to='/signup' className='nav-link'>SignUp</Link>}
                            </li>

                            <li>
                            {isLogin && <Link to='/profile' className='nav-link'>{nickName}님 반갑습니다.</Link>}
                            </li><li>
                            {isLogin && <button onClick={toggleLogoutHandler}  className='nav-link' >Logout</button>}
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default MainNavigation;