const mqtt = require('mqtt')

const ValueSensor = require("../models/ValueSensor")
const Device = require("../models/Device")
const Setting = require("../models/Setting")
const Control = require("../models/Control")

// const client = mqtt.connect('tcp://13.76.250.158:1883', {
//   username: 'BKvm2',
//   password: 'Hcmut_CSE_2020'
// });
const client = mqtt.connect('mqtt://52.240.52.68:1883');

const SENSOR = 'Topic/Light';
const LIGHT = 'Topic/LightD';
const SPEAKER = 'Topic/Speaker';

const subcribeDevices = () => {
  client.on('connect', function () {
    client.subscribe(SENSOR);
    client.subscribe(LIGHT);
    client.subscribe(SPEAKER);
  })

  client.on("message", async (topic, message) => {
    try {
      let payload = JSON.parse(message.toString());
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) { dd = '0' + dd }
      if (mm < 10) { mm = '0' + mm }
      let date = dd + '-' + mm + '-' + yyyy;
      let dateTime = date + " " + new Date().toLocaleTimeString('vi', { hour12: false });
      if (topic == SENSOR) {
        console.log('============ DEVICE LIGHT SENSOR ============');
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

            Device.findOne({ _id: item.device_id, type: 'sensor' }).then(res => {
              res.value = Number(item.values[0]);
              res.save();
            })
          } catch (error) {
            console.log(error);
          }
          // handle auto for light based on value of light sensor
          Setting.findOne().sort({ _id: -1 }).then(res => {
            let lastVal = res.value;
            Device.findOne({ _id: item.device_id }, function (err, res) {
              if (res) {
                Device.find({ roomId: res.roomId, type: 'light' }, function (err, res) {
                  var valueDevices = [];
                  res.forEach(device => {
                    var value = 0;
                    var isTurnOn = false;
                    if (Number(item.values[0]) <= lastVal) {
                      var value = 255 - Math.round(item.values[0] / 4);
                      var isTurnOn = true;
                    }
                    // update current value for device
                    device.value = value;
                    device.save();

                    control = new Control({
                      user: null,
                      deviceId: device._id,
                      value,
                      isTurnOn,
                      time: dateTime
                    })
                    control.save();

                    valueDevices.push({
                      device_id: device._id,
                      values: ["1", value.toString()]
                    });
                  });
                  client.publish(LIGHT, JSON.stringify(valueDevices));
                })
              }
            })
          })
        });
      } else if (topic == LIGHT) {
        console.log('============ DEVICE LIGHT ============');
        console.log(payload);
        console.log('Time', dateTime);
      } else if(topic == SPEAKER) {
        console.log('============ DEVICE SPEAKER ============');
        console.log(payload);
        console.log('Time', dateTime);
      }
    } catch (error) {
      console.log(error)
    }
  })
}
module.exports = {
  subcribeDevices
}
