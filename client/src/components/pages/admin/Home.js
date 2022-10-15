import React from 'react'
import MenubarAdmin from '../../layout/MenubarAdmin'
const Home = () => {
  return (
    <div className="container-fluid">

      <div className="row">
        <div className="col-sm-2 md-2 col-lg-2">
        <MenubarAdmin/>
        </div>
        <div className="col-sm-10 md-10 col-lg-10">
        <h3>ໜ້າຫຼັກແອດມີນ</h3>
        </div>
      </div>    
    </div>
  )
}

export default Home