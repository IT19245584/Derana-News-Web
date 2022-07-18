import React,{useState , useEffect} from 'react';
import axios from 'axios';
import '../../client_css.css';
import "../APIUrl";
import Navbar from './common_part/nav';
import Footer from './common_part/footer';

export default function Category_Wise_new() {
  
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const news_type = urlParams.get('type');

    const [emailStatus, setEmailStatus] = useState("");
    const [emailColor, setEmailColor] = useState("");
    const [email, setEmail] = useState("");

    const [AllCategories,setAllCategory] = useState([])
    useEffect(() => {
        axios.get(global.APIUrl+"/news_category/allNewsCategory")
        .then(res => setAllCategory(res.data))
        .catch(error => console.log(error));
    });

    const [TrendingNews,setTrendingNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allTrendingNews")
        .then(res => setTrendingNews(res.data))
        .catch(error => console.log(error));
    });

        
    const [AllSportNews,setSportNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allNewsCategoryWise/"+news_type)
        .then(res => setSportNews(res.data))
        .catch(error => console.log(error));
    });   

    
        
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
    <Navbar/>
   
    <div class="container-fluid mt-5 mb-3 pt-3">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12">
                    <div class="d-flex justify-content-between">
                        <div class="section-title border-right-0 mb-0 text-center" style={{width: "100%"}}>
                            <h3 class="m-0 text-uppercase  font-weight-bold">{news_type} News</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div class="container-fluid mt-3" id="LATEST_NEWS_div">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row ">
                       
                        {AllSportNews.map((AllNews_FirstTwo,key) => (
                        <div class="col-lg-6 " onClick={()=>ViewNews(AllNews_FirstTwo._id)} style={{ display:(key < 2)? "block" : "none"}}>
                            <div class="position-relative mb-3">
                                <img class="img-fluid w-100" src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+AllNews_FirstTwo.image} style={{objectFit: "cover"}} alt=""/>
                                <div class="bg-white border border-top-0 p-4">
                                    <div class="mb-2">
                                        <a class="badge badge-warning rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                                            href="#0">{AllNews_FirstTwo.category}</a>
                                        <a class="text-body d_font_family" href="#0"><small>{date_convert_y_m_d(AllNews_FirstTwo.createdAt)}</small></a>
                                    </div>
                                    <a class="h5 d-block mb-3  text-uppercase font-weight-bold" style={{color:'#31404B'}} href="#0">{AllNews_FirstTwo.title}</a>
                                    <p class="m-0">{AllNews_FirstTwo.description}</p>
                                </div>
                                <div class="d-flex justify-content-between bg-white border border-top-0 p-4">
                                    <div class="d-flex align-items-center">
                                       
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <small class="ml-3"><i class="bi bi-eye mr-2"></i>12345</small>
                                        <small class="ml-3"><i class="bi bi-chat-left-text-fill mr-2"></i>123</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}

                        {AllSportNews.map((AllNews_Others,key) => (
                        <div class="col-lg-12" onClick={()=>ViewNews(AllNews_Others._id)} style={{ display:(key >= 2)? "block" : "none"}}>
                            <div class="row news-lg mx-0 mb-3">
                                <div class="col-md-6 h-100 px-0">
                                    <img class="img-fluid h-100" src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+AllNews_Others.image} style={{objectFit: "cover"}} alt=""/>
                                </div>
                                <div class="col-md-6 d-flex flex-column border bg-white h-100 px-0">
                                    <div class="mt-auto p-4">
                                        <div class="mb-2">
                                            <a class="badge badge-warning rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                                                href="#0">{AllNews_Others.category}</a>
                                            <a class="text-body" href="#0"><small>{date_convert_y_m_d(AllNews_Others.createdAt)}</small></a>
                                        </div>
                                        <a class="h6 d-block mb-3 text-uppercase font-weight-bold" style={{color:'#31404B'}} href="#0">{AllNews_Others.title}</a>
                                        <p class="m-0">{AllNews_Others.description}</p>
                                    </div>
                                    <div class="d-flex justify-content-between bg-white border-top mt-auto p-4">
                                        <div class="d-flex align-items-center">
                                          
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <small class="ml-3"><i class="bi bi-eye mr-2"></i>12345</small>
                                            <small class="ml-3"><i class="bi bi-chat-left-text-fill mr-2"></i>123</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                
                <div class="col-lg-4">
                    
                    
                    <div class="mb-3" id="Tranding_NEWS_div">
                        <div class="section-title mb-0">
                            <h4 class="m-0 text-uppercase font-weight-bold">Tranding News</h4>
                        </div>
                        {TrendingNews.map((t_news,key) => (
                            <div class="card m-0" onClick={()=>ViewNews(t_news._id)}  style={{maxWidth: "540px"}}>
                                <div className=" border m-3">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+t_news.image} class="img-fluid rounded-start h-100" alt="..."/>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                        <a class="badge badge-warning  rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                                                href="#0">{t_news.category}</a> <span class="card-text">{date_convert_y_m_d(t_news.createdAt)}</span>
                                        <h5 class="card-title mt-3" style={{lineHeight:'18px'}}>{t_news.title}</h5>
                                        
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="mb-3">
                        <div class="section-title mb-0">
                            <h4 class="m-0 text-uppercase font-weight-bold">Newsletter</h4>
                        </div>
                        <div class="bg-white text-center border border-top-0 p-3">
                            <p>Send Your Email Address For Contact You.</p>
                            <div class="input-group mb-2" style={{width: "100%"}}>
                                <input type="text" class="form-control form-control-lg" placeholder="Your Email" onChange={(e) =>{
                                    setFunEmail(e.target.value);
                                }}/>
                                <div class="input-group-append">
                                    <button class="btn btn-warning rounded-0 btn-sm font-weight-bold px-3">Sign Up</button>
                                </div>
                            </div>
                            <small style={{fontSize: '14px' , color:emailColor}}>{emailStatus}</small>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="section-title mb-0">
                            <h4 class="m-0 text-uppercase font-weight-bold">Tags</h4>
                        </div>
                        <div class="bg-white border border-top-0 p-3">
                            <div class="d-flex flex-wrap m-n1">
                            {AllCategories.map((AllCategory,key) => (
                                <a href="#0" class="btn btn-sm btn-outline-dark rounded-0 m-1">{AllCategory.name}</a>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
  </div>
  );
}