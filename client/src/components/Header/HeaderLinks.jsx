import classNames from "classnames";
import PropTypes from "prop-types";
import { Manager, Target, Popper } from "react-popper";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import MenuItem from "material-ui/Menu/MenuItem";
import MenuList from "material-ui/Menu/MenuList";
import ClickAwayListener from "material-ui/utils/ClickAwayListener";
import Paper from "material-ui/Paper";
import Grow from "material-ui/transitions/Grow";
import IconButton from "material-ui/IconButton";
import Hidden from "material-ui/Hidden";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react'
import callApi from "../../utils/callApi"
import { Table, Tag, Spin } from 'antd';
// material-ui-icons
// import Person from "material-ui-icons/Person";
import Notifications from "material-ui-icons/Notifications";
// import Dashboard from "material-ui-icons/Dashboard";
import Search from "material-ui-icons/Search";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SearchButton from "components/CustomButtons/IconButton.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
var index1 =0;
var index2 =0;
var name;
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



const CustomToast = ({closeToast}) => {
  let dateTime = getDateTime();
  const [allRoom, setAllRoom] = useState([])
  useEffect(() => {
    //get all rooms
    callApi('/api/room/all').then(res => {
      setAllRoom(res.data);
    })
  }, [])
  return (
    <div className = "App">
              <hh>
                 Something went wrong! {dateTime}
              </hh>   
   </div>
  );
}
 
const App = props => {
  var device1 = String;
  const [allControl, setAllControl] = useState(null)
  const [allValueSensor, setAllValueSensor] = useState(null)
  const [devices, setDevices] = useState([])
  
  useEffect(() => {
    //get all controls
    
    callApi('/api/control/all').then(res => {
      setAllControl(res.data);
      
    })
    //get all values sensor
    callApi('/api/sensor/all').then(res => {
      setAllValueSensor(res.data);
      
    })
    callApi(`/api/device/${1}`).then(res => {
      setDevices(res.data);
      
    })
    setInterval(() => {
      //get all controls
      callApi('/api/control/all').then(res => {
        setAllControl(res.data);
      })
      
    }, 30000);
    
  }, [])
  if (allControl != null) {index1 = allControl[0]._id; index2 = allControl[0]._id}
 const ccc = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
  
  const notify2 = () => toast((

    <div >
      <MenuList style={{overflow:"auto", height:"500px"}}>
      {ccc.map(device => {
      index2 = allControl[0]._id
      if (allControl[device].isTurnOn) {var cc = "ON";} else {var cc = "OFF";}
      if (allControl[device].user == null) {name = "boot";} else {name = allControl[device].user.name;}
    return (
      <hh >
          <MenuItem style={{border:"1px solid #7efff5",borderRadius:"4px",margin:"2px",backgroundColor:"#7efff5"}}>{allControl[device].deviceId} is turn {cc} by {name} <br/> at {allControl[device].time}  </MenuItem>    
      </hh>
    )
    
  })}
                  
          
                  </MenuList>
  </div>),{position: toast.POSITION.TOP_RIGHT});
    return (
    <div>
            <hh>
                <button onClick={notify2} style={{
      backgroundColor: "#c8d6e5",
      borderColor: "transparent",
      borderRadius: 30,
      width: 30,
      

    }}
    textStyle={{ color: "#ff3838", fontSize: 20 }} > ||| </button>
                  
              <ToastContainer />   

            </hh>      
    </div>
        )
}
export default App;
