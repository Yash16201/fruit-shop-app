import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addcategory } from '../../redux/category/slices/category';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch  = useDispatch()
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('name',Name);
    data.append('description',Description);
    dispatch(addcategory(data)).unwrap().then(()=>{
      navigate('/categories')
      console.log('done')
    }).catch(()=>{
      console.log('error')
    })
  }
  return (
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Add Category </h6>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="category name" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder='Write category name' onChange={e=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="category description" className="form-label">Description</label>
                        <textarea className="form-control" placeholder="Write category description"
                            id="floatingTextarea" style={{height: "250px"}} onChange={e=>setDescription(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Category</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddCategory