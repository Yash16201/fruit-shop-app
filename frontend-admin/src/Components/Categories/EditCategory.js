import React, {useCallback,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { fetchById } from "../../redux/category/slices/category"
import { useSelector, useDispatch } from "react-redux";
import EditCategoryForm from './EditCategoryForm';

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const fetchData = useCallback(() => {
    dispatch(fetchById(id))
    //eslint-disable-next-line
  }, [dispatch])

  useEffect(() => {
    fetchData() 
  }, [fetchData])

  return (
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Edit Category </h6>
                {
                  category.length > 0 && category.map((row) =>{
                      return(
                        <EditCategoryForm id={row.id} name={row.name} description={row.description} />
                      )
                  })
                }
            </div>
        </div>
    </div>
  )
}

export default EditCategory