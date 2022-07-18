
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
  import {reactLocalStorage} from 'reactjs-localstorage';
  import '../../admin_css.css';
  import Navbar from "./adminNav";
  import "../APIUrl";

function EditNews() {
    let EditNews = reactLocalStorage.getObject('EditNews');
    const news_id = EditNews[0];
    const news_image = EditNews[9];

    const [title, setTitle] = useState(EditNews[1]);
    const [str_NewsBody, setNewsBody] = useState("");
    const [category, setcategory] = useState(EditNews[2]);
    const [description, setSmallDis] = useState(EditNews[7]);

    const [BreakingChecked, setBreaking] = useState((EditNews[4] === 'true') ? true : false);
    const [TrendingChecked, setTrending] = useState((EditNews[3] === 'true') ? true : false);
    const [SlidShowNewsChecked, setSlidShowNews] = useState((EditNews[5] === 'true') ? true : false);
    const [TopNewsChecked, setTopNews] = useState((EditNews[6] === 'true') ? true : false);

    
    const [One_News,setOneNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allNews")
        .then(res => setOneNews(res.data))
        .catch(error => console.log(error));
    });

    const [AllCategories,setAllCategory] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news_category/allNewsCategory")
        .then(res => setAllCategory(res.data))
        .catch(error => console.log(error));
    });

    function UpdateNews(e)
    {
        e.preventDefault();
        const body = str_NewsBody.toString();
        const updateNews ={body,news_id,title,category,TrendingChecked,BreakingChecked,SlidShowNewsChecked,TopNewsChecked,description}
        axios.put(global.APIUrl+"/news/updateNews",updateNews).then(() =>{
    
          Swal.fire({  
            title: "Success!",
            text: "News Updating Success!",
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
            text: "News Updating Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    function back(){
        window.location.href = "/Admin/News";
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
                            <MDBCardTitle className='text-dark text-left text-uppercase' style={{fontSize: '23px'}}>Edit News</MDBCardTitle>
                            <hr/>
                            <div class="mb-3 mt-5 text-center">
                                <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+news_image} alt=""/>
                            </div>
                            <div class="mb-3 mt-3">
                                <label  class="form-label">Title </label>
                                <input class="form-control" value={title} onChange={(e) =>{
                                        setTitle(e.target.value);
                                    }}/>
                            </div>  
                            <div class="mb-3">
                                <label  class="form-label">Description </label>
                                <textarea class="form-control" value={description} onChange={(e) =>{
                                        setSmallDis(e.target.value);
                                    }}></textarea>
                            </div>  
                            <div class="mb-3">
                                <label  class="form-label">News Category </label>
                                <select class="form-control" value={category} onChange={(e) =>{
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
                            {One_News.map((news,key) => (
                                <div class="mb-3   mt-4" style={{display: (news._id == news_id )? "inline":"none"}}>
                                    <label  class="form-label">Body</label>
                                    <CKEditor
                                    editor={ ClassicEditor }
                                    data={news.body}
                                    onChange={(event, editor) =>{
                                    const data = editor.getData();
                                        setNewsBody(data);
                                    }}
                                    />
                                </div>
                            ))}
                            <div className="text-right mt-3">
                                <button type="button" className="btn btn-dark btn-sm" onClick={UpdateNews}>Update</button>&nbsp;&nbsp;&nbsp;
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


export default EditNews;