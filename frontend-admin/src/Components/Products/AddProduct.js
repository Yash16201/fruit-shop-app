import React, { useState,useEffect,useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategory } from '../../redux/category/slices/category';
import { add } from '../../redux/products/slices/product';
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useSelector((state)=> state.category)
  const [Name, setName] = useState('');
  const [Category, setCategory] = useState('');
  const [Description, setDescription] = useState('');
  const [Image, setImage] = useState()
  const [Price, setPrice] = useState('')

  const fetchData = useCallback(()=>{
    dispatch(fetchCategory())
  },[dispatch])
  useEffect(()=>{
    fetchData()
  },[fetchData])
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('name',Name);
    data.append('category_id',Category);
    data.append('description',Description);
    data.append('image',Image);
    data.append('price',Price);
    dispatch(add(data)).unwrap().then(()=>{
      navigate('/products')
      console.log('done')
    }).catch(()=>{

    })
  }
  return (
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Add Product </h6>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="product name" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder='Write product name' onChange={e=>setName(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="select" className="form-label">Category</label>
                        <select class="form-select" id="floatingSelect"
                            aria-label="Floating label select example" onChange={e=>setCategory(e.target.value)}>
                            <option selected>Select Category</option>
                            {
                                category.length > 0 && category.map((row)=>(
                                    <option value={row.id} key={row.id}>{row.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product description" className="form-label">Description</label>
                        <textarea className="form-control" placeholder="Write product description"
                            id="floatingTextarea" style={{height: "100px"}} onChange={e=>setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product price" className="form-label">Image</label>
                        <input class="form-control bg-dark" type="file" id="formFile" onChange={e=>setImage(e.target.files[0])}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product price" className="form-label">Price</label>
                        <input type="text" className="form-control" placeholder='Write product price' onChange={e=>setPrice(e.target.value)}/>   
                    </div>
                    <button type="submit" className="btn btn-primary">Create Product</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddProduct