import React, { useState, useEffect } from 'react'

import callApi from "../../utils/callApi"

import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


const Chart = () => {
    const [allValueSensor, setAllValueSensor] = useState(null)
    useEffect(() =>{
        callApi('/api/sensor/all').then(res => {
            setAllValueSensor(res.data);
          })
        setInterval(()=>{
            callApi('/api/sensor/all').then(res => {
                setAllValueSensor(res.data);
              })   
        },30000)
    },[])
  return (
    
    <AreaChart
        width={800}
        height={600}
        data={allValueSensor}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    
  )
}

export default Chart

