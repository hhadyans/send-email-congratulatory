import dayjs from "dayjs";
import { JobData, JobModel, JobPayload, JobStatus } from "../models/jobModel";
import KSUID from "ksuid";
import { getMonthDate } from "../utils/date";
import { UserData } from "../models/userModel";

export function convertToJobPayload(data: UserData): JobPayload {
  const birthdayMessage = () => {
    return `Hey, ${data.firstName} ${data.lastName} it's your birthday`
  }

  return {
    email: data.email,
    schedule: getMonthDate(data.birthdayDate),
    timezoneOffset: data.location.timezoneOffset,
    message: birthdayMessage()
  }
}

class JobService {
  async create(userId: string, data: JobPayload) {
    const now = dayjs().valueOf()
    const payload: JobData = {
      _id: KSUID.randomSync(now).string,
      userId,
      createdAt: now,
      status: JobStatus.PENDING,
      ...data
    }

    try {
      await JobModel.create(payload)
    } catch (error) {
      throw error
    }
  }

  async listPendingToday(): Promise<JobData[] | undefined> {
    try {
      const data = await JobModel.find({
        status: JobStatus.PENDING,
        schedule: dayjs().format('MM-DD')
      })
      if (!data) {
        return undefined
      }
      return data
    } catch (error) {
      throw error
    }
  }

  async updateStatus(id: string) {
    const now = dayjs().valueOf()
    const payload: Partial<JobData> = {
      status: JobStatus.SUCCESS,
      updatedAt: now
    }

    try {
      await JobModel.findByIdAndUpdate(id, payload)
    } catch (error) {
      throw error
    }
  }

  async update(userId: string, data: JobPayload) {
    const now = dayjs().valueOf()
    const payload: Partial<JobData> = {
      email: data.email,
      schedule: data.schedule,
      timezoneOffset: data.timezoneOffset,
      updatedAt: now
    }

    try {
      const job = await JobModel.find({ userId })
      if (job) {
        await JobModel.updateOne({ userId }, { payload })
      } else {
        await this.create(userId, data)
      }
    } catch (error) {
      throw error
    }
  }

  async delete(userId: string) {
    try {
      await JobModel.deleteOne({ userId })
    } catch (error) {
      throw error
    }
  }
}

export const jobService = new JobService