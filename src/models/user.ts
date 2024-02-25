import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import KSUID from 'ksuid'

dayjs.extend(utc)

export interface UserData {
  id: string
  firstName: string
  lastName: string
  birthdayAt: number // save in timestamp
  location: location
  createdAt: number
  updatedAt?: number
}

interface location {
  country: string
  state: string
  city: string
  address: string
  timeOffset: number
}

export type UserPayload = Omit<UserData, 'id' | 'createdAt' | 'updatedAt' | 'birthdayAt'> & {
  birthdayDate: Date
}

export default class UserModel {
  async create(data: UserPayload): Promise<UserData> {
    const now = dayjs().valueOf()
    const birthdayAt = dayjs(data.birthdayDate).utcOffset(data.location.timeOffset).valueOf()

    const payload: UserData = {
      id: KSUID.randomSync(now).string,
      createdAt: now,
      birthdayAt,
      ...data
    }

    return payload
  }
}