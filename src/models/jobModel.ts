import { Schema, model } from 'mongoose'

export interface JobData {
  _id: string
  userId: string
  email: string
  schedule: string
  timezoneOffset: number
  message: string
  status: JobStatus
  createdAt: number
  updatedAt?: number
}

export type JobPayload = Omit<JobData, '_id' | 'userId' | 'createdAt' | 'updatedAt' | 'status'>

export enum JobStatus {
  SUCCESS = 'success',
  PENDING = 'pending'
}

const jobSchema = new Schema<JobData>({
  _id: String,
  userId: String,
  email: String,
  timezoneOffset: Number,
  schedule: String,
  message: String,
  status: String,
  createdAt: Number,
  updatedAt: Number
})

export const JobModel = model<JobData>('Job', jobSchema)