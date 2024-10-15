import { Body, Controller, ParseIntPipe, ValidationPipe, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')  // this will handle the user route /users
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get() 
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
      return this.userService.findAll(role);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.userService.create(user)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate: UpdateUserDto)
    {
        return this.userService.update(id, userUpdate)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
    /* 

    GET /users
    GEt /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

    // @Get()  // GET  /users or  /users?role=value
    // findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    //     return []
    // }

    // @Get('interns')
    // findAllInterns() {
    //     return []
    // }

    // @Get(':id')  // GET  /users/:id
    // findOne(@Param('id') id:string) {
    //     return {id}
    // }

    // @Post()  // POST  /users
    // create(@Body() user:{})
    // {
    //     return user
    // }

    // @Patch(':id')  // PATCH  /users/:id
    // update(@Param('id') id:string, @Body() userUpdate:{}) {
    //     return {id , ...userUpdate}
    // }

    // @Delete(':id')  // GET  /users/:id
    // delete(@Param('id') id:string) {
    //     return { id }
    // }
}
