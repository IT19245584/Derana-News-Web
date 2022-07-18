
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';


function Login() {

    const [userName, setUserName] = useState(false);
    const [password, setPassword] = useState(false);

    async function login(e){
       e.preventDefault();

       let item = {userName , password};
       let result = await fetch(global.APIUrl+"/staff/login", {
         method: 'POST',
         headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
         },
         body:JSON.stringify(item)
      });
      result = await result.json();
      
      if( (JSON.stringify(result.message) === '"Editor"') || (JSON.stringify(result.message) === '"Admin"')){
          Cookies.set('userType',JSON.stringify(result.message), { expires: 70000, path: '' });
  
          	Swal.fire({  
			title: "Success!",
			text: "Login Success",
			icon: 'success',
			confirmButtonText: "OK",
			type: "success"}).then(okay => {
				if (okay) {
					window.location.href = "/Admin/Admin_Dashboard";
				}
			});
      }else{
          	Swal.fire({  
			title: "Error!",
			text: "Login Not Success",
			icon: 'error',
			confirmButtonText: "OK",
			type: "success"})
       }
    }

      return (
    <div>
            <div class="global-container"  style={{ paddingBottom:'1%'}}>
            <div class="card login-form shadow border-0 rounded">
            <div class="card-body" >
                <div class="card-text">
                    <form action="#" method="post" >
                    <center>
                        <img src="https://i.pinimg.com/originals/2c/b5/b7/2cb5b7bfa9506a980435078b0d41379d.gif" className="img-fluid" style={{width:'60%'}} alt=""/>
                    </center>
                    <h6 className="fw-normal text-black-50">User Name</h6>
                    <div class="form-group  mt-3">
                        <input type="text" class="form-control" 
                         onChange={(e) =>{
                            setUserName(e.target.value);
                        }}/>
                    </div>
                 
                   <div class="form-group mt-3">
                         <h6 className="fw-normal text-black-50">Password</h6>
                        <input type="password" class="form-control"  id="pass" onChange={(e) =>{
                            setPassword(e.target.value);
                        }}/>
                    </div>
                     
                    <div class="mt-3 mb-2" >
                        <button onClick={login} type="button" class="btn  d-letter-spacing shadow-0 fw-light bg-danger" style={{width:'100%'}} ><span className="h6 text-white">Login</span></button>  
                    </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </div>
      )
};


export default Login;