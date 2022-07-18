
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {reactLocalStorage} from 'reactjs-localstorage';
import '../../admin_css.css';
import Navbar from "./adminNav";
import "../APIUrl";

function News() {
    const [AllNews,setAllNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allNews")
        .then(res => setAllNews(res.data))
        .catch(error => console.log(error));
    });

    function add_news(){
        window.location.href = "/Admin/News_Add";
    }

    function deleteNews(id){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are You Sure?',
            text: "Do You Want To Delete News? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(global.APIUrl+"/news/deleteNews/"+id).then(() =>{
                Swal.fire({  
                    title: "Success!",
                    text: "News Deleted",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"})
        
            }).catch((err)=>{
                Swal.fire({  
                    title: "Error!",
                    text: "News Not Deleted",
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

    function editNews(_id,title,category,Trending,Breaking,SlidShow,Top,description,body,image){
        reactLocalStorage.setObject("EditNews", [_id,title,category,Trending,Breaking,SlidShow,Top,description,body,image]);
        window.location.href = "/Admin/Edit_News";
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
                        <button onClick={add_news} style={{ letterSpacing:'1px'}}   className='btn btn-sm btn-dark shadow-0 btn-sm'   >Add</button>
                    </div>
                    <div class="row row-cols-1 row-cols-md-4 g-4 mt-3 pb-5">
                        {AllNews.map((News,key) => (
                            <div class="col mt-3">
                                <div class="card h-100">
                                <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+News.image} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">{News.title}</h5>
                                </div>
                                <div class="card-footer text-right border-0 bg-white">
                                    <i class="bi bi-pencil-square text-success"  style={{fontSize:'20px',courser:'pointer'}} onClick={()=>editNews(
                                        News._id,
                                        News.title,
                                        News.category,
                                        News.Trending,
                                        News.Breaking,
                                        News.SlidShow,
                                        News.Top,
                                        News.description,
                                        News.body,
                                        News.image,
                                        )} ></i>
                                    &nbsp;&nbsp;&nbsp;
                                    <i class="bi bi-trash3-fill text-danger" onClick={()=>deleteNews(
                                        News._id)} style={{fontSize:'20px',courser:'pointer'}}></i>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
};


export default News;