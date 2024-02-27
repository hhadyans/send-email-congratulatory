import { Post, Route, Body, Delete, Path, Put, Get } from 'tsoa'
import { UserPayload } from '../models/userModel'
import { userService } from '../services/userService'

@Route("user")
class UserController {
  @Post('/')
  async store(
    @Body() data: UserPayload
  ) {
    const result = await userService.create(data)
    return {
      data: result
    }
  }

  @Put('/:id')
  async update(
    @Path() id: string,
    @Body() data: UserPayload
  ) {
    const result = await userService.update(id, data)
    return {
      data: result
    }
  }

  @Get('/:id')
  async get(
    @Path() id: string
  ) {
    const result = await userService.get(id)
    return {
      data: result
    }
  }

  @Get('/')
  async list() {
    const result = await userService.list()
    return {
      data: result
    }
  }

  @Delete('/:id')
  async delete(
    @Path() id: string
  ) {
    const result = await userService.delete(id)
    return {
      data: result
    }
  }
}

export default UserController