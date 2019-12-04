const CheeToggl = require("./CheeToggl.js")

const cheeToggl = new CheeToggl({
  apiToken: "YOUR API TOKEN",
  datetimeFormat: "YYYY/MM/DD h:mm",
  timeZone: "Asia/Tokyo"
});
const workingPid = 1234; // YOUR WORK PROJECT ID
const breakPid = 5678; // YOUR BREAKING TIME PROJECT ID

(async () => {
  // // Read Recent TimeEntry Example
  // console.log(
  //   await cheeToggl.list({
  //     start: "2019/11/12 20:22",
  //     end: "2019/11/13 21:22",
  //   })
  // )

  // // Add One TimeEntry Example
  // console.log(
  //   await cheeToggl.addOne({
  //     description: "Coding", pid: workingPid, start: "2019/12/12 20:22", stop: "2019/12/12 21:22", billiable: true
  //   })
  // )

  // // Add TimeEntries Example
  // await cheeToggl.add([
  //   { description: "Coding", pid: workingPid, start: "2019/12/12 13:00", stop: "2019/12/12 14:00", billiable: true },
  //   { description: "Lunch", pid: breakPid, start: "2019/12/12 14:00", stop: "2019/12/12 15:00", billiable: false },
  // ])
})();
