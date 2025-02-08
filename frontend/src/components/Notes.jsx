import React, { useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { Modal } from './Modal.jsx';


export default function Notes({title,date,handleUpdate,handleDelete}) {
  const [show,setShow]=useState(false)
  const handleShow=()=>{
    setShow(!show)
  }
  return (
   <>
   {/* <Modal show={show} handleClose={handleShow} /> */}
   


  <div className="card position-relative  rounded-4 border-0" style={{width:"18rem",backgroundColor:"#FEC971"}}>
  <div className="card-body position-relative">
    <h5 className="card-title">{title}</h5>

    <div className='bottomContent'>
        <div className='Date d-flex justify-content-between align-items-center'>
            <h5 className='fs-6 ' >{date}</h5>
             <div  className='d-flex justify-content-center flex-column align-items-center position-relative'>
               {show && (
                <div className='Dropdown'>
                <FaPen size={20} cursor={"pointer"} onClick={handleUpdate} data-bs-toggle="modal" data-bs-target="#eiditModal"/>
                <MdDelete size={25} color='red' cursor={"pointer"} onClick={handleDelete} data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal"/>
                
                </div>
               )}
             <HiDotsVertical size={25} cursor={'pointer'} onClick={handleShow}/>
             </div>
        </div>
    </div>

    
  </div>
</div>
   </>
  )
}