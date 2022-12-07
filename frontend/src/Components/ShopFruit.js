import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ShopFruit = (props) => {
  const navigate = useNavigate();
  return (
    <div>
        <section className="fruit_section layout_padding">
        <div className="container">
        <div className="heading_container">
            <hr/>
            <h2>
            Fresh Fruit
            </h2>
        </div>
        </div>
        <div className="container-fluid">

        <div className="fruit_container">
            {
                props.product.map((row, key)=>(
                    <div className="box" key={row.id}>
                        <img src={`http://localhost:8000/Image/${row['detail'].image}`} alt=""/>
                            <div className="link_box">
                                <h5>
                                {row.name}
                                </h5>
                                <Link to={`/fruit/${row.id}`} role="button">Know More</Link> 
                                
                            </div>
                    </div>
                ))
            }
        </div>
        </div>
    </section>
    </div>
  )
}

export default ShopFruit