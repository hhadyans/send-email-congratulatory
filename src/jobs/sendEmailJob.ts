import { CronJob } from 'cron'
import { jobService } from '../services/jobService'
import { getJobSchedule, getTodayTimezone } from '../utils/date'
import { sendEmailUtils } from '../utils/sendEmail'

class SendEmailJob {
  cronJob: CronJob

  constructor() {
    this.cronJob = new CronJob('0 * * * *', async () => {
      try {
        await this.sendEmail()
      } catch (error) {
        console.log(error)
      }
    })

    if (!this.cronJob.running) {
      this.cronJob.start()
    }
  }

  async sendEmail() {
    const pendingJob = await jobService.listPendingToday()
    if (pendingJob && pendingJob.length > 0) {
      pendingJob.forEach(async (item) => {
        const now = getTodayTimezone(item.timezoneOffset)
        const schedule = getJobSchedule(item.timezoneOffset)

        if (now.valueOf() >= schedule && now.format('MM-DD') === item.schedule) {
          const payloadEmail = {
            email: item.email,
            message: item.message
          }
          const response = await sendEmailUtils(payloadEmail)

          if (response && response.status === 'sent') {
            jobService.updateStatus(item._id)
            console.log(response)
          }
        }
      })
    }
  }
}

export const sendEmailJob = new SendEmailJob()