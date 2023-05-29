import React from 'react'
import { Link } from 'react-router-dom'
import Container from "../components/Container";

import {AiFillProfile} from 'react-icons/ai'
function UserInfo() {
  const handelLogOut=()=>{
    localStorage.clear()
    window.location.reload()
  }
  return (
    <>

{/* <div className="container">
  <div className="d-flex flex-wrap">
    <div className="col-lg-4 mb-4">
      <Link to="/card1" className="card zoom-effect">
        <img src="icon1.png" className="card-img-top" alt="Icon 1" />
        <div className="card-body">
          <h5 className="card-title">Card 1</h5>
        </div>
      </Link>
    </div>

    <div className="col-lg-4 mb-4">
      <Link to="/card2" className="card zoom-effect">
        <img src="icon2.png" className="card-img-top" alt="Icon 2" />
        <div className="card-body">
          <h5 className="card-title">Card 2</h5>
        </div>
      </Link>
    </div>

    <div className="col-lg-4 mb-4">
      <Link to="/card3" className="card zoom-effect">
        <img src="icon3.png" className="card-img-top" alt="Icon 3" />
        <div className="card-body">
          <h5 className="card-title">Card 3</h5>
        </div>
      </Link>
    </div>
  </div>
</div> */}
<Container class1="featured-wrapper py-5 home-wrapper-2">
<h3 className="mb-4 title">User INfo</h3>

      <div className="row row-cols-lg-3 d-flex justify-content-between">

          
      <div className="profilecard col-lg-3 col-sm-12  d-flex  justify-content-center flex-column align-items-center ">
         <AiFillProfile className='fs-1 '/>

           <Link to={'/my-profile'} className="fs-3 text-dark ">Profile</Link>
          </div>

          <div className=" profilecard col-lg-3 col-sm-12  d-flex  justify-content-center flex-column align-items-center">
         <AiFillProfile className='fs-1 '/>

         <Link to={'/my-orders'} className="fs-3 text-dark ">Orders</Link>

          </div>
          <div className=" profilecard col-lg-3 col-sm-12  d-flex  justify-content-center flex-column align-items-center">
         <AiFillProfile className='fs-1 '/>

         <button onClick={handelLogOut}  className="border border-0 bg-transparent text-dark text-uppercase" type="button">LogOut</button>

          </div>
        </div>
</Container>



      
    </>

    

  )
}

export default UserInfo