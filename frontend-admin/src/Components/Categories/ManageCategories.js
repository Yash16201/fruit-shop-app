import React, { useCallback,useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCategory, fetchCategory } from "../../redux/category/slices/category"
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ReactPaginate from 'react-paginate';

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const [PageNumber, setPageNumber] = useState(0);
  const CategoriesPerPage = 4;
  const pagevisited = PageNumber  * CategoriesPerPage;
  const pageCount = Math.ceil(category.length / CategoriesPerPage);
  const fetchData = useCallback(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  useEffect(() => {
    fetchData() 
  }, [fetchData])
  const changePage = ({selected}) =>{
    setPageNumber(selected);
  }
  return (
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">View Categories </h6>
                <div className="table">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">#</th>
                                <th scope="col">Category name</th>
                                <th scope="col">Category description</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Updated At</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                category.length > 0 && category.slice(pagevisited, pagevisited + CategoriesPerPage).map((row,key) =>{
                                    return(
                                    <tr key={row.id}>
                                        <td width="4%">{key+1}</td>
                                        <td width="15%">{row.name}</td>
                                        <td width="40%">{row.description}</td>
                                        <td width="10%">{moment(row.created_at).format('DD-MM-Y')}</td>
                                        <td width="10%">{moment(row.updated_at).format('DD-MM-Y')}</td>
                                        <td width="30%">
                                            <Link className="btn btn-sm btn-primary" to={`/editCategory/${row.id}`}>Edit</Link>
                                            <button className="btn btn-sm btn-primary mx-2" onClick={()=>{dispatch(deleteCategory(row.id)); }}>Delete</button>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousAriaLabel='Previous'
                        nextLabel='Next'
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination mt-2"}
                        previousLinkClassName={"page-link"}
                        nextLinkClassName={"page-link"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        disabledClassName={"page-item"}
                        activeClassName={"page-item active"}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageCategories