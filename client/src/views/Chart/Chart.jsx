import React, { useState, useEffect } from 'react';

import callApi from "../../utils/callApi";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { Select } from 'antd'

const Chart = () => {
  const [allValueSensor, setAllValueSensor] = useState(null)
  const [status, setStatus] = useState(4)

  useEffect(() => {
    callApi('/api/sensor/newest').then(res => {
      const new_data = res.data.filter(item => {
        const [date, time] = item.time.split(' ');
        const [day, month, year] = date.split('-');
        const t = new Date(`${year}-${month}-${day} ${time}`).getTime();
        const now = Date.now()
        if (status === 1) {
          return now - t < 3600000
        } else if (status === 2) {
          return now - t < 21600000
        } else if (status === 3) {
          return now - t < 86400000;
        } else if (status === 4) {
          return now - t < 1296000000;
        } else {
          return now - t < 2592000000
        }
      })
      setAllValueSensor(new_data);
    })
  }, [status])


  return (
    <div >
      <Select onChange={value => setStatus(parseInt(value, 10))} style={{width:150 , marginLeft: 250, marginBottom:20}} defaultValue="4">
        <Select.Option value="1">1 hour ago</Select.Option>
        <Select.Option value="2">6 hours ago</Select.Option>
        <Select.Option value="3">1 day ago</Select.Option>
        <Select.Option value="4">15 days ago</Select.Option>
        <Select.Option value="5">1 month ago</Select.Option>
      </Select>

    <div style={{justifyContent: 'center', display: 'flex'}}>
      <AreaChart
        width={1200}
        height={500}
        data={allValueSensor}
        status={status}
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
    </div>
    </div>

  )
}

// export default FunctionClick
export default Chart

