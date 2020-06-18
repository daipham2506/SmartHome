import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom";

import { Card } from 'antd';

import callApi from "../../utils/callApi"

const gridStyle = {
  width: '50%',
  height: '250px',
  textAlign: 'center'
};

const Control = () => {

  const [allRoom, setAllRoom] = useState([])

  useEffect(() => {
    //get all rooms
    callApi('/api/room/all').then(res => {
      setAllRoom(res.data);
    })
  }, [])

  return (
    <div>
      <Card title="List Room">
        {allRoom.map(room => {
          let url = "/control/" + room._id;
          return (
            <Link to={url}>
              <Card.Grid style={gridStyle}>
                <h4>{room.name}</h4>
                <img 
                style={{ height: '80%' }}
                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                alt=""/>
              </Card.Grid>
            </Link>
          )
        })}
      </Card>
    </div>
  )
}

export default Control

