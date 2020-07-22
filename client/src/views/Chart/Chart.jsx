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
        if (status === 1) {
          return idx % 3 === 0
        } else if (status === 2) {
          return idx % 10 === 0
        } else {
          return idx % 30 === 0
        }
      })
      setAllValueSensor(new_data);
    })
    const id = setInterval(() => {
      callApi('/api/sensor/newest').then(res => {
        const new_data = res.data.filter((item, idx) => {
          if (status === 1) {
            return idx % 3 === 0
          } else if (status === 2) {
            return idx % 10 === 0
          } else {
            return idx % 30 === 0
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
        <option value={1}>Hour</option>
        <option value={2}>Day</option>
        <option value={3}>Month</option>
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

