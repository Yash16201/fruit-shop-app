import React from 'react'
import Footer from './Footer'

const About = () => {
  return (
    <div>
        <section className="about_section">
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 px-0">
                <div className="img-box">
                    <img src="http://localhost:3000/external/images/about.jpg" alt=""/>
                </div>
                </div>
                <div className="col-md-5">
                <div className="detail-box">
                    <div className="heading_container">
                    
                    <h2>
                        About Our Fruit Shopee
                    </h2>
                    </div>
                    <p className='text-justify mx-2'>
                    The Fruit Shopee provides conventional, exotic fruits and dry fruits through direct source since 2001. Our priority is to deliver fresh and pesticide free products to our customers. Our brand is committed to deliver you the best quality of fresh and nutritious fruits and dry fruits At your place at a low price.
                    </p>
                    <p className='text-justify mx-2'>
                    Our vision is to supply every one of our customers with the freshest, highest quality fruit and vegetables. In a country of expatriates, we aim to source products from every country, so everyone has a taste of home—and the exotic flavours they may have never tried—all with our signature freshness.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </section>

        <Footer/>
    </div>
  )
}

export default About