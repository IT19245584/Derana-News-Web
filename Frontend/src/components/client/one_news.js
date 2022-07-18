import React,{useState , useEffect} from 'react';
import axios from 'axios';
import '../../client_css.css';
import "../APIUrl";
import Navbar from './common_part/nav';
import Footer from './common_part/footer';


export default function OnewNews() {
  
    
    const [emailStatus, setEmailStatus] = useState("");
    const [emailColor, setEmailColor] = useState("");
    const [email, setEmail] = useState("");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const news_id = urlParams.get('news');

    const [One_News,setOneNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allNews")
        .then(res => setOneNews(res.data))
        .catch(error => console.log(error));
    });

    const [HotNews,setHotNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allHotNews")
        .then(res => setHotNews(res.data))
        .catch(error => console.log(error));
    },[]);

    const [BreakingNews,setBreakingNews] = useState([]);
    useEffect(() => {
        axios.get(global.APIUrl+"/news/allBreakingNews")
        .then(res => setBreakingNews(res.data))
        .catch(error => console.log(error));
    },[]);
    
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

    function date_convert_y_m_d(date) {
        const dateArr = date.split("T");

        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let now = new Date(dateArr[0]);
        return  months[now.getMonth()] + ' ' + now.getDate() + ' ' + now.getFullYear();
    }

    function ViewNews(news_id){
        window.location.href = "/Client/One_News?news="+news_id;
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
          let re = /\S+@\S+\.\S+/;
          return re.test(email);
      }

  return (
    <div>
    <Navbar/>
    <div class="container-fluid mt-5 mb-3 pt-3">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12">
                    <div class="d-flex justify-content-between">
                        <div class="section-title border-right-0 mb-0" style={{width: "180px"}}>
                            <h4 class="m-0 text-uppercase font-weight-bold">Breaking</h4>
                        </div>
                        <div class="owl-carousel tranding-carousel position-relative d-inline-flex align-items-center bg-white border border-left-0"
                            style={{width: "calc(100% - 180px)", paddingRight: "10px"}}>
                            <marquee  direction="left">
                              <a style={{color:'black'}} href="#0">
                                    {BreakingNews.map((br_news,key) => (
                                        <span className="text-uppercase font-weight-semi-bold">{br_news.title}...&nbsp;&nbsp;&nbsp;</span>
                                    ))}
                                 </a>
                            </marquee>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                {One_News.map((news_body,key) => (
                 <div style={{display: (news_body._id == news_id )? "inline":"none"}}>
                 <img class="img-fluid w-100" src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1649932942/"+news_body.image} style={{objectFit: "cover"}} alt="" />
                 <div className="bg-white ">
                   <div className="p-4">
                   <div class="mb-3">
                        <a class="badge badge-warning rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                            href="#0">{news_body.category}</a>
                        <a class="text-body" href="#0">{date_convert_y_m_d(news_body.createdAt)}</a>
                   </div>
                   <h1 class="mb-3 text-dark text-uppercase font-weight-bold">{news_body.title}</h1>
                   <p  dangerouslySetInnerHTML={{
                        __html: news_body.body
                    }}></p>
                   </div>
                   <div class="d-flex justify-content-between bg-white border border-top-0 p-4">
                        <div class="d-flex align-items-center">
                            
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="ml-3"><i class="bi bi-eye mr-2"></i>12345</span>
                            <span class="ml-3"><i class="bi bi-comment mr-2"></i>123</span>
                        </div>
                    </div>
                 </div>
                 <div class="mb-3 mt-3">
                        <div class="section-title mb-0">
                            <h4 class="m-0 text-uppercase font-weight-bold">Leave a comment</h4>
                        </div>
                        <div class="bg-white border border-top-0 p-4">
                            <form>
                                <div class="form-row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="name">Name *</label>
                                            <input type="text" class="form-control" id="name"/>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="email">Email *</label>
                                            <input type="email" class="form-control" id="email"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="website">Website</label>
                                    <input type="url" class="form-control" id="website"/>
                                </div>

                                <div class="form-group">
                                    <label for="message">Message *</label>
                                    <textarea id="message" cols="30" rows="5" class="form-control"></textarea>
                                </div>
                                <div class="form-group mb-0">
                                    <input type="submit" value="Leave a comment"
                                        class="btn btn-primary font-weight-semi-bold py-2 px-3"/>
                                </div>
                            </form>
                        </div>
                       </div>
                    </div>
                   ))}
                </div>
                <div class="col-lg-4">
                   
                    <div class="mb-3" id="Tranding_NEWS_div">
                        <div class="section-title mb-0">
                            <h4 class="m-0 text-uppercase font-weight-bold">Tranding News</h4>
                        </div>
                        {TrendingNews.map((t_news,key) => (
                            <div onClick={()=>ViewNews(t_news._id)} class="card m-0" style={{maxWidth: "540px"}}>
                                <div className=" border m-3">
                                <div class="row g-0">
                                   
                                    <div class="col-md-12">
                                        <div class="card-body" style={{courser:'pointer'}}>
                                        <a class="badge badge-warning  rounded-0 text-uppercase font-weight-semi-bold p-2 mr-2"
                                                href="#0">{t_news.category}</a> <span class="card-text">{date_convert_y_m_d(t_news.createdAt)}</span>
                                        <h5 class="card-title mt-3" style={{lineHeight:'18px' ,  courser:'pointer'}}>{t_news.title}</h5>
                                        
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