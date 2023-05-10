import React, { useEffect, useState } from 'react'
import './css/addedit.css'
import { faArrowLeft,faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'
import moment from 'moment'


const AddEditUsers = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const  initial_user = {
        firstname:'',
        lastname:'',
        email:'',
        dob:'',
        education:'',
        location:'',
        about:''
    }
    const originalDate = new Date(); // or get it as prop
    const [startDate, setStartDate] = useState('');
    const calRef = React.useRef();
    const [ newuser , setnewuser ] = useState('');

    const get_data = () => {
        { id ?
            axios.get(`http://localhost:5002/anyone_details/${id}`).
            then((response)=>{ 
                setnewuser(response.data[0])
                var dt= response.data[0].dob
                setStartDate(new Date(dt))
            }) : 
            setnewuser(initial_user)
            setStartDate(originalDate)
        }  
    }
        
    useEffect(()=>{
        get_data();
    },[])

    

    const onchange_func = (e) => {
        const { name , value } = e.target
        setnewuser({...newuser,[name]:[value]})
    }

    const onchange_date = (date) => {
        let formattedDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
          setStartDate(date)
          setnewuser({...newuser,['dob']:[formattedDate]})
    }

    const onsubmit_func = (e) => {
        e.preventDefault();
        const firstname = newuser.firstname;
        const lastname = newuser.lastname;
        const email = newuser.email
        const dob = newuser.dob
        const location = newuser.location
        const education = newuser.education
        const about = newuser.about
        if(firstname=='') {
            alert('Please enter firstname')
        }   
        else if(lastname=='') {
            alert('Please enter lastname')
        }
        else if(email=='') {
            alert('Please enter email')
        }
        else if(dob=='') {
            alert('Please enter DOB')
        }
        else if(location=='') {
            alert('Please enter location')
        }
        else if(education=='') {
            alert('Please enter education')
        }
        else if(about=='') {
            alert('Please enter about')
        }
        else {
            {
                id ? axios.put(`http://localhost:5002/update_details/${id}`,{firstname,lastname,email,dob,location,education,about}).
                    then((response)=>{
                        alert(response.data);
                        setnewuser(initial_user);
                        navigate('/')
                    })
                : axios.post(`http://localhost:5002/insert_details`,{firstname,lastname,email,dob,location,education,about}).
                    then((response)=>{
                        alert(response.data);
                        setnewuser(initial_user);
                        navigate('/')
                    })
            }
        }
    }



    return(
        <>
            <div className='container-fluid'>
            <div className='row arrow_left mt-5'>
            <Link to='/'><FontAwesomeIcon className='icon_arrow' icon={faArrowLeft} /></Link>
            </div></div>
            <div className="container">
            <form autoComplete='off' onSubmit={onsubmit_func}>
                <div className='row mt-3'>
                    <span className='heading'> 
                      { id ? 'Edit' : 'Add' } Student details  
                    </span>
                </div>
                <div className='row mt-5'>
                    <div className='col-sm-2 mt-1'>
                        <div className='d-flex  justify-content-between'>
                            <span>First Name </span>
                            <span> : </span>    
                        </div> 
                    </div>
                    <div className='col-sm-3'>
                        <input type="text"  value={newuser.firstname} onChange={onchange_func} placeholder='Enter your first name' name='firstname' className='form-control'/>
                    </div>
                    <div className='col-sm-1'></div>
                    <div className='col-sm-2 mt-1'>
                        <div className='d-flex  justify-content-between'>
                            <span>Last Name </span>
                            <span> : </span>    
                        </div> 
                    </div>
                    <div className='col-sm-3'>
                        <input type="text" placeholder='Enter your lastname' value={newuser.lastname} onChange={onchange_func} name='lastname' className='form-control'/>
                    </div>
                    <div className='col-sm-1'></div>
                </div>
                <div className='row mt-5'>
                    <div className='col-sm-2 mt-1'>
                        <div className='d-flex  justify-content-between'>
                            <span> Email </span>
                            <span> : </span>    
                        </div> 
                    </div>
                    <div className='col-sm-3'>
                        <input type="text" placeholder='Enter your email' value={newuser.email} onChange={onchange_func} name='email' className='form-control'/>
                    </div>
                    <div className='col-sm-1'></div>
                    <div className='col-sm-2 mt-1'>
                        <div className='d-flex  justify-content-between'>
                            <span>  DOB </span>
                            <span> : </span>    
                        </div> 
                    </div>
                    <div className='col-sm-3 datepicker_class'>
                    <DatePicker
                        className='form-control'
                        ref={calRef}
                        selected={startDate}
                        placeholderText="dd/MM/YYYY"
                        shouldCloseOnSelect={false}
                        onChange={onchange_date}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        name="dob"
                        >
                        <div>
                            <button className='btn btn-danger cancel_btn' 
                            onClick={() => {
                                setStartDate(originalDate);
                                calRef.current.setOpen(false);
                            }}
                            >
                            Cancel
                            </button>
                            <button className='btn btn-success apply_btn '
                            onClick={() => {
                                calRef.current.setOpen(false);
                            }}
                            >
                            Apply
                            </button>
                        </div>
                        </DatePicker>
                        <span className='icon_calender'><FontAwesomeIcon onClick={() => {
                                calRef.current.setOpen(true);
                            }} icon={faCalendarAlt} /></span>                               
                    </div>
                    <div className='col-sm-1'></div>
                </div>
                <div className='row mt-5'>
                    <div className='col-sm-2 mt-1'>
                        <div className='d-flex  justify-content-between'>
                            <span> Education </span>
                            <span> : </span>    
                        </div> 
                    </div>
                    <div className='col-sm-3'>
                        <input type="text" placeholder='Enter your education' name='education' value={newuser.education} onChange={onchange_func} className='form-control'/>
                    </div>
                    <div className='col-sm-1'>
                    </div>
                    <div className='col-sm-2 mt-1'>
                        <div className='d-flex  justify-content-between'>
                            <span> Location </span>
                            <span> : </span>    
                        </div> 
                    </div>
                    <div className='col-sm-3'>
                        <input type="text" placeholder='Enter your location' name='location' value={newuser.location} onChange={onchange_func} className='form-control'/>
                    </div>
                    <div className='col-sm-1'></div>
                </div>
                <div className='row mt-5'>
                    <div className='col-sm-2 mt-1'>
                        <div className='d-flex  justify-content-between'>
                            <span> About </span>
                            <span> : </span>    
                        </div> 
                    </div>
                    <div className='col-sm-9'>
                        <textarea name='about' placeholder='Enter your details' value={newuser.about} onChange={onchange_func} className='form-control about_text'/>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm-2 mt-1'></div>
                    <div className='col-sm-3'>
                        <input type="submit" className='submit_btn' value='Submit'/>
                    </div>
                </div>
                </form>
            </div>
        </>
    )
}

class AddEdit extends React.Component{

    render(){
        return(
            <>
            <AddEditUsers/>
            </>
        )
    }
}

export default AddEdit