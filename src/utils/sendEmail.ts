import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

export const sendEmailUtils = async (payload: any) => {
  const mailHost = process.env.MAIL_HOST
  if (!mailHost) {
    throw 'Missing Mail Host.'
  }
  const url = `${mailHost}/send-email`
  return await axios({
      method: 'POST',
      url,
      data: payload
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}