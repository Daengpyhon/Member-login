import React from "react";
import {Link} from 'react-router-dom'
const MenubarAdmin = () => {
  return (
    <div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item fs-5"><Link to="/admin/index" className="text-decoration-none">ແດສບອດ</Link></li>
        <li className="list-group-item fs-5"><Link to="/admin/manage-admin" className="text-decoration-none">ຈັດການແອັດມີນ</Link></li>    
      </ul>
    </div>
  );
};

export default MenubarAdmin;
