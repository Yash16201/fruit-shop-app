import React, {useEffect, useCallback} from 'react'
import Footer from './Footer'
import ShopFruit from './ShopFruit'
import { useSelector, useDispatch } from "react-redux";
import { fetch } from "../redux/products/slices/product";


const Home = () => {
  // const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetch())
  }, [dispatch])

  useEffect(() => {
    fetchData() 
  }, [fetchData])

  return (
    <div>
        <section className="shop_section layout_padding">
            <div className="container">
                <div className="box">
                    <div className="detail-box">
                    <h2>
                        Fruit shop
                    </h2>
                    <p>
                        There are many types of fruits available
                    </p>
                    </div>
                    <div className="img-box">
                    <img src={ process.env.PUBLIC_URL + '/external/images/shop-img.jpg'} alt=""/>
                    </div>
                    <div className="btn-box">
                    <a href="/">
                        Buy Now
                    </a>
                    </div>
                </div>
            </div>
        </section>
        <section className="about_section">
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 px-0">
                <div className="img-box">
                    <img src={ process.env.PUBLIC_URL + '/external/images/about-img.jpg'} alt=""/>
                </div>
                </div>
                <div className="col-md-5">
                <div className="detail-box">
                    <div className="heading_container">
                    <hr/>
                    <h2>
                        About Our Fruit Shopee
                    </h2>
                    </div>
                    <p className='text-justify l1-h'>
                    The Fruit Shopee provides conventional, exotic fruits and dry fruits through direct source since 2001. Our priority is to deliver fresh and pesticide free products to our customers. Our brand is committed to deliver you the best quality of fresh and nutritious fruits and dry fruits At your place at a low price.
                    </p>
                    <a href="/about">
                    Read More
                    </a>
                </div>
                </div>
            </div>
            </div>
        </section>
        
        {
          product.length > 0 &&
            <ShopFruit product={product}/> 
        }
        <section className="client_section layout_padding-bottom">
    <div className="container my-3">
      <div className="heading_container">
        <h2>
          What Syas Cutomer
        </h2>
        <hr/>
      </div>
      <div id="carouselExample2Controls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="client_container layout_padding-top">
              <div className="img-box">
                <img src={ process.env.PUBLIC_URL + '/external/images/client-img.png'} alt=""/>
              </div>
              <div className="detail-box">
                <h5>
                  Jone Mark
                </h5>
                <p>
                  <img src={ process.env.PUBLIC_URL + '/external/images/left-quote.jpg'} alt=""/>
                  
                  <span>
                    Lorem ipsum dolor sit amet,
                  </span>
                  <img src={ process.env.PUBLIC_URL + '/external/images/right-quote.jpg'} alt=""/> <br/>
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                </p>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExample2Controls" role="button" data-slide="prev">
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExample2Controls" role="button" data-slide="next">
          <span className="sr-only">Next</span>
        </a>
      </div>

    </div>
  </section>
        <Footer/>
    </div>
  )
}

export default Home