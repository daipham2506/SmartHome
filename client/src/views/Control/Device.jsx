import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { Card, Slider, Button, Modal, message, Spin } from 'antd';

import WbIncandescentIcon from 'material-ui-icons/WbIncandescent';
import SpeakerIcon from 'material-ui-icons/Speaker';
import FlareIcon from 'material-ui-icons/Flare';

import { controlDevice } from "../../appRedux/actions/control"

import getPayloadToken from "../../utils/getPayloadToken"

import callApi from "../../utils/callApi"

const gridStyle = {
  width: '47%',
  height: '250px',
  textAlign: 'center',
  margin: 20
};

const marks = {
  0: '0',
  40: '40',
  80: '80',
  120: '120',
  160: '160',
  200: '200',
  255: {
    style: {
      color: '#f50',
    },
    label: <strong>255</strong>,
  },
};

const markSpeaker = {
  0: '0',
  1000: '1000',
  2000: '2000',
  3000: '3000',
  4000: '4000',
  5000: {
    style: {
      color: '#f50',
    },
    label: <strong>5000</strong>,
  },
};

const markSensor = {
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


const Device = props => {

  let roomId = props.match.params.roomId;

  const { check, msg, loading } = props.control;

  const [devices, setDevices] = useState([])
  const [visibleSpeaker, setVisibleSpeaker] = useState(false)
  const [visibleLight, setVisibleLight] = useState(false)
  const [lightVal, setLightVal] = useState(null);
  const [speakerVal, setSpeakerVal] = useState(null);
  const [user, setUser] = useState({})
  const [deviceId, setDeviceId] = useState(null)

  useEffect(() => {
    const payload = getPayloadToken();
    if (payload) {
      setUser(payload);  
    } else {
      localStorage.removeItem('token');
      props.history.push('/ErrorPages/401')
    }
    //get all devices by roomId
    callApi(`/api/device/${roomId}`).then(res => {
      setDevices(res.data);
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


  const getDateTime = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    let date = dd + '-' + mm + '-' + yyyy;
    let dateTime = date + " " + new Date().toLocaleTimeString('vi', { hour12: false });
    return dateTime;
  }

  const handleOkLight = () => {
    let dateTime = getDateTime();
    props.controlDevice({
      user: user.id,
      deviceId: deviceId,
      type: 'light',
      value: lightVal,
      time: dateTime,
      nameUser: user.name
    });
    setVisibleLight(false)
  };

  const handleOkSpeaker = () => {
    let dateTime = getDateTime();
    props.controlDevice({
      user: user.id,
      deviceId: deviceId,
      type: 'speaker',
      value: speakerVal,
      time: dateTime,
      nameUser: user.name
    });
    setVisibleSpeaker(false)
  };

  const handleCancel = () => {
    setVisibleLight(false)
    setVisibleSpeaker(false)
  };

  return (
    <Spin spinning={loading}>
      <Card title={`All Devices of Room ${Number(roomId) + 1}`}>
        {devices.map(device => {
          return (
            <Card.Grid style={gridStyle}>
              <h6>{"Type: " + device.type}</h6>
              <h6>{"ID: " + device._id}</h6>
              {device.type === 'light' &&
                <div>
                  <WbIncandescentIcon />
                  <Slider
                    min={0}
                    max={255}
                    step={1}
                    marks={marks}
                    value={device.value}
                    tooltipVisible
                    disabled
                  />
                  <Button type="primary" style={{ marginTop: 10 }}
                    onClick={() => {
                      setVisibleLight(true)
                      setLightVal(device.value)
                      setDeviceId(device._id)
                    }}
                  >
                    SETTING</Button>
                  <Modal
                    destroyOnClose={true}
                    style={{ textAlign: 'center' }}
                    title="Control Light"
                    visible={visibleLight}
                    onOk={handleOkLight}
                    onCancel={handleCancel}
                  >
                    <h6>{"Type: " + device.type}</h6>
                    <h6>{"ID: " + deviceId}</h6>
                    <WbIncandescentIcon />
                    <Slider
                      style={{ marginTop: 20 }}
                      min={0}
                      max={255}
                      step={1}
                      marks={marks}
                      value={lightVal}
                      tooltipVisible
                      onChange={value => setLightVal(value)}
                    />
                  </Modal>
                </div>
              }
              {device.type === 'speaker' &&
                <div>
                  <SpeakerIcon />
                  <Slider
                    min={0}
                    max={5000}
                    step={50}
                    marks={markSpeaker}
                    value={device.value}
                    tooltipVisible
                    disabled
                  />
                  <Button type="primary" style={{ marginTop: 10 }}
                    onClick={() => {
                      setVisibleSpeaker(true)
                      setSpeakerVal(device.value)
                      setDeviceId(device._id)
                    }}
                  >
                    SETTING</Button>
                  <Modal
                    destroyOnClose={true}
                    style={{ textAlign: 'center' }}
                    title="Control Speaker"
                    visible={visibleSpeaker}
                    onOk={handleOkSpeaker}
                    onCancel={handleCancel}
                  >
                    <h6>{"Type: " + device.type}</h6>
                    <h6>{"ID: " + deviceId}</h6>
                    <SpeakerIcon />
                    <Slider
                      style={{ marginTop: 20 }}
                      min={0}
                      max={5000}
                      step={50}
                      marks={markSpeaker}
                      value={speakerVal}
                      tooltipVisible
                      onChange={value => setSpeakerVal(value)}
                    />
                  </Modal>
                </div>
              }
              {device.type === 'sensor' &&
                <div>
                  <FlareIcon />
                  <Slider
                    min={0}
                    max={1023}
                    step={1}
                    marks={markSensor}
                    value={device.value}
                    tooltipVisible
                    disabled
                  />
                </div>
              }

            </Card.Grid>
          )
        }
        )}
      </Card>
    </Spin>
  );
}

const mapStateToProps = state => {
  return {
    control: state.control
  }
}
export default connect(mapStateToProps, { controlDevice })(Device);
