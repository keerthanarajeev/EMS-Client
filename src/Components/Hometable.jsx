import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { BASE_URL } from '../services/baseUrl';

function Hometable({ displayData, removeuser }) {

    console.log(displayData);
    return (
        <>

            <div>
                <table class="table table-dark table-striped-columns table-hover mt-5 shadow">
                    <thead>
                        <tr className='table-success'>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">PROFILE</th>
                            <th scope="col">ACTION</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            displayData.length>0?

                            displayData.map((item,index)=>(
                                <tr>
                                <td>{index+1}</td>
                                <td>{item.fname} {item.lname}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td><Button className={item.status=="Active"?"btn btn-success":"btn btn-danger"}>{item.status}</Button></td>
                                <td><img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={`${BASE_URL}/uploads/${item.profile }`} alt="no image" /></td>
                                <td>
                                    <Link to={`/view/${item._id}`}><i class="fa-solid fa-eye text-light"></i></Link>
                                    <Link to={`/edit/${item._id}`}><i class="fa-solid fa-pen-to-square  text-info ps-2"></i></Link>
                                    <span onClick={()=>removeuser(item._id)}><i class="fa-solid fa-trash ps-2 text-warning "></i></span>
                                </td>
                            </tr>
                            )
                            
                            ):<tr className='text-danger mt-5 w-100'>Nothing to display</tr>

                          
                        }
                    </tbody>
                </table>
            </div>


        </>
    )
}

export default Hometable