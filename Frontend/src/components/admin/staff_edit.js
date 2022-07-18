
import React, { useState , useEffect } from 'react';
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
  import {reactLocalStorage} from 'reactjs-localstorage';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import '../../admin_css.css';
  import Navbar from "./adminNav";
  import "../APIUrl";

function EditStaff() {

    var Staff_Edit = reactLocalStorage.getObject('Staff_Edit');
    const userName = Staff_Edit[0];

    const [OneStaff,getOneStaff] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/staff/oneStaff/"+userName)
        .then(res => getOneStaff(res.data))
        .catch(error => console.log(error));
    },[]);


    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [position, setPosition] = useState("");
    const [nic, setNIC] = useState("");
    const [qualification, setQualification] = useState("");

    const [tel, setTel] =  useState("");
    const [email, setEmail] =  useState("");

    function updateStaff(e)
    {
        e.preventDefault();
        const body_qualification = qualification.toString();

       
        const editStaff ={fullName, address, position , userName,  body_qualification, tel, email}
    
          axios.put(global.APIUrl+"/staff/updateStaff",editStaff).then(() =>{
    
          Swal.fire({  
          title: "Success!",
          text: "Staff Updating Success!",
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
            text: "Staff Updating Not Success",
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
                        {OneStaff.map((staff,key) => (
                        <MDBCardBody className="p-5">
                            <MDBCardTitle className='text-dark text-left text-uppercase' style={{fontSize: '23px'}}>Edit Staff</MDBCardTitle>
                            <hr/>
                            <div class="mb-3 mt-5 p-4 rounded" style={{backgroundColor:'#EAEAEA'}}>
                                <label  class="form-label">Full Name : </label>
                                
                                <input type="text" class="bg-white form-control" defaultValue={staff.fullName} onChange={(e) =>{
                                    setFullName(e.target.value);
                                }} />
                            </div> 
                             
                            <div class="mb-3">
                                <label  class="form-label">Address : </label>
                                <input type="text" class="bg-white form-control" defaultValue={staff.address} onChange={(e) =>{
                                    setAddress(e.target.value);
                                }} />
                            </div>  
                            <div class="mb-3">
                                <label  class="form-label">Telephone Number : </label>
                                <input type="text" class="bg-white form-control" defaultValue={staff.tel} onChange={(e) =>{
                                    setTel(e.target.value);
                                }} />
                            </div> 
                            <div class="mb-3">
                                <label  class="form-label">Email : </label>
                                <input type="text" class="bg-white form-control" defaultValue={staff.email} onChange={(e) =>{
                                    setEmail(e.target.value);
                                }} />
                            </div> 
                            <div class="mb-3">
                                <label  class="form-label">Position </label>
                                <select class="form-control"  defaultValue={staff.position} onChange={(e) =>{
                                        setPosition(e.target.value);
                                    }}>
                                    <option value="Select Position">Select Position</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Editor">Editor</option>
                                   
                                </select>
                            </div> 
                            <div class="mb-3">
                                <label  class="form-label">NIC : <sup className="text-danger">* Can Not Edit</sup> </label>
                                <input type="text" disabled="true" class="bg-white form-control" defaultValue={staff.nic} onChange={(e) =>{
                                    setNIC(e.target.value);
                                }} />
                            </div>  
                            <div class="mb-3   mt-4">
                                <label  class="form-label">Qualification : </label>
                                
                                <CKEditor
                                editor={ ClassicEditor }
                                data={staff.qualification}
                                onChange={(event, editor) =>{
                                const data = editor.getData();
                                setQualification(data);
                            }}
                            />
                            </div>
                           
                            <div className="text-right">
                                <button type="button" className="btn btn-dark btn-sm" onClick={updateStaff}>Update</button>&nbsp;&nbsp;&nbsp;
                                <button type="button" className="btn btn-outline-dark btn-sm"  onClick={back}>Back</button>
                            </div>
                        </MDBCardBody>
                        ))}
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
      </div>
    </div>
      )
};


export default EditStaff;