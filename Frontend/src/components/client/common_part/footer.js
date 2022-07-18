import React,{useState , useEffect} from 'react';
import axios from 'axios';
import '../../../client_css.css';

export default function Footer() {
  
    const [AllCategories,setAllCategory] = useState([])
    useEffect(() => {
        axios.get(global.APIUrl+"/news_category/allNewsCategory")
        .then(res => setAllCategory(res.data))
        .catch(error => console.log(error));
    });
  const [HotNews,setHotNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allHotNews")
        .then(res => setHotNews(res.data))
        .catch(error => console.log(error));
    });

    
    function date_convert(date) {
        const dateArr = date.split("T");

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let now = new Date(dateArr[0]);
        return days[now.getDay()] + ' , ' + months[now.getMonth()] + ' ' + now.getDate() + ' ' + now.getFullYear();
    }

    function date_convert_y_m_d(date) {
        const dateArr = date.split("T");

        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let now = new Date(dateArr[0]);
        return  months[now.getMonth()] + ' ' + now.getDate() + ' ' + now.getFullYear();
    }

    function ViewNews(news_id){
        window.location.href = "/Client/One_News?news="+news_id;
    }
  return (
    <div>
     <div class="container-fluid  pt-5 px-sm-3 px-md-5 mt-5" style={{backgroundColor:'#1E2024 '}}>
        <div class="row py-4">
            <div class="col-lg-3 col-md-6 mb-5">
                <h5 class="mb-4 text-white text-uppercase font-weight-bold">Get In Touch</h5>
                <p class="font-weight-medium" style={{fontSize:'16px'}}><i class="bi bi-geo-alt-fill mr-2"></i>320, T.B Jayah Mw, Colombo 10</p>
                <p class="font-weight-medium" style={{fontSize:'16px'}}><i class="bi bi-telephone-fill mr-2"></i>+94 11 53 00 800</p>
                <p class="font-weight-medium" style={{fontSize:'16px'}}><i class="bi bi-envelope-check-fill mr-2"></i>info@derana.com</p>
                <h6 class="mt-4 mb-3 text-white text-uppercase font-weight-bold">Follow Us</h6>
                <div class="d-flex justify-content-start">
                    <a class="btn btn-lg  mr-2" style={{backgroundColor:'#31404B'}} href="#0"><i class="bi bi-twitter"></i></a>
                    <a class="btn btn-lg  mr-2" style={{backgroundColor:'#31404B'}} href="#0"><i class="bi bi-facebook"></i></a>
                    <a class="btn btn-lg  mr-2" style={{backgroundColor:'#31404B'}} href="#0"><i class="bi bi-linkedin"></i></a>
                    <a class="btn btn-lg  mr-2" style={{backgroundColor:'#31404B'}} href="#0"><i class="bi bi-instagram"></i></a>
                    <a class="btn btn-lg " style={{backgroundColor:'#31404B'}} href="#0"><i class="bi bi-youtube"></i></a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
                <h5 class="mb-4 text-white text-uppercase font-weight-bold">Popular News</h5>
                {HotNews.map((Hot_News,key) => (
                <div class="mb-3" style={{ display:(key < 4)? "block" : "none"}} onClick={()=>ViewNews(Hot_News._id)} >
                    <div class="mb-2" >
                        <a class="badge badge-warning  rounded-0 text-uppercase font-weight-semi-bold p-1 mr-2" href="#0">POPULAR</a>
                        <a class="text-body" href="#0"><small>{date_convert_y_m_d(Hot_News.createdAt)}</small></a>
                    </div>
                    <a class="small text-body text-uppercase font-weight-medium" href="#0">{Hot_News.title}</a>
                </div>
                ))}
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
                <h5 class="mb-4 text-white text-uppercase font-weight-bold">Categories</h5>
                <div class="m-n1">
                    {AllCategories.map((AllCategory,key) => (
                        <a href="#0" class="btn btn-sm text-white rounded-0 m-1" style={{backgroundColor:'#31404B'}}>{AllCategory.name}</a>
                    ))}
                </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
                <h5 class="mb-4 text-white text-uppercase font-weight-bold">GALLERY Photos</h5>
                <div class="row">
                {HotNews.map((Hot_News,key) => (
                    <div class="col-4 mb-3" style={{ display:(key < 9)? "block" : "none"}}>
                        <a href="#0"><img class="w-100" src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+Hot_News.image} alt=""/></a>
                    </div>
                ))}  
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid py-4 px-sm-3 px-md-5" style={{background: "#111111"}}>
        <p class="m-0 text-center">&copy; <a href="#0">derananews.Lk</a>. All Rights Reserved. Design by <a href="https://deranamacroentertainment.com">derana macroentertainment</a></p>
    </div>
    <a href="#top" class="btn btn-primary btn-square back-to-top"><i class="fa fa-arrow-up"></i></a>
    
    </div>
  );
}