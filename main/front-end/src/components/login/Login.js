// import React, { useState } from 'react';
// import GoogleLogin from 'react-google-login';
// // import { useHistory } from "react-router-dom";

// function Login() {
//     // const [loginData, setLoginData] = useState(
//     //     localStorage.getItem('loginData')
//     //     ? JSON.parse(loginData.getItem('loginData'))
//     //     : null
//     // );

//     const handleFailure = (result) => {
//         alert(result);
//     };

//     const handleLogin = (googleData) => {
//         // const res = await fetch('/login', {
//         //     method: 'POST',
//         //     body: JSON.stringify({
//         //         token: googleData.tokenId,
//         //     }),
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     },
//         // });

//         // const data = await res.json();
//         // setLoginData(data);
//         // localStorage.setItem('loginData', JSON.stringify(data));
//         console.log(googleData);
//     };

//     // const handleLogout = () => {
//     //     localStorage.removeItem('loginData');
//     //     setLoginData(null);
//     // };

//     return (
//         <div className='Login'>
//             <header className='Login-header'>
//                 <div>
//                     {loginData ? (
//                             <div>
//                             <h3>You logged in as {loginData.email}</h3>
//                             <button onClick={handleLogout}>Logout</button>
//                             </div>
//                         ) : (
//                             <GoogleLogin
//                                 clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//                                 buttonText="Log in with Google"
//                                 onSuccess={handleLogin}
//                                 onFailure={handleFailure}
//                                 cookiePolicy={'single_host_origin'}
//                             ></GoogleLogin>
//                         )}
//                     <h1 className="">Pet My Dog</h1>
//                 </div>
//             </header>
//         </div>
//     )
// }

// export default Login;