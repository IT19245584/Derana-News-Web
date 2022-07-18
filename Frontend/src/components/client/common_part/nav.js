import React,{useState} from 'react';
import '../../../client_css.css';

export default function Nav() {
  
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const [date, setDate] = useState(currentDate.toLocaleDateString('en-us', options)); 

  return (
    <div>
       <div class="container-fluid d-none d-lg-block" id="top">
        <div class="row align-items-center px-lg-5" style={{backgroundColor:'#1E2024'}} >
            <div class="col-lg-9" >
                <nav class="navbar navbar-expand-sm  p-0" >
                    <ul class="navbar-nav ml-n2">
                        <li class="nav-item  border-0  pt-1 pb-1" >
                            <a class="nav-link text-body   d_font_family" style={{fontSize:'13px'}} href="#0">{date}</a>
                        </li>
                        <li class="nav-item  border-0  pt-1 pb-1 " >
                            <a class="nav-link text-body   d_font_family" style={{fontSize:'13px'}} href="#0">Advertise</a>
                        </li>
                        <li class="nav-item  border-0   pt-1 pb-1" >
                            <a class="nav-link text-body  d_font_family" style={{fontSize:'13px'}} href="#0">Contact</a>
                        </li>
                        <li class="nav-item  pt-1 pb-1">
                            <a class="nav-link text-body  d_font_family" style={{fontSize:'13px'}} href="#0">Login</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="col-lg-3 text-right d-none d-md-block">
                <nav class="navbar navbar-expand-sm bg-transparent p-0">
                    <ul class="navbar-nav ml-auto mr-n2">
                        <li class="nav-item">
                            <a class="nav-link text-body" href="#0"><small class="a_text_size bi bi-twitter"></small></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-body" href="#0"><small class="a_text_size bi bi-facebook"></small></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-body" href="#0"><small class="a_text_size bi bi-linkedin"></small></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-body" href="#0"><small class="a_text_size bi bi-instagram"></small></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-body" href="#0"><small class="bi bi-google"></small></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-body" href="#0"><small class="bi bi-youtube"></small></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="row align-items-center bg-white py-3 px-lg-5">
            <div class="col-lg-4">
                <a href="/" class="navbar-brand p-0 d-none d-lg-block">
                    <h1 class="m-0 display-4 text-uppercase text-danger bolder d_font_family" >DERANA<span  class="text-warning font-weight-normal">News</span></h1>
                </a>
            </div>
            <div class="col-lg-8 text-center text-lg-right">
                <a href="https://htmlcodex.com"><img class="img-fluid" src="img/header_banner.png" alt=""/></a>
            </div>
        </div>
    </div>
    <div class="container-fluid p-0">
        <nav class="navbar navbar-expand-lg  navbar-dark py-2 py-lg-0 px-lg-5"  style={{backgroundColor:'#1E2024'}}> 
            <a href="/" class="navbar-brand d-block d-lg-none">
                <h1 class="m-0 display-4 text-uppercase text-danger">DERANA<span class="text-white font-weight-normal">News</span></h1>
            </a>
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between px-0 px-lg-3" id="navbarCollapse">
                <div class="navbar-nav mr-auto py-0">
                    <a href="/" class="nav-item nav-link active"><i class="bi bi-house-fill" style={{fontSize:'120%'}}></i> Home</a>
                    <a href="#category_div" class="nav-item nav-link">Category</a>
                    <a href="/Client/SportAndTech?type=Sport"  class="nav-item nav-link">Sport NEWS</a>
                    <a href="/Client/SportAndTech?type=Tech" class="nav-item nav-link">Tech NEWS</a>
                    <div class="nav-item dropdown">
                        <a href="#0" class="nav-link dropdown-toggle" data-toggle="dropdown">We Are</a>
                        <div class="dropdown-menu rounded-0 m-0">
                            <a href="#0" class="dropdown-item">Contact Us</a>
                            <a href="#0" class="dropdown-item">About Us</a>
                            <a href="/Client/Gallery" class="dropdown-item">Gallery</a>
                            <a href="#0" class="dropdown-item">Advertising</a>
                        </div>
                    </div>
                </div>
                <div class="input-group ml-auto d-none d-lg-flex" style={{width: "100%", maxWidth: "300px"}}>
                    <input type="text" class="form-control border-0 rounded-0" placeholder="Keyword"/>
                    <div class="input-group-append">
                        <button class="input-group-text bg-warning  border-0 rounded-0 text-dark  px-3"><i
                                class="bi bi-search " ></i></button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    </div>
  );
}