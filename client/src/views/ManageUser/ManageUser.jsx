import React, { useState, useEffect } from 'react'
import { Table, Spin, Button, Card, Modal, message } from 'antd';
import { Link } from "react-router-dom";
import callApi from "../../utils/callApi"

import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

const ManageUser = props => {

  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Full name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (value) => (
        <a> {value}</a>
      )
    },
    {
      title: 'Created At',
      key: 'date',
      dataIndex: 'date',
      render: (d) => {
        let date = new Date(d)
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        return (
          `${dd} - ${mm} - ${yyyy}`
        )
      }
    },
    {
      title: 'Action',
      render: (user) => (
        <Button danger onClick={() => showConfirm(user)}> Delete</Button>
      )
    },
  ];

  const gridStyle = {
    width: '100%',
    textAlign: 'center'
  };

  function showConfirm(user) {
    confirm({
      title: `Do you want to delete user ${user.name}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, this user will be deleted.',
      onOk() {
        setLoading(true)
        callApi(`/api/users/delete/${user._id}`, 'DELETE').then(res => {
          setLoading(false)
          message.success(res.data);
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        })
      },
    });
  }

  useEffect(() => {
    //get all devices by roomId
    callApi("/api/users/all").then(res => {
      setUsers(res.data);
    })
  }, [])

  return (
    <Spin spinning={!users || loading} tip="Loading...">
      <Card title="List User" style={{ textAlign: "center" }}
        extra={
          <Link to="/add-user">
            <Button
              type="primary"
            > Add New User
          </Button>
          </Link>
        }
      >
        <Card.Grid style={gridStyle}>
          <Table columns={columns} dataSource={users} />
        </Card.Grid>
      </Card>
    </Spin>
  )
}

export default ManageUser
