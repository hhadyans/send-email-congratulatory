import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { UserData, UserModel, UserPayload } from "../models/userModel"
import { Types } from "mongoose"
import KSUID from "ksuid"
import { convertToJobPayload, jobService } from "./jobService"
import { JobPayload } from "../models/jobModel"
import { formatDate } from "../utils/date"

dayjs.extend(utc)

class UserService {
  async create(data: UserPayload): Promise<UserData> {
    const now = dayjs().valueOf()
    const birthdayDate = formatDate(data.birthdayDate)
    
    const payload: UserData = {
      _id: KSUID.randomSync(now).string,
      createdAt: now,
      birthdayDate,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      location: data.location
    }

    try {
      const store = await UserModel.create(payload)
      if (!store) {
        throw 'Error while saving data!'
      }

      await this.createBirthdayEmailJob(payload, store._id)
      const result = await this.get(store._id)

      return result
    } catch (error) {
      throw error
    }
  }

  async get(id: string | Types.ObjectId): Promise<UserData> {
    try {
      const data = await UserModel.findById(id)
  
      if (!data) {
        throw 'Data not found!'
      }
  
      return data
    } catch (error) {
      throw error
    }
  }

  async list(): Promise<any> {
    try {
      const data = await UserModel.find({})
      if (!data) {
        throw 'Data not found!'
      }
      return data
    } catch (error) {
      throw error
    }
  }

  async update(id: string, payload: UserPayload): Promise<UserData> {
    try {
      const now = dayjs().valueOf()
      const existData = await this.get(id)
      const birthdayDate = payload.birthdayDate
        ? formatDate(payload.birthdayDate)
        : existData.birthdayDate
      
      const data: UserData = {
        createdAt: existData.createdAt,
        birthdayDate,
        firstName: payload.firstName ?? existData.firstName,
        lastName: payload.lastName ?? existData.lastName,
        email: payload.email ?? existData.email,
        location: payload.location ?? existData.location,
        updatedAt: now
      }

      const update = await UserModel.findByIdAndUpdate(id, data, { new: true })
      if (!update) {
        throw 'Error while updating data!'
      }
      await this.updateBirthdayEmailJob(data, id)
      return update
    } catch (error) {
      throw error
    }
  }

  async delete(id: string) {
    try {
      const data = await UserModel.findByIdAndDelete(id)

      if (data && data._id) {
        await jobService.delete(id)
        return 'Successfully delete data.'
      }
      return 'No data being deleted.'
    } catch (error) {
      throw error
    }
  }

  async createBirthdayEmailJob(data: UserData, userId: string) {
    const payload: JobPayload = convertToJobPayload(data)

    await jobService.create(userId, payload)
  }

  async updateBirthdayEmailJob(data: UserData, userId: string) {
    const payload: JobPayload = convertToJobPayload(data)

    await jobService.update(userId, payload)
  }
}

export const userService = new UserService