import { Post, Route, Body } from 'tsoa'
import UserModel, { UserPayload } from '../models/user'

const userModel = new UserModel()

@Route("User")
class UserController {
  @Post('/')
  async store(
    @Body() data: UserPayload
  ) {
    const result = await userModel.create(data)
    return {
      data: result
    }
  }
}

export default UserController