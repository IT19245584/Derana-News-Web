
import React, { useState  } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBCardTitle,
  } from 'mdb-react-ui-kit';
  
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { CKEditor } from '@ckeditor/ckeditor5-react';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import '../../admin_css.css';
  import Navbar from "./adminNav";
  import "../APIUrl";
  import NumberFormat from 'react-number-format';

function AddStaff() {
    
    const [emailStatus, setEmailStatus] = useState("");
    const [emailColor, setEmailColor] = useState("");


    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [position, setPosition] = useState("");
    const [nic, setNIC] = useState("");
    const [qualification, setQualification] = useState("");

    const [tel, setTel] =  useState("");
    const [email, setEmail] =  useState("");
    const [username, setUserName] =  useState("");
    const [RePassword, setRePassword] =  useState("");
    const [password, setPassword] =  useState("");
  
    const [isValidCFpassword, setIsValidCfpassword] = useState(false);
    const [messageCfpassword, setMessageCfpassword] = useState('');
    const [PassColor, setPassColor] = useState('');

    function setFunFullName(e){
        const fullName = e;
        setFullName(fullName);

        const fullName_Array = fullName.split(" ");
        setUserName(fullName_Array[0]+fullName_Array[1].charAt(0).toLowerCase());

        setPassword(fullName_Array[0]+fullName_Array[1].charAt(0).toLowerCase()+"@#123");
       
    }

    function setFunRePassword(e){
        const rePassword = e;
        if ((rePassword === password) && (rePassword !=='') && (rePassword!== null) ) {
            setIsValidCfpassword(true);
            setMessageCfpassword('Password Are Matching');
            setPassColor('Green');
            
        } else {
            setIsValidCfpassword(false);
            setMessageCfpassword('Passwords Are Not Match');
            setPassColor('Red');
        }
        setRePassword(rePassword);
    }

    function setFunEmail(e){
        const email_Add = e;
        if(validateEmail(email_Add)){
          setEmailStatus("Email is valid");
          setEmailColor('green');
        }else{
          setEmailStatus("Email is invalid");
          setEmailColor('red');
        }
        setEmail(email_Add);
      }
  
      function validateEmail(email) 
      {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
      }

    function submiStaff(e)
    {
        e.preventDefault();
        const body_qualification = qualification.toString();

       
        const addStaff ={fullName, address, position, nic, username, password, body_qualification, tel, email}
    
          axios.post(global.APIUrl+"/staff/addStaff",addStaff).then(() =>{
    
          Swal.fire({  
          title: "Success!",
          text: "Staff Adding Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
            window.location.href = "/Admin/Staff_Dashboard";
          }
          });
    
          
      }).catch((err)=>{
    
            Swal.fire({  
            title: "Error!",
            text: "Staff Adding Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
     
    }

    function back(){
        window.location.href = "/Admin/Staff_Dashboard";
    }

    return (
    <div>
    <div class="dashboard-main-wrapper">
        <Navbar/>
        <div class="dashboard-wrapper">
            <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h2 className="text-uppercase  d-letter-spacing fw-bold d_font_family" style={{color:'black' }}><i class="bi bi-house-door-fill"></i> Dashboard</h2>
                <hr/>
                <MDBRow style={{ paddingBottom: '5%'}}>
                    
                    <MDBCol sm='12'>
                        <MDBCard className=" bg-light border">
                        <MDBCardBody className="p-5">
                            <MDBCardTitle className='text-dark text-left text-uppercase' style={{fontSize: '23px'}}>Add Staff</MDBCardTitle>
                            <hr/>
                            <div class="mb-3 mt-5 p-4 rounded" style={{backgroundColor:'#EAEAEA'}}>
                                <label  class="form-label">Full Name : </label>
                                <input type="text" class="bg-white form-control" onChange={(e) =>{
                                    setFunFullName(e.target.value);
                                }} />
                            </div> 
                            <div class="row mt-2">
                                <div class="col">
                                    <div class="mb-3 ">
                                        <label  class="form-label">User Name : </label>
                                        <input type="text" class="bg-white form-control" value={username} onChange={(e) =>{
                                            setUserName(e.target.value);
                                        }} />
                                    </div>  
                                </div>
                                <div class="col">
                                    <div class="mb-3">
                                        <label  class="form-label">Password : </label>
                                        <input type="text" class="bg-white form-control" value={password} onChange={(e) =>{
                                            setPassword(e.target.value);
                                        }} />
                                    </div>  
                                </div>
                                <div class="col">
                                    <div class="mb-3 ">
                                        <label  class="form-label">ReType Password : </label>
                                        <input type="text" class="bg-white form-control" onChange={(e) =>{
                                            setFunRePassword(e.target.value);
                                        }} />
                                        <span style={{fontSize:'12px', margin:'0px', padding:'0px' , color: PassColor}}  >
                                            {messageCfpassword}
                                        </span>
                                    </div>  
                                </div>
                            </div>
                             
                            <div class="mb-3">
                                <label  class="form-label">Address : </label>
                                <input type="text" class="bg-white form-control" onChange={(e) =>{
                                    setAddress(e.target.value);
                                }} />
                            </div>  
                            <div class="mb-3">
                                <label  class="form-label">Telephone Number : </label>
                                <NumberFormat format="0## ### ####" class="bg-white form-control"   onChange={(e) =>{
                                    setTel(e.target.value);
                                }} />
                            </div> 
                            <div class="mb-3">
                                <label  class="form-label">Email : </label>
                                <input type="text" class="form-control form-control-lg" placeholder="Your Email" onChange={(e) =>{
                                    setFunEmail(e.target.value);
                                }}/>
                                 <small style={{fontSize: '14px' , color:emailColor}}>{emailStatus}</small>
                            </div> 
                            <div class="mb-3">
                                <label  class="form-label">Position </label>
                                <select class="form-control"  onChange={(e) =>{
                                        setPosition(e.target.value);
                                    }}>
                                    <option value="Select Position">Select Position</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Editor">Editor</option>
                                   
                                </select>
                            </div> 
                            <div class="mb-3">
                                <label  class="form-label">NIC : </label>
                                <NumberFormat format="#########V" class="bg-white form-control"   onChange={(e) =>{
                                    setNIC(e.target.value);
                                }} />
                            </div>  
                            <div class="mb-3   mt-4">
                                <label  class="form-label">Qualification : </label>
                                <CKEditor
                                editor={ ClassicEditor }
                                data=""
                                onChange={(event, editor) =>{
                                const data = editor.getData();
                                setQualification(data);
                            }}
                            />
                            </div>
                           
                            <div className="text-right">
                                <button type="button" className="btn btn-dark btn-sm" onClick={submiStaff}>Save</button>&nbsp;&nbsp;&nbsp;
                                <button type="button" className="btn btn-outline-dark btn-sm"  onClick={back}>Back</button>
                            </div>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
      </div>
    </div>
      )
};


export default AddStaff;