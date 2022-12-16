import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editCategory } from '../../redux/category/slices/category';


const EditCategoryForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Name, setName] = useState(props.name);
  const [Description, setDescription] = useState(props.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('id',props.id);
    data.append('name',Name);
    data.append('description',Description);
    dispatch(editCategory(data)).then(()=>{
      navigate('/categories');
    })
  }
  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="category name" className="form-label">Name</label>
            <input type="text" className="form-control" placeholder='Write category name' value={Name} onChange={e=>setName(e.target.value)}/>
        </div>
        <div className="mb-3">
        <label htmlFor="category description" className="form-label">Description</label>
            <textarea className="form-control" placeholder="Write category description"
                id="floatingTextarea" style={{height: "250px"}} value={Description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update Category</button>
    </form> 
  )
}

export default EditCategoryForm