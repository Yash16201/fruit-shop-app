import React, { useCallback, useEffect } from 'react'
import { fetchUsers } from '../redux/user/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

const ViewUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)  
  const fetchData = useCallback(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    fetchData() 
  }, [fetchData])
  return (
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">View Users </h6>
                <div className="table">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">Sr No.</th>
                                <th scope="col">User Name</th>
                                <th scope="col">User Email</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.length > 0 && user.map((row,key) =>{
                                    return(
                                        <tr key={row.id}>
                                            <td>{key+1}</td>
                                            <td>{row.name}</td>
                                            <td>{row.email}</td>
                                            <td>{moment(row.created_at).format('DD-MM-Y')}</td>
                                            <td>{moment(row.updated_at).format('DD-MM-Y')}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ViewUser