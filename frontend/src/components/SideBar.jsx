import React from 'react'
import { FaPlus } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className='mt-5 mx-5'>
      <h1 className='fs-3 fw-bold'>LOGO</h1>
      <div className='mt-5 mx-2 d-flex  justify-content-center align-items-center' style={{backgroundColor:'black',height:"50px",width:"50px",borderRadius:"50%",cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal">
        <FaPlus size={30} className='text-white'/>
      </div>
    </div>
  )
}

export default SideBar
