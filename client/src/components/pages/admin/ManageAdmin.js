import React, { useState, useEffect } from "react";
import { Switch, Select,Modal, Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment/min/moment-with-locales";
import MenubarAdmin from "../../layout/MenubarAdmin";
// import users file in funtions folder
import { listUser } from "../../functions/users";
// redux
import { useSelector } from "react-redux";
// import auth file in functions folder
import { changeStatus, changeRole, removeUser, resetPassword } from "../../functions/users";
const ManageAdmin = () => {
  
  // access to store token
  // extend from users file in route
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  // ! Fetch data from api
  // console.log(user.token)
  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        //console.log(res.data)
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // ! Change Status (2)

  const handleOnChange = (e, id) => {
    //console.log(e, id)
    const value = {
      id: id,
      enabled: e,
    };
    changeStatus(user.token, value)
      .then((res) => {
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  ///! Change Role 3
  const handleChangeRole = (e, id) => {
    const value = {
      id: id,
      role: e,
    };
    console.log(value);
    changeRole(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this?")) {
      console.log(id);
      removeUser(user.token, id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id) => {
    setIsModalOpen(true);
    //console.log(id)
    setValue({...value, id:id})
  };

  //console.log(value)

  const [value, setValue] = useState({
    id: "",
    password: "",
  })

  const handleChangePassword = (e) =>{
    //  console.log(e.target.name)
    //  console.log(e.target.value)
     setValue({...value,[e.target.name]: e.target.value})
  }


  const handleOk = () => {
    setIsModalOpen(false);
   // console.log(value)

    resetPassword(user.token, value.id, {value})
    .then((res) => {
      //console.log(res)
      loadData(user.token);
    }).catch((err) => {
      console.log(err.response)
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  const roleData = ["admin", "user"];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2 md-2 col-lg-2">
          <MenubarAdmin />
        </div>
        <div className="col-sm-2 md-10 col-lg-10">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ຊື່</th>
                <th scope="col">ນາມສະກຸນ</th>
                <th scope="col">ຊື່ຜູ້ໃຊ້</th>
                <th scope="col">ອີເມວ</th>
                <th scope="col">ໜ້າທີ່</th>
                <th scope="col">ສະຖານະ</th>
                <th scope="col">ສ້າງ</th>
                <th scope="col">ອັັບເດັດ</th>
                <th scope="col">ເລືອກ</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.fname}</td>
                  <td className="text-uppercase">{item.lname}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <Select
                      style={{ width: "100%" }}
                      value={item.role}
                      onChange={(e) => handleChangeRole(e, item._id)}
                    >
                      {roleData.map((role, i) => (
                        <Select.Option value={role} key={i}>
                          {role === "admin" ? (
                            <div className="text-primary">{role}</div>
                          ) : (
                            <div className="text-warning">{role}</div>
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      checked={item.enabled}
                      onClick={(e) => handleOnChange(e, item._id)}
                    />
                  </td>
                  <td>{moment(item.createdAt).locale("lo").format("ll")}</td>
                  <td>
                    {moment(item.updatedAt)
                      .locale("lo")
                      .startOf(item.updatedAt)
                      .fromNow()}
                  </td>

                  <td>
                    <EditOutlined onClick={()=>showModal(item._id)} className="text-primary fs-6"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <DeleteOutlined onClick={() => handleRemove(item._id)} className="text-danger fs-6" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         {/* Modal */}
         <Modal title="ແກ້ໄຂລະຫັດຜ່ານ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>ລະຫັດຜ່ານໃໝ່</p>
        <Input type="password" name="password" placeholder="ໃສລະຫັດຜ່ານໃໝ່" onChange={handleChangePassword} />
      </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
