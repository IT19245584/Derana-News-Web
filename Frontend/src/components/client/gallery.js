import React,{useState , useEffect} from 'react';
import axios from 'axios';
import '../../client_css.css';
import "../APIUrl";
import Navbar from './common_part/nav';
import Footer from './common_part/footer';

const Awards = [{title:'CHAMPION STARS UNLIMITED ( 26 – 02 – 2022 )' , img : 'http://derana.lk/gallery/wp-content/uploads/2021/04/095-Copy.jpg'}, 
                {title:'CHAMPION STARS UNLIMITED ( 26 – 02 – 2021 )' , img : 'http://derana.lk/gallery/wp-content/uploads/2022/02/030-Copy.jpg'}, 
                {title:'CHAMPION STARS UNLIMITED ( 06 – 03 – 2020 )' , img : 'http://derana.lk/gallery/wp-content/uploads/2021/04/024-Copy-1.jpg'}, 
                {title:'SARIGAMA CROSSOVER GRAND FINALE (27 – 02 – 2021)' , img : 'http://derana.lk/gallery/wp-content/uploads/2021/03/final-10-Copy.jpg'}, 
                {title:'CHAMPION STARS UNLIMITED ( 15 – 05 – 2019 )' , img : 'http://derana.lk/gallery/wp-content/uploads/2021/04/024-Copy-1.jpg'}, 
                {title:'CHAMPION STARS UNLIMITED ( 16 – 08 – 2018 )' , img : 'http://derana.lk/gallery/wp-content/uploads/2021/03/080-Copy.jpg'}, 
                {title:'FOOD CHAMPS ( 20 – 02 – 2021 )' , img : 'http://derana.lk/gallery/wp-content/uploads/2021/03/011-Copy-2.jpg'}];
export default function Gallery() {

  return (
    <div>
    <Navbar/>
    <div class="container-fluid mt-5 mb-3 pt-3">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12">
                    <div class="d-flex justify-content-between">
                        <div class="section-title border-right-0 mb-0 text-center" style={{width: "100%"}}>
                            <h3 class="m-0 text-uppercase  font-weight-bold">Gallery</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid mb-3 pt-2">
        <div class="container">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            {Awards.map((award) => (
                <div class="col mb-4">
                    <div class="card h-100">
                    <img src={award.img} class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">{award.title}</h5>
                    </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
    <Footer/>
  </div>
  );
}