import React, { useState, useEffect } from 'react';

import callApi from "../../utils/callApi";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Chart = () => {
  const [allValueSensor, setAllValueSensor] = useState(null)
  const [status, setStatus] = useState(1)
  const [inte, setInte] = useState(null)
  console.log(status)
  useEffect(() => {
    callApi('/api/sensor/newest').then(res => {
      const new_data = res.data.filter((item, idx) => {
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
    const id = setInterval(() => {
      callApi('/api/sensor/newest').then(res => {
        const new_data = res.data.filter((item, idx) => {
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
    }, 15000)
    return () => {
      clearInterval(id)
    }
  }, [status])

  const handleChangeStatus = (e) => {
    setStatus(parseInt(e.target.value))
  };

  return (
    <div>
      <select value={status} onChange={handleChangeStatus}>
        <option value={1}>1 hour ago</option>
        <option value={2}>6 hour ago</option>
        <option value={3}>1 day ago</option>
        <option value={4}>15 day ago</option>
        <option value={5}>month ago</option>
      </select>

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

  )
}

// export default FunctionClick
export default Chart

