const axios = require("axios")
const moment = require('moment-timezone');

module.exports = class CheeToggl {
  constructor({ apiToken, datetimeFormat, timeZone }) {
    this.axiosClient = axios.create({
      baseURL: 'https://www.toggl.com/api/v8/',
      auth: {
        username: apiToken,
        password: 'api_token'
      }
    });

    this.datetimeFormat = datetimeFormat;

    this.moment = moment.tz.setDefault(timeZone);
  }

  getFormattedDatetime(datetimeString) {
    return moment(datetimeString, this.datetimeFormat).toISOString()
  }

  getDuration(startDatetimeString, endDatetimeString) {
    return moment
      .duration(moment(endDatetimeString, this.datetimeFormat)
      .diff(moment(startDatetimeString, this.datetimeFormat)))
      .asSeconds();
  }

  async list({ start, end }) {
    try {
        const { data } = await this.axiosClient({
        method: 'get',
        url: '/time_entries',
        params: {
          start_date: this.getFormattedDatetime(start),
          end_date: this.getFormattedDatetime(end)
        }
      })
      return data
    } catch(err) {
      console.error(err.response)
    }
  }


  async addOne(timeEntry, waitTime = 1000) {
    await new Promise((resolve, reject) => setTimeout(() => resolve(), waitTime))
    const tmpTimeEntry = timeEntry;
    tmpTimeEntry.start = this.getFormattedDatetime(timeEntry.start)
    tmpTimeEntry.stop = this.getFormattedDatetime(timeEntry.stop)
    tmpTimeEntry.duration = this.getDuration(timeEntry.start, timeEntry.stop)

    try {
      const { data } = await this.axiosClient({
        method: 'post',
        url: '/time_entries',
        data: {
          time_entry: {
            ...tmpTimeEntry,
            created_with: "application"
          }
        }
      })
      return data
    } catch (err) {
      console.error(err.response)
    }
  }

  async add(timeEntriesList) {
    const promises = timeEntriesList.map((timeEntity) => this.addOne(timeEntity))
    promises.reduce((m, p) => m.then(p), Promise.resolve());
  }
}
