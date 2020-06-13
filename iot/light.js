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

  client.on("message", function (topic, payload) {
    var payload = JSON.parse(payload.toString());
    if (topic == 'Topic/Light') {
      console.log('====== DEVICE LIGHT SENSOR ======');
      console.log(payload);
      payload.forEach(item => {
        let valueSensor = new ValueSensor({
          deviceId: item.device_id,
          value: Number(item.values[0])
        })
        valueSensor.save();
      });
    } 
    client.end()
  })
}
module.exports = {
  subcribeLightSensor
}
