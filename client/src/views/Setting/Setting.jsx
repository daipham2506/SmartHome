import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { Slider, Card, Button, message, Table, Tag, Spin } from 'antd';

import getPayloadToken from "../../utils/getPayloadToken"

import { lightSensorSetting } from "../../appRedux/actions/setting"

import callApi from "../../utils/callApi"


const marks = {
  0: '0',
  200: '200',
  400: '400',
  600: '600',
  800: '800',
  1023: {
    style: {
      color: '#f50',
    },
    label: <strong>1023</strong>,
  },
};

const Setting = props => {
  const { check, msg, loading } = props.setting;

  const [user, setUser] = useState({})
  const [lightSensorVal, setLightSensorVal] = useState(0)
  const [lastVal, setLastVal] = useState(null);
  const [allSetting, setAllSetting] = useState([])

  useEffect(() => {
    const payload = getPayloadToken();
    if (payload) {
      setUser(payload);
    } else {
      localStorage.removeItem('token');
      props.history.push('/ErrorPages/401')
    }
    //get last light sensor setting
    callApi('/api/setting/light-sensor/last').then((res) => {
      setLightSensorVal(res.data ? res.data.value : null);
      setLastVal(res.data ? res.data.value : null);
    })
    //get all light sensor setting
    callApi('/api/setting/light-sensor/all').then(res => {
      setAllSetting(res.data);
    })

  }, [])


  useEffect(() => {
    if (check) {
      message.success(msg, 3);
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } else if (check === false) {
      message.error(msg, 3);
    }
  }, [check])

  const handleSave = () => {
    let today = new Date(); 
    let dd = today.getDate(); 
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear(); 
    if (dd < 10) { dd = '0' + dd } 
    if (mm < 10) { mm = '0' + mm } 
    let date = dd + '-' + mm + '-' + yyyy;
    let dateTime = date + " " + new Date().toLocaleTimeString('vi', { hour12: false });
    
    props.lightSensorSetting({
      type: "sensor",
      value: lightSensorVal,
      time: dateTime
    });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
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
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      render: (type) => (
        <Tag color="green" key={type}>
          {type.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Created At',
      key: 'time',
      dataIndex: 'time'
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button>Delete</Button>
      )
    },
  ];

  return (
    <div>
      <Spin spinning={loading}>
        <Card title="Range value for auto turn on the light"
          extra={
            <Button
              type="primary"
              disabled={!(user.isAdmin && lightSensorVal !== lastVal)}
              onClick={handleSave}
            > Save
          </Button>}
        >
          <Slider
            min={0}
            max={1023}
            step={1}
            marks={marks}
            value={lightSensorVal}
            tooltipVisible
            disabled={!user.isAdmin}
            onChange={value => setLightSensorVal(value)}
          />
        </Card>
        <h4 style={{ textAlign: "center", marginTop: 40 }}> <a>History Light Sensor Setting</a></h4>
        <Table columns={columns} dataSource={allSetting} />
      </Spin>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    setting: state.setting
  }
}
export default connect(mapStateToProps, { lightSensorSetting })(Setting);
