const mqtt = require('mqtt');

const SENSOR = 'Topic/Light';

const publishLightSensor = () => {

  var client = mqtt.connect('tcp://13.76.250.158:1883', {
    username: "BKvm2",
    password: "Hcmut_CSE_2020"
  });

  client.subscribe(SENSOR);

  client.on("message", (topic, message) => {
    console.log(topic);
    console.log(message.toString());
  });

  client.on('connect', () => {

    setInterval(() => {
      let h = new Date().getHours();
      let val;
      let val1;
      if ((h >= 0 && h <= 6) || (h >= 18 && h <= 24)) {
        val = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
        val1 = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
      }
      else if (h >= 11 && h <= 14) {
        val = Math.floor(Math.random() * (1023 - 700 + 1)) + 700;
        val1 = Math.floor(Math.random() * (1023 - 700 + 1)) + 700;
      }
      else {
        val = Math.floor(Math.random() * (700 - 200 + 1)) + 200;
        val1 = Math.floor(Math.random() * (700 - 200 + 1)) + 200;
      }
      client.publish(SENSOR,`[{ "device_id": "Light","values": ["${val.toString()}"]},{ "device_id": "Light1","values": ["${val1.toString()}"]}]`);
    }, 60000);
  });

}

module.exports = {
  publishLightSensor
}