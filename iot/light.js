const mqtt = require('mqtt')

const ValueSensor = require("../models/ValueSensor")

const client = mqtt.connect('tcp://13.76.250.158:1883', {
  username: 'BKvm2',
  password: 'Hcmut_CSE_2020'
});

const subcribeLightSensor = () => {
  client.on('connect', function () {
    client.subscribe('Topic/Light');
  })

  client.on("message", function (topic, message) {
    let payload = JSON.parse(message.toString());
    let today = new Date(); 
    let dd = today.getDate(); 
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear(); 
    if (dd < 10) { dd = '0' + dd } 
    if (mm < 10) { mm = '0' + mm } 
    let date = dd + '-' + mm + '-' + yyyy;
    let dateTime = date + " " + new Date().toLocaleTimeString('vi', { hour12: false });
    if (topic == 'Topic/Light') {
      console.log('====== DEVICE LIGHT SENSOR ======');
      console.log(payload);
      console.log('Time', dateTime);
      payload.forEach(item => {
        try {
          let valueSensor = new ValueSensor({
            deviceId: item.device_id,
            value: Number(item.values[0]),
            time: dateTime
          })
          valueSensor.save();
        } catch (error) {
          console.log(error);
        }
      });
    }
  })
}
module.exports = {
  subcribeLightSensor
}
