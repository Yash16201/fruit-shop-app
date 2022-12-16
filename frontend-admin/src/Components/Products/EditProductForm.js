import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editCategory, fetchCategory } from '../../redux/category/slices/category';
import { edit } from '../../redux/products/slices/product';

const EditProductForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useSelector((state)=> state.category)
  const fetchData = useCallback(()=>{
    dispatch(fetchCategory())
  },[dispatch])
  useEffect(()=>{
    fetchData()
  },[fetchData])


  const [Name, setName] = useState(props.name);
  const [CategoryF, setCategory] = useState(props.category);
  const [Description, setDescription] = useState(props.description);
  const [Image, setImage] = useState()
  const [Price, setPrice] = useState(props.price)
  const [ImgSrc ,setImgSrc] = useState(`http://localhost:8000/Image/${props.image}`)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('id',props.id)
    data.append('name',Name);
    data.append('category_id',CategoryF);
    data.append('description',Description);
    data.append('image',Image);
    data.append('price',Price);
    dispatch(edit(data)).unwrap().then(()=>{
        navigate('/products')
    }).catch(()=>{
        console.log('error')
    })
  }

  const handleImage = (e) =>{
    setImage(e.target.files[0])
    var reader = new FileReader()
    var url = reader.readAsDataURL(e.target.files[0])

    reader.onloadend = () => {
        setImgSrc(reader.result)
    }
  }
  return (
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Edit Product </h6>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="product name" className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder='Write product name' value={Name} onChange={e=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="select" className="form-label">Category</label> 
                        <select className="form-select" id="floatingSelect"
                            aria-label="Floating label select example" onChange={e=>setCategory(e.target.value)}>
                            {/* <option>Select Category</option> */}
                            {
                                category.length > 0 && category.map((row)=>(
                                    row.id === CategoryF ? <option value={row.id} key={row.id} selected>{row.name}</option> :<option value={row.id} key={row.id}>{row.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product description" className="form-label">Description</label>
                        <textarea className="form-control" placeholder="Write product description"
                            id="floatingTextarea" style={{height: "100px"}} value={Description} onChange={e=>setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product price" className="form-label">Image</label>
                        <input className="form-control bg-dark" type="file" id="formFile" onChange={(e)=>{ handleImage(e) }}></input>
                        <img src={ImgSrc} className="my-2"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product price" className="form-label">Price</label>
                        <input type="text" className="form-control" placeholder='Write product price' value={Price} onChange={e=>setPrice(e.target.value)}/>   
                    </div>
                    <button type="submit" className="btn btn-primary">Update Product</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditProductForm