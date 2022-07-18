
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
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import '../../admin_css.css';
  import Navbar from "./adminNav";
  import "../APIUrl";

function AddNews() {
    const [title, setTitle] = useState("");
    const [str_NewsBody, setNewsBody] = useState("");
    const [category, setcategory] = useState("");
    const [description, setSmallDis] = useState("");
    const [imageSelected, setimageSelected] = useState("");

    const [BreakingChecked, setBreaking] = useState(false);
    const [TrendingChecked, setTrending] = useState(false);
    const [SlidShowNewsChecked, setSlidShowNews] = useState(false);
    const [TopNewsChecked, setTopNews] = useState(false);

    const [AllCategories,setAllCategory] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news_category/allNewsCategory")
        .then(res => setAllCategory(res.data))
        .catch(error => console.log(error));
    });

    function submitNews(e)
    {
        e.preventDefault();
        const body = str_NewsBody.toString();

        const formData = new FormData();
        formData.append("file" ,imageSelected);
        formData.append("upload_preset", "ml_default");
        axios.post("https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",formData).then((response)=>{
        const image = imageSelected.name;
        const addNews ={title, category, TrendingChecked, BreakingChecked, SlidShowNewsChecked, TopNewsChecked, description, body, image}
    
          axios.post(global.APIUrl+"/news/addNews",addNews).then(() =>{
    
          Swal.fire({  
          title: "Success!",
          text: "News Adding Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
            window.location.href = "/Admin/News";
          }
          });
    
          
      }).catch((err)=>{
    
            Swal.fire({  
            title: "Error!",
            text: "News Adding Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
       });
    }

    function back(){
        window.location.href = "/Admin/Admin_Dashboard";
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
                            <MDBCardTitle className='text-dark text-left text-uppercase' style={{fontSize: '23px'}}>Add News</MDBCardTitle>
                            <hr/>
                            <div class="mb-3 mt-5">
                                <label  class="form-label">Title </label>
                                <input class="form-control"  onChange={(e) =>{
                                        setTitle(e.target.value);
                                    }}/>
                            </div>  
                            <div class="mb-3">
                                <label  class="form-label">Description </label>
                                <textarea class="form-control"  onChange={(e) =>{
                                        setSmallDis(e.target.value);
                                    }}></textarea>
                            </div>  
                            <div class="mb-3">
                                <label  class="form-label">News Category </label>
                                <select class="form-control"  onChange={(e) =>{
                                        setcategory(e.target.value);
                                    }}>
                                    <option value="Select Category">Select Category</option>
                                    {AllCategories.map((AllCategory,key) => (
                                        <option value={AllCategory.name}>{AllCategory.name}</option>
                                    ))}
                                </select>
                            </div> 
                            <div class="mb-3 mt-4">
                                <label  class="form-label">Select Sub Category</label>
                                <div class="form-check ml-4">
                                    <input class="form-check-input" type="checkbox" 
                                    checked={TrendingChecked}
                                    onChange={e => setTrending(e.target.checked)} />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Trending News
                                    </label>
                                </div>
                                <div class="form-check ml-4">
                                    <input class="form-check-input" type="checkbox" 
                                    checked={BreakingChecked}
                                    onChange={e => setBreaking(e.target.checked)} />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Breaking News
                                    </label>
                                </div>
                                <div class="form-check ml-4">
                                    <input class="form-check-input" type="checkbox" 
                                     checked={SlidShowNewsChecked}
                                     onChange={e => setSlidShowNews(e.target.checked)} />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      SlidShow News
                                    </label>
                                </div>
                                <div class="form-check ml-4">
                                    <input class="form-check-input" type="checkbox" value="" 
                                     checked={TopNewsChecked}
                                     onChange={e => setTopNews(e.target.checked)} />
                                    <label class="form-check-label" for="flexCheckDefault">
                                      Top News
                                    </label>
                                </div>
                            </div>  
                            <div class="mb-3   mt-4">
                                <label  class="form-label">Body</label>
                                <CKEditor
                                editor={ ClassicEditor }
                                data=""
                                onChange={(event, editor) =>{
                                const data = editor.getData();
                                setNewsBody(data);
                            }}
                            />
                            </div>
                            <div className="mb-3 mt-2">
                                <label  class="form-label">Image</label><br/>
                                <input type="file" onChange={(e) =>{
                                setimageSelected(e.target.files[0]);
                                }}  id="customFile" />
                            </div> 
                            <div className="text-right">
                                <button type="button" className="btn btn-dark btn-sm" onClick={submitNews}>Save</button>&nbsp;&nbsp;&nbsp;
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


export default AddNews;