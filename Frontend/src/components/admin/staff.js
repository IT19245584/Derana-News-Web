
import React, { useState , useEffect } from 'react';
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
  } from 'mdb-react-ui-kit';
  
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import {reactLocalStorage} from 'reactjs-localstorage';
  import '../../admin_css.css';
  import Navbar from "./adminNav";
  import "../APIUrl";

function Staff() {
    const [AllStaff,getAllStaff] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/staff/allStaff")
        .then(res => getAllStaff(res.data))
        .catch(error => console.log(error));
    });

    function add_staff(){
        window.location.href = "/Admin/Staff_Add";
    }

    function deleteStaff(id){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are You Sure?',
            text: "Do You Want To Delete Staff? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(global.APIUrl+"/staff/deleteStaff/"+id).then(() =>{
                Swal.fire({  
                    title: "Success!",
                    text: "Staff Deleted",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"})
        
            }).catch((err)=>{
                Swal.fire({  
                    title: "Error!",
                    text: "Staff Not Deleted",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"})
            })
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Deleting cancel',
                'error'
              )
            }
          })
    }

    function EditStaff(username){
        reactLocalStorage.setObject("Staff_Edit", [username]);
        window.location.href = "/Admin/Staff_Edit";
    }

    return (
        <div>
            <div class="dashboard-main-wrapper">
                <Navbar/>
                <div class="dashboard-wrapper">
                <div class="container" style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                    <h2 className="text-uppercase  d-letter-spacing fw-bold d_font_family" style={{color:'black' }}><i class="bi bi-house-door-fill"></i> Dashboard</h2>
                    <hr/>
                    <div className="text-right mt-4">
                        <button onClick={add_staff} style={{ letterSpacing:'1px'}}   className='btn btn-sm btn-dark shadow-0 btn-sm'   >Add</button>
                    </div>
                    
                    <MDBTable className="mt-2">
                        <MDBTableHead>
                            <tr style={{backgroundColor:'#3A3A3A'}}>
                                <th scope='col' className="text-white fw-normal pt-3 pb-3 " style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">Name</span></th>
                                <th scope='col' className="text-white fw-normal pt-3 pb-3 " style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">Telephone Number</span></th>
                                <th scope='col' className="text-white fw-normal pt-3 pb-3 " style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">Email</span></th>
                                <th scope='col' className="text-white fw-normal pt-3 pb-3 " style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">Home Address</span></th>
                                <th scope='col' className="text-white fw-normal pt-3 pb-3 " style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">Position</span></th>
                                <th scope='col' className="text-white fw-normal pt-3 pb-3 " style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">Action</span></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                        {AllStaff.map((staff,key) => (
                            <tr className="bg-white text-dark">
                                <th scope='col' className=" fw-normal" style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">{staff.fullName}</span></th>
                                <th scope='col' className=" fw-normal" style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">{staff.tel}</span></th>
                                <th scope='col' className=" fw-normal" style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">{staff.email}</span></th>
                                <th scope='col' className=" fw-normal" style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">{staff.address}</span></th>
                                <th scope='col' className=" fw-normal" style={{fontSize:'15px',letterSpacing:'1px'}}><span className="d_font_family">{staff.position}</span></th>
                                <th scope='col' className=" fw-normal" style={{fontSize:'15px',letterSpacing:'1px'}}>
                                    <i class="bi bi-trash3-fill text-danger"  onClick={()=>deleteStaff(
                                        staff._id)}  style={{fontSize:'16px'}}></i>&nbsp;&nbsp;&nbsp;
                                    <i class="bi bi-pencil-square text-success" onClick={()=>EditStaff(
                                        staff.username)} style={{fontSize:'16px'}}></i>
                                </th>
                            </tr>
                        ))}
                        </MDBTableBody>
                    </MDBTable>

                </div>
                </div>
            </div>
        </div>
    )
};


export default Staff;