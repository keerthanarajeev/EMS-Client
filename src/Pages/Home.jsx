import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../Components/Hometable'
import LoadingSpinner from '../Components/LoadingSpinner'
import { registerContext } from './ContextShare'
import Alert from 'react-bootstrap/Alert';
import { allUser, deleteUser } from '../services/AllApi'


function Home() {

    const [allUserData,setAllUserdata]=useState([])
    const { registerData, setregisterData } = useContext(registerContext)
    const [showspin, setshowspin] = useState(true)

    const [search, setSearch] = useState("")


    useEffect(() => {
        //  call getAllEmployees function

        getAllEmployees()
        setTimeout(() => {
            setshowspin(false)
        }, 2000);
    }, [search])


    // function definition for get all data

    const getAllEmployees = async () => {
        const response = await allUser(search)
        console.log(response);
        setAllUserdata(response.data)
    }


    // delete employee

const removeUser=async(id)=>{
    const response=await deleteUser(id)
    console.log(id);
  
    if(response.status==200){
    getAllEmployees()
  }
  else{
    alert("operation failed!!! please try after some time")
  }
  
  }

    return (

        <>



            {
                registerData && <Alert variant='success' onClose={() => setregisterData("")} dismissible>
                    {registerData.fname.toUpperCase()}  Registered Successfully........
                </Alert>

            }




            {
                showspin ?
                    <LoadingSpinner /> :
                    <div className="container">
                        <div className='row'>
                            <div className='col-lg-10'>
                                <div className=' col-lg-9 search-all d-flex align-items-center'>
                                    <div className="serach d-flex align-items-center mt-5">
                                        <span className='fw-bolder fs-5'>Search:</span>
                                        <input type="text" onChange={e=>setSearch(e.target.value)} placeholder='Search By Employee Name' className='form-control ms-3' style={{ width: '400px' }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-2 pt-4'>
                                <Link to={'/add'} className='btn btn-success  ms-auto mt-4 p-2 px-4'>
                                    Add<i class="fa-solid fa-user-plus ps-2"></i>
                                </Link>

                            </div>

                            <div className='table mt-5'>

                                <h2 className='text-uppercase  text-decoration-underline text-center text-body mt-5'>List of All Employees</h2>
                                <Hometable displayData={allUserData} removeuser={removeUser}/>

                            </div>
                        </div>
                    </div>

            }


        </>
    )
}

export default Home