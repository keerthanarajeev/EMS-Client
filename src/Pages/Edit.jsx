import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../Components/LoadingSpinner';
import { addUser, allUser, editUser } from '../services/AllApi';
import { registerContext } from './ContextShare';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';


function Edit() {
    const { registerData, setregisterData } = useContext(registerContext)
    const navigate = useNavigate()


    const [showspin, setshowspin] = useState(true)

    // to hold normal user inputs

    const [normalInputs, setNormalUserinputs] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        location: "",
    })

    // to hold status

    const [status, setStatus] = useState("")

    // to hold profile

    const [profile, setProfile] = useState("")

    const [preview, setPreview] = useState("")


    useEffect(() => {

        if (profile) {
            setexistingImg("")
            URL.createObjectURL(profile)
            setPreview(URL.createObjectURL(profile)
            )
        }

        setTimeout(() => {
            setshowspin(false)
        }, 2000);
    }, [profile])

    // to get single item for edit

    const { id } = useParams()
    console.log(id);

    const [existingImg, setexistingImg] = useState("")


    useEffect(() => {
        getuser()
      
      
      }, [])
      


    
  // to get all employee details from database

  const getuser=async()=>{
    const {data}=await allUser("")
    console.log(data);

    let existingUser=data.find(item=>item._id===id)
    console.log(existingUser);
    setNormalUserinputs(existingUser)
    setStatus(existingUser.status)
    setexistingImg(existingUser.profile)
  }



    // define normaluserinput function

    const getandsetuserNormalInputs = (e) => {
        const { name, value } = e.target
        setNormalUserinputs({ ...normalInputs, [name]: value })

    }

    // to handle file upload
    const handlefile = (e) => {
        // console.log(e.target.files[0]);
        setProfile(e.target.files[0]);
    }

    // console.log(normalInputs);
    // console.log(status);
    // console.log(profile);



    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'InActive' },
    ];


    // define submit function

    const handleSubmit = async (e) => {

        e.preventDefault()

        const { fname, lname, email, mobile, gender, location } = normalInputs
        if (!fname || !lname || !email || !mobile || !gender || !status || !profile || !location) {
            alert("please fill the form completly")

        }

        else {
            // alert('form filled completely')

            const data = new FormData()

            data.append("fname", fname)
            data.append("lname", lname)
            data.append("email", email)
            data.append("mobile", mobile)
            data.append("gender", gender)
            data.append("status", status)
            profile? data.append("profile", profile):data.append("pofile", existingImg)
            data.append("location", location)



            if(profile){
                var headers = {
                    "content-type": "multipart/form-data"
                }
            }else{
                var headers=""
            }



            

            // api call

            const response = await editUser(id, data, headers)

            console.log(response);

            if (response.status == 200) {
            
                navigate('/')
            }
            else {
                alert('request failed')
            }
        }
    }

    return (
        <>
            {
                showspin ?
                    <LoadingSpinner /> :
                    <div className="container mt-4">
                        <h2 className='text-center'>UPDATE EMPLOYEE DETAILS</h2>
                        <div className='mt-5 shadow border rounded p-2 mb-5'>
                            <div className="text-center pt-4">
                                <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={preview?preview:`${BASE_URL}/uploads/${existingImg}`} alt="no image" />
                            </div>

                            <Form className='mt-4'>
                                <Row className='px-3'>
                                    {/* First Name */}

                                    <FloatingLabel className='mb-3 col-lg-6 p-1' controlId="floatingInputfname" label="First name">
                                        <Form.Control type="text" name='fname' placeholder="First name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.fname} />
                                    </FloatingLabel>

                                    {/* Last Name */}

                                    <FloatingLabel className='mb-3 col-lg-6 p-1' controlId="floatingInputlname" label="Last name">
                                        <Form.Control type="text" name='lname' placeholder="Last name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.lname} />
                                    </FloatingLabel>

                                    {/* Email */}

                                    <FloatingLabel className='mb-3 col-lg-6 p-1' controlId="floatingInputemail" label="Email">
                                        <Form.Control type="email" name='email' placeholder="Email" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.email} />
                                    </FloatingLabel>

                                    {/* Mobile */}

                                    <FloatingLabel className='mb-3 col-lg-6 p-1' controlId="floatingInputmobile" label="Mobile Number">
                                        <Form.Control type="text" name='mobile' placeholder="Mobile Number" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.mobile} />
                                    </FloatingLabel>

                                    {/* gender */}

                                    <Form.Group className='mb-3 col-lg-6'>
                                        <Form.Label>Select Gender</Form.Label>
                                        <Form.Check type={"radio"} name='gender' onChange={e => getandsetuserNormalInputs(e)} value={"Male"} label={"Male"} checked={normalInputs.gender==="Male"?true:false} />
                                        <Form.Check type={"radio"} name='gender' onChange={e => getandsetuserNormalInputs(e)} value={"Female"} label={"Female"} checked={normalInputs.gender==="FeMale"?true:false}  />
                                    </Form.Group>

                                    {/* status */}

                                    <Form.Group className='mb-3 col-lg-6'>
                                        <Form.Label>Select Employee Status</Form.Label>
                                        <Select placeholder={status} onChange={e => setStatus(e.value)} options={options} />
                                    </Form.Group>

                                    {/* profile */}

                                    <Form.Group className='mb-3 col-lg-6'>
                                        <Form.Label>SChoose a Profile Picture</Form.Label>
                                        <Form.Control type="file" onChange={e => handlefile(e)} name='profile' />
                                    </Form.Group>

                                    {/* Location */}

                                    <FloatingLabel className='mb-3 mt-2 col-lg-6 p-1' controlId="floatingInputlocation" label="Location">
                                        <Form.Control type="text" name='location' placeholder="Location" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.location} />
                                    </FloatingLabel>

                                    <Button onClick={e => handleSubmit(e)} type='submit' className='mt-2 btn btn-success p-2'>Update</Button>


                                </Row>

                            </Form>
                        </div>

                    </div>

            }
        </>
    )
}

export default Edit