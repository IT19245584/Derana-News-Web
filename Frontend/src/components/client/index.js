import React,{useState , useEffect} from 'react';
import axios from 'axios';
import '../../client_css.css';
import "../APIUrl";
import Navbar from './common_part/nav';
import Footer from './common_part/footer';

export default function App() {
  
    const [emailStatus, setEmailStatus] = useState("");
    const [emailColor, setEmailColor] = useState("");
    const [email, setEmail] = useState("");

    const [AllCategories,setAllCategory] = useState([])
    useEffect(() => {
        axios.get(global.APIUrl+"/news_category/allNewsCategory")
        .then(res => setAllCategory(res.data))
        .catch(error => console.log(error));
    },[]);

    const [TrendingNews,setTrendingNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allTrendingNews")
        .then(res => setTrendingNews(res.data))
        .catch(error => console.log(error));
    },[]);

    const [SlideShowNews,setSlideShowNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allSlideShowNews")
        .then(res => setSlideShowNews(res.data))
        .catch(error => console.log(error));
    },[]);
    
    const [HotNews,setHotNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allHotNews")
        .then(res => setHotNews(res.data))
        .catch(error => console.log(error));
    },[]);

        
    const [AllNews,setAllNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allNews")
        .then(res => setAllNews(res.data))
        .catch(error => console.log(error));
    },[]);   

    const [BreakingNews,setBreakingNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allBreakingNews")
        .then(res => setBreakingNews(res.data))
        .catch(error => console.log(error));
    },[]);

        
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

    function AllNewsCategoryWise(category){
        window.location.href = "/Client/SportAndTech?type="+category;
    }
  return (
    <div>
    <Navbar/>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-7 px-0">
                
                <div id="carouselExampleControls" class="carousel slide " style={{backgroundColor:'#1E2024'}} data-bs-ride="carousel">
                  <div class="carousel-inner">
                  {SlideShowNews.map((ss_news,key) => (
                    <div class={(key == 0)? "carousel-item active" : "carousel-item"}>
                        <div class="position-relative overflow-hidden" style={{height: "500px"}}>
                          <img class="img-fluid h-100" src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+ss_news.image} style={{width:'100%'}} alt=""/>
                          <div class="overlay" onClick={()=>ViewNews(ss_news._id)}>
                              <div class="mb-2">
                                  <a class="badge badge-warning  rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                                      href="#0">{ss_news.category}</a>
                                  <a class="text-white" href="#0">{date_convert(ss_news.createdAt)}</a>
                              </div>
                              <a class="h2 m-0 text-white text-uppercase font-weight-bold" href="#0">{ss_news.title}</a>
                          </div>
                        </div>
                    </div>
                  ))}
                  
                  </div>
                  <button class="carousel-control-prev bg-transparent border-0" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                  <button class="carousel-control-next bg-transparent border-0" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  </button>
                </div>
            </div>
            <div class="col-lg-5 px-0">
                <div class="row mx-0">
                {HotNews.map((Hot_News,key) => (
                    <div class="col-md-6 px-0" onClick={()=>ViewNews(Hot_News._id)} style={{ display:(key < 4)? "block" : "none"}}>
                        <div class="position-relative overflow-hidden" style={{height: "250px"}}>
                            <img class="img-fluid w-100 h-100" src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+Hot_News.image}  style={{objectFit: "cover"}} alt=""/>
                            <div class="overlay">
                                <div class="mb-2">
                                    <a class="badge badge-warning  rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                                        href="#0">HOT</a>
                                    <a class="text-white" href="#0"><small>{date_convert_y_m_d(Hot_News.createdAt)}</small></a>
                                </div>
                                <a class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="#0">{Hot_News.title}</a>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid py-3 mb-3" style={{backgroundColor:'#1E2024'}}>
        <div class="container">
            <div class="row align-items-center " style={{backgroundColor:'#1E2024'}}>
                <div class="col-12">
                    <div class="d-flex justify-content-between">
                        <div class="bg-warning text-center font-weight-medium py-2" style={{width: "170px" , fontSize:'120%' , color: '#1E2024'}}>Breaking News</div>
                        <div class="owl-carousel tranding-carousel position-relative d-inline-flex align-items-center ml-3"
                            style={{width: "calc(100% - 170px)", paddingRight: "90px"}}>
                            <marquee  direction="left">
                              <a class="text-white" href="#0">
                                    {BreakingNews.map((br_news,key) => (
                                        <span>{br_news.title}...&nbsp;&nbsp;&nbsp;</span>
                                    ))}
                                 </a>
                            </marquee>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid pt-5 mb-3" id="category_div">
        <div class="container">
            <div class="section-title">
                <h4 class="m-0 text-uppercase font-weight-bold">News Category</h4>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button class="btn btn-outline-dark" type="button" data-bs-target="#NewsCategory" data-bs-slide="prev"><i class="bi bi-chevron-left"></i></button>
                  <button class="btn btn-outline-dark" type="button" data-bs-target="#NewsCategory" data-bs-slide="next"><i class="bi bi-chevron-right"></i></button>
                </div>
            </div>
            <div id="NewsCategory" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="position-relative overflow-hidden" style={{height: "250px"}}>
                              <img class="img-fluid w-100 h-100" src="img/news category/bussiness.jpeg" style={{objectFit: "cover"}} alt=""/>
                              <div class="overlay">
                                  <a  onClick={()=>AllNewsCategoryWise("Business")} class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="#0">Business</a>
                              </div>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="position-relative overflow-hidden" style={{height: "250px"}}>
                              <img class="img-fluid w-100 h-100" src="img/news category/Entertainment.webp" style={{objectFit: "cover"}} alt=""/>
                              <div class="overlay">
                                  <a  onClick={()=>AllNewsCategoryWise("Entertainment")} class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="#0">Entertainment</a>
                              </div>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="position-relative overflow-hidden" style={{height: "250px"}}>
                              <img class="img-fluid w-100 h-100" src="img/news category/sport.webp" style={{objectFit: "cover"}} alt=""/>
                              <div class="overlay">
                                  <a  onClick={()=>AllNewsCategoryWise("Sport")} class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="#0">Sports</a>
                              </div>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="position-relative overflow-hidden" style={{height: "250px"}}>
                              <img class="img-fluid w-100 h-100" src="img/news category/political.jpg" style={{objectFit: "cover"}} alt=""/>
                              <div class="overlay">
                                  <a  onClick={()=>AllNewsCategoryWise("Political")} class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="#0">Political</a>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <div class="row">
                        <div class="col-sm-3">
                          <div class="position-relative overflow-hidden" style={{height: "250px"}}>
                              <img class="img-fluid w-100 h-100" src="img/news category/education.jpg" style={{objectFit: "cover"}} alt=""/>
                              <div class="overlay">
                                  <a onClick={()=>AllNewsCategoryWise("Education")} class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="#0">Education</a>
                              </div>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="position-relative overflow-hidden" style={{height: "250px"}}>
                              <img class="img-fluid w-100 h-100" src="img/news category/weather.webp" style={{objectFit: "cover"}} alt=""/>
                              <div class="overlay">
                                  <a onClick={()=>AllNewsCategoryWise("Weather")} class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="#0">Weather</a>
                              </div>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="position-relative overflow-hidden" style={{height: "250px"}}>
                              <img class="img-fluid w-100 h-100" src="img/news category/culture.webp" style={{objectFit: "cover"}} alt=""/>
                              <div class="overlay">
                                  <a onClick={()=>AllNewsCategoryWise("Culture")} class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="#0">culture</a>
                              </div>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <div class="position-relative overflow-hidden" style={{height: "250px"}}>
                              <img class="img-fluid w-100 h-100" src="img/news category/international.jpg" style={{objectFit: "cover"}} alt=""/>
                              <div class="overlay">
                                  <a onClick={()=>AllNewsCategoryWise("International")}  class="h6 m-0 text-white text-uppercase font-weight-semi-bold" href="#0">International</a>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div> 
        </div>
    </div>
    <div class="container-fluid" id="LATEST_NEWS_div">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row ">
                        <div class="col-12">
                            <div class="section-title">
                                <h4 class="m-0 text-uppercase font-weight-bold">Latest News</h4>
                                <a class="text-dark font-weight-medium text-decoration-none" href="#0">View All</a>
                            </div>
                        </div>
                        {AllNews.map((AllNews_FirstTwo,key) => (
                         <div class="col-lg-6 mb-3 mt-3"  style={{ display:(key < 2)? "block" : "none"}}>
                            <div class="card h-100">
                            <img class="img-fluid w-100" src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+AllNews_FirstTwo.image} style={{objectFit: "cover"}} alt=""/>
                            <div class="card-body m-0">
                                <div class="bg-white  p-1">
                                    <div class="mb-2">
                                        <a class="badge badge-warning rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                                            href="#0">{AllNews_FirstTwo.category}</a>
                                        <a class="text-body d_font_family" href="#0"><small>{date_convert_y_m_d(AllNews_FirstTwo.createdAt)}</small></a>
                                    </div>
                                    <a onClick={()=>ViewNews(AllNews_FirstTwo._id)} class="h5 d-block mb-3  text-uppercase font-weight-bold" style={{color:'#31404B'}} href="#0">{AllNews_FirstTwo.title}</a>
                                    <p class="m-0">{AllNews_FirstTwo.description}</p>
                                </div>
                            </div>
                            <div class="card-footer m-0 bg-white">
                                <div class="d-flex justify-content-between bg-white  ">
                                    <div class="d-flex align-items-center">
                                       
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <small class="ml-3"  style={{courser:'pointer'}}  ><i class="bi bi-share mr-2"></i> Share</small>
                                        
                                        <small class="ml-3"><i class="bi bi-eye mr-2"></i>123</small>
                                        <small class="ml-3"><i class="bi bi-chat-left-text-fill mr-2"></i>123</small>
                                    </div>
                                </div>
                            </div>
                            </div>
                         </div>
                        ))}
                        <div class="col-lg-12 mb-3">
                            <a href="#0"><img class="img-fluid w-100" src="img/ads1.png" alt=""/></a>
                        </div>
                        {AllNews.map((AllNews_FirstTwo,key) => (
                        <div class="col-lg-6 mb-3"  style={{ display:((key == 3) || (key == 4) || (key == 5) || (key == 6))? "block" : "none"}}>
                              <div class="card h-100">
                            <img class="img-fluid w-100" src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+AllNews_FirstTwo.image} style={{objectFit: "cover"}} alt=""/>
                            <div class="card-body m-0">
                                <div class="bg-white  p-1">
                                    <div class="mb-2">
                                        <a class="badge badge-warning rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                                            href="#0">{AllNews_FirstTwo.category}</a>
                                        <a class="text-body d_font_family" href="#0"><small>{date_convert_y_m_d(AllNews_FirstTwo.createdAt)}</small></a>
                                    </div>
                                    <a onClick={()=>ViewNews(AllNews_FirstTwo._id)} class="h5 d-block mb-3  text-uppercase font-weight-bold" style={{color:'#31404B'}} href="#0">{AllNews_FirstTwo.title}</a>
                                    <p class="m-0">{AllNews_FirstTwo.description}</p>
                                </div>
                            </div>
                            <div class="card-footer m-0 bg-white">
                                <div class="d-flex justify-content-between bg-white  ">
                                    <div class="d-flex align-items-center">
                                       
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <small class="ml-3"><i class="bi bi-share mr-2"></i> Share</small>
                                        <small class="ml-3"><i class="bi bi-eye mr-2"></i>12345</small>
                                        <small class="ml-3"><i class="bi bi-chat-left-text-fill mr-2"></i>123</small>
                                    </div>
                                </div>
                            </div>
                            </div>
                         </div>
                        ))}

                       
                        <div class="col-lg-12 mb-3">
                            <a href="#0"><img class="img-fluid w-100" src="img/ad1.gif" alt=""/></a>
                        </div>
                        {AllNews.map((AllNews_Others,key) => (
                            <div class="row bg-white mb-3 mr-2">
                                <div className="col-md-6">
                                    <img class="img-fluid h-100 " src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+AllNews_Others.image} style={{objectFit: "cover"}} alt=""/>
                                </div>
                                <div className="col-md-6 p-2">
                                    <div class="mt-auto  pt-4 pr-3 pl-3">
                                        <div class="mb-2">
                                            <a class="badge badge-warning rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                                                href="#0">{AllNews_Others.category}</a>
                                            <a class="text-body" href="#0"><small>{date_convert_y_m_d(AllNews_Others.createdAt)}</small></a>
                                        </div>
                                        <a class="h6 d-block mb-3 text-uppercase font-weight-bold" style={{color:'#31404B'}} href="#0">{AllNews_Others.title}</a>
                                        <p class="m-0">{AllNews_Others.description}</p>
                                    </div>
                                    <br/>
                                    <div class="d-flex justify-content-between bg-white  mt-auto p-4">
                                        <div class="d-flex align-items-center">
                                          
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <small class="ml-3"><i class="bi bi-share mr-2"></i> Share</small>
                                            <small class="ml-3"><i class="bi bi-eye mr-2"></i>12345</small>
                                            <small class="ml-3"><i class="bi bi-chat-left-text-fill mr-2"></i>123</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div class="col-lg-4">
                    
                    <div class="mb-3">
                        <div class="section-title mb-0">
                            <h4 class="m-0 text-uppercase font-weight-bold">Today Cartoon</h4>
                        </div>
                        <div class="bg-white text-center border border-top-0 p-3">
                            <a href="#0"><img class="img-fluid" src="img/cartoon.jpg" alt=""/></a>
                        </div>
                    </div>
                    <div class="mb-3" id="Tranding_NEWS_div">
                        <div class="section-title mb-0">
                            <h4 class="m-0 text-uppercase font-weight-bold">Tranding News</h4>
                        </div>
                        {TrendingNews.map((t_news,key) => (
                            <div class="card m-0" onClick={()=>ViewNews(t_news._id)}  style={{maxWidth: "840px"}}>
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