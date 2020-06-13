import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { Slider, Card, Button, message } from 'antd';

import getPayloadToken from "../../utils/getPayloadToken"

import { lightSetting } from "../../appRedux/actions/setting"

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
  const { check, msg } = props.setting;

  const [user, setUser] = useState({})
  const [lightVal, setLightVal] = useState(0)
  const [lastLight, setLastLight] = useState(null);

  useEffect(() => {
    const payload = getPayloadToken();
    if (payload) {
      setUser(payload);
    } else {
      localStorage.removeItem('token');
      props.history.push('/ErrorPages/401')
    }
    //get last light setting
    callApi('/api/setting/light/last').then((res) => {
      setLightVal(res.data.value);
      setLastLight(res.data.value);
    })
  }, [])


  useEffect(() => {
    if (check) {
      message.success(msg, 3);
    } else if (check === false) {
      message.error(msg, 3);
    }
  }, [check])

  const handleSave = () => {
    props.lightSetting({
      type: "light",
      value: lightVal
    });
  }

  return (
    <div>
      <Card title="Range value for auto turn on the light"
        extra={
          <Button
            type="primary"
            disabled={!(user.isAdmin && lightVal !== lastLight)}
            onClick={handleSave}
          > Save
          </Button>}
      >
        <Slider
          min={0}
          max={1023}
          step={1}
          marks={marks}
          value={lightVal}
          tooltipVisible
          disabled={!user.isAdmin}
          onChange={value => setLightVal(value)}
        />
      </Card>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    setting: state.setting
  }
}
export default connect(mapStateToProps, { lightSetting })(Setting);
