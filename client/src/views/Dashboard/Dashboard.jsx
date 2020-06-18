import React, { useState, useEffect } from 'react'
import { Table, Tag, Spin } from 'antd';

import callApi from "../../utils/callApi"


const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id'
  },
  {
    title: 'Device ID',
    dataIndex: 'deviceId',
    key: 'deviceId',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: (value) => (
      <a> {value}</a>
    )
  },
  {
    title: 'Status',
    key: 'isTurnOn',
    dataIndex: 'isTurnOn',
    render: (isTurnOn) => {
      let status = 'ON';
      let color = 'green';
      if (!isTurnOn) {
        status = 'OFF';
        color = 'red';
      }
      return (
        <Tag color={color} key={isTurnOn}>
          {status}
        </Tag>
      );
    }
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    render: (user) => {
      return (
        <div> {user ? user.name : 'boot'}</div>
      );
    }
  },
  {
    title: 'Created At',
    key: 'time',
    dataIndex: 'time'
  },
];

const columnSensor = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id'
  },
  {
    title: 'Device ID',
    dataIndex: 'deviceId',
    key: 'deviceId',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: (value) => (
      <a> {value}</a>
    )
  },
  {
    title: 'Time Received',
    key: 'time',
    dataIndex: 'time'
  },
];


const Dashboard = props => {

  const [allControl, setAllControl] = useState(null)
  const [allValueSensor, setAllValueSensor] = useState(null)

  useEffect(() => {
    //get all controls
    callApi('/api/control/all').then(res => {
      setAllControl(res.data);
    })
    //get all values sensor
    callApi('/api/sensor/all').then(res => {
      setAllValueSensor(res.data);
    })

    setInterval(() => {
      //get all controls
      callApi('/api/control/all').then(res => {
        setAllControl(res.data);
      })
      //get all values sensor
      callApi('/api/sensor/all').then(res => {
        setAllValueSensor(res.data);
      })
    }, 30000);
  }, [])

  return (
    <Spin spinning={!allControl || !allValueSensor} tip="Loading...">
      <h4 style={{ textAlign: "center" }}> <a>HISTORY CONTROL</a></h4>
      <Table columns={columns} dataSource={allControl} />

      <h4 style={{ textAlign: "center" }}> <a>VALUES OF LIGHT SENSOR</a></h4>
      <Table columns={columnSensor} dataSource={allValueSensor} />
    </Spin>
  )
}

export default Dashboard
