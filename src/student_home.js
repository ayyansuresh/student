import React, { useEffect , useState } from 'react';
import axios from 'axios'
import './css/viewtable.css'
import { Link, useNavigate } from 'react-router-dom';
import { faEdit , faTrashAlt ,faSearch  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Viewusers = (props) => {

    const [ viewuser , setviewuser ] = useState();
    const [ searchval , setsearchval ] = useState('');
    const [ userid , setuserid ] = useState(0);

    const get_data = async () => {
        const result = await axios.get('http://localhost:5002/get_details')
        setviewuser(result.data)
    }

    useEffect(()=>{
        get_data();
    },[])


    const set_this_id = (id) => {
        setuserid(id);
    }

    const delete_user_func = () => {
        axios.delete(`http://localhost:5002/delete_user/${userid}`).
        then((response)=>{
                get_data();
        })
    }

    return(
        <>
            <div className="d-flex justify-content-between mt-4">
                <div className="input_group">
                    <input type="text" onChange={(e)=>{setsearchval(e.target.value)
                }} placeholder="search" className="search_input"/>
                <span className='icon_search'><FontAwesomeIcon icon={faSearch} /></span>
                </div>
                <div className="input_group">
                    <Link to='/addedit'> <button className='btn btn-dark text-white addnew_student'>Add</button> </Link>
                </div>
            </div>
            <table className="table text-center mt-5 viewuser_table">
                <thead> <tr> <th> ID </th> <th> First Name </th> <th> Last Name </th> 
                <th>Location </th><th> Email </th> <th> DOB </th> <th> Education </th> 
                <th> Action </th> <th> Delete </th> </tr> </thead>
                <tbody>
                    { viewuser && viewuser.filter((val)=>{
                        if(searchval === '')
                        {
                            return val;
                        }
                        else if(val.firstname.toLowerCase().includes(searchval.toLowerCase()) ||
                        val.location.toLowerCase().includes(searchval.toLowerCase()) || 
                        val.lastname.toLowerCase().includes(searchval.toLowerCase()) ||
                        val.email.toLowerCase().includes(searchval.toLowerCase()) ||
                        val.dob.toLowerCase().includes(searchval.toLowerCase()) ||
                        val.education.toLowerCase().includes(searchval.toLowerCase()) 
                        )
                        {
                            return val;
                        }
                    }).map((item,index)=>{
                        var dt = item.dob.split('/');
                        return(
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.location}</td>
                                <td>{item.email.split('.com').join("")}</td>
                                <td>{ dt[1]+"/"+dt[0]+"/"+dt[2] } </td>
                                <td>{item.education}</td>
                                <td><Link className='edit_btn' to={`/addedit/${item.id}`}><FontAwesomeIcon className='icon_edit' icon={faEdit} /> Edit</Link></td>
                                <td><button onClick={()=>set_this_id(item.id)} className='delete_btn' data-bs-toggle='modal' data-bs-target='#mymodal'><FontAwesomeIcon className='icon_delete' icon={faTrashAlt} /> Delete</button></td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
            <div id="mymodal" className="modal fade">
                <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <FontAwesomeIcon className='icon_delete_bigsize' icon={faTrashAlt} /> 
                    </div>
                    <div className='modal-body'>
                        <div className='delete_text'> Are you sure you want to delete </div>
                        <div className='d-flex justify-content-evenly mt-4'>
                            <button className='btn btn-success cancel_btn' data-bs-dismiss='modal'>Cancel</button>
                            <button className='btn btn-success yes_btn' onClick={delete_user_func} data-bs-dismiss='modal'>Yes</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        </>
    )
}

class Student_Home extends React.Component{

    render(){
        return(
            <>
            <div className="container">
                <div className="mt-5">
                   <span className='heading'> Student Management System </span>
                </div>
                <Viewusers/>
            </div>
            </>
        )
    }
}

export default Student_Home