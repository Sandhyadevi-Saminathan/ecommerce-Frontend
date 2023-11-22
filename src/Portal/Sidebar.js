import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'


function Sidebar() {
    

    

    return (
        <>



            <ul 
               
                  className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion static-top shadow"
                  id="accordionSidebar"
                  style={{ marginTop: '0' }}
                  >

                {/* <!-- Sidebar - Brand --> */}
                <div className="sidebar-brand d-flex align-items-center justify-content-center" href="" style={{ fontSize: "20px", color: "black" }}  >





                </div>
                <br />
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0 " />

                <li className="nav-item active">
                    <Link className="nav-link" to="/" onClick={() => {
                      
                    }}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{ fontSize: "17px" }}>Home</span></Link>
                </li>
                {/* <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <Link className="nav-link" to="/products/grocery" onClick={() => {
                       
                    }}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{ fontSize: "17px" }}>Grocery</span></Link>
                </li>

                <li className="nav-item active">
                    <Link className="nav-link" to="/products/mobiles" onClick={() => {
                      
                    }}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{ fontSize: "17px" }}>Mobiles</span></Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/products/fashion" onClick={() => {
                       
                    }}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{ fontSize: "17px" }}> Fashion</span></Link>

                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/products/electronics" onClick={() => {
                     
                    }}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{ fontSize: "17px" }}>Electronics</span></Link>

                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/products/furniture" onClick={() => {
                        
                    }}>
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span style={{ fontSize: "17px" }}>Home & Furniture</span></Link>

                </li>
              
            </ul >





        </>
    )
}

export default Sidebar