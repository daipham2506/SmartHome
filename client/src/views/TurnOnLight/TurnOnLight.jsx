import React from 'react'

import { Slider, Switch, Card, Button } from 'antd';

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
const TurnOnLight = () => {
  return (
    <div>
      <Card title="Range value for turn on" extra={<Button> Save</Button>}>
        <Slider
          range
          min={0}
          max={1023}
          step={1}
          marks={marks}
          defaultValue={[0, 400]}
          tooltipVisible
        />
      </Card>
      <Card title="Range value for turn off" extra={<Button> Save</Button>} style={{ marginTop: 10 }}>
        <Slider
          range
          min={0}
          max={1023}
          step={1}
          marks={marks}
          defaultValue={[400, 1000]}
          tooltipVisible
        />
      </Card>
      <div style={{marginTop:30}}>
        <span style={{fontWeight:700, fontSize:18}}>Auto Turn On/Off the light: </span>
        <Switch style={{marginLeft: 10}}/>
      </div>

    </div>
  )
}

export default TurnOnLight
