import React from 'react'
import Footer from './Footer'

const Contact = () => {
  return (
    <div className='my-5'>
        <section className="contact_section layout_padding-bottom">
            <div className="container-fluid">
            <div className="row">
                <div className="offset-lg-2 col-md-10 offset-md-1">
                <div className="heading_container">
                    <hr/>
                    <h2>
                    Request A call back
                    </h2>
                </div>
                </div>
            </div>

            <div className="layout_padding2-top">
                <div className="row">
                <div className="col-lg-4 offset-lg-2 col-md-5 offset-md-1">
                    <form action="">
                    <div className="contact_form-container">
                        <div>
                        <div>
                            <input type="text" placeholder="Full Name" />
                        </div>
                        <div>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div>
                            <input type="text" placeholder="Phone Number" />
                        </div>
                        <div>
                            <input type="text" className="message_input" placeholder="Message" />
                        </div>
                        <div>
                            <button type="submit">
                            Send
                            </button>
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="col-md-6 px-0">
                    
                    <h2 className='mx-2 my-2'>
                        Your feedback means so much to us
                    </h2>
                    <p className='mx-2 my-2 text-justify'>
                        Your message will be recorded and you will recieve an acknowledgement mail
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

export default Contact