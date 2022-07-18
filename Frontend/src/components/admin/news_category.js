
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import "../APIUrl";

function NewsCategory() {

      const [name, setCategory] = useState("");
      const [AllCategories,setAllCategory] = useState([]);

      function Save(e){
            e.preventDefault();
            const image = "ss";
            const vehicleCategory ={ name , image}

            axios.post(global.APIUrl+"/news_category/add_News_category",vehicleCategory).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "News Category Added!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
            if (okay) {
                axios.get(global.APIUrl+"/news_category/allNewsCategory")
                .then(res => setAllCategory(res.data))
                .catch(error => console.log(error));

                setCategory("");
            }
            });

            
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "News Category Not Added!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
      }


    useEffect(() => {
        axios.get(global.APIUrl+"/news_category/allNewsCategory")
        .then(res => setAllCategory(res.data))
        .catch(error => console.log(error));
    });

    
    function remove(name)
    { 
        axios.delete(global.APIUrl+"/news_category/deleteCategory/"+name).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "News Category Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "News Category Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }  

    function back(){
        window.location.href = "/Admin/Admin_Dashboard";
    }

    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h2 className="text-uppercase  d-letter-spacing fw-bold d_font_family" style={{color:'black' }}><i class="bi bi-house-door-fill"></i> Dashboard</h2>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                         <h3 className="text-uppercase">News Category </h3>
                     </center>
                      <MDBRow className='mt-3'>
                        <MDBCol sm='5'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody id="divToPrint">
                               
                               <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                         <th scope='col' className="text-white d-letter-spacing "><h5 className="text-white-50 pt-3" style={{lineHeight:'0px'}}>Category</h5></th>
                                         <th scope='col' className="text-white d-letter-spacing  text-center"><h5 className="text-white-50 pt-3" style={{lineHeight:'0px'}}>Action</h5></th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                       {AllCategories.map((AllCategory,key) => (
                                            <tr className="bg-light">
                                                <td >
                                                    <h5 className="pt-3" style={{lineHeight:'0%'}}>
                                                        {AllCategory.name}
                                                    </h5>
                                                </td>
                                                <td className="text-center">
                                                    <button  className="shadow-0 btn btn-outline-danger btn-sm "  onClick={() => remove(AllCategory.name)}><i class="bi bi-trash-fill"></i></button>{''}&nbsp;&nbsp;
                                                </td>
                                            </tr>
                                       ))}
                                </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody  className="bg-light">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">New Category</label>
                                    <input type="text" class="form-control" 
                                    value={name}
                                    onChange={(e) =>{
                                        setCategory(e.target.value);
                                    }}/>
                                </div>
                                <div className="text-right">
                                    <button type="button" className="btn btn-dark btn-sm" onClick={Save}>Save</button>&nbsp;&nbsp;&nbsp;
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


export default NewsCategory;