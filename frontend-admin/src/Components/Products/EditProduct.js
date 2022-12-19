import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchbyid } from '../../redux/products/slices/product';
import EditProductForm from './EditProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productbyid } = useSelector((state) => state.product);
  const fetchData = useCallback(() => {
    dispatch(fetchbyid(id))
    //eslint-disable-next-line
  }, [dispatch])

  useEffect(() => {
    fetchData() 
    //eslint-disable-next-line
  }, [fetchData])
  
  return (
    // <div className="container-fluid pt-4 px-4">
    //     <div className="row g-4">
    //         <div className="bg-secondary rounded h-100 p-4">
    //             <h6 className="mb-4">Edit Product </h6>
    //             <form onSubmit={handleSubmit}>
    //                 <div className="mb-3">
    //                     <label htmlFor="product name" className="form-label">Name</label>
    //                     <input type="text" className="form-control" placeholder='Write product name' value={Name} onChange={e=>setName(e.target.value)}/>
    //                 </div>
    //                 <div class="mb-3">
    //                     <label htmlFor="select" className="form-label">Category</label>
    //                     <select class="form-select" id="floatingSelect"
    //                         aria-label="Floating label select example" onChange={e=>setCategory(e.target.value)}>
    //                         <option selected>Select Category</option>
    //                         <option value="1">One</option>
    //                         <option value="2">Two</option>
    //                         <option value="3">Three</option>
    //                     </select>
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="product description" className="form-label">Description</label>
    //                     <textarea className="form-control" placeholder="Write product description"
    //                         id="floatingTextarea" style={{height: "100px"}} value={Description} onChange={e=>setDescription(e.target.value)}></textarea>
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="product price" className="form-label">Image</label>
    //                     <input class="form-control bg-dark" type="file" id="formFile" onChange={e=>setImage(e.target.files[0])}></input>
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="product price" className="form-label">Price</label>
    //                     <input type="text" className="form-control" placeholder='Write product price' value={Price} onChange={e=>setPrice(e.target.value)}/>   
    //                 </div>
    //                 <button type="submit" className="btn btn-primary">Create Product</button>
    //             </form>
    //         </div>
    //     </div>
    // </div>
       <>
       {
        productbyid.length > 0 && productbyid.map((row) =>{
            return(
              <EditProductForm key={row.id} id={row.id} name={row.name} description={row['detail'].description} category={row.category_id} price={row['detail'].price} image={row['detail'].image} />
            )
        })
      }
      </>
  )
}

export default EditProduct