import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", role: "ADMIN" },
        { id: 2, name: "Bob Smith", email: "bob.smith@example.com", role: "INTERN" },
        { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Manager" },
        { id: 4, name: "David Williams", email: "david.williams@example.com", role: "INTERN" },
        { id: 5, name: "Eva Martinez", email: "eva.martinez@example.com", role: "Admin" },
        { id: 6, name: "Frank Moore", email: "frank.moore@example.com", role: "User" }
    ]
    

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN' ) {
        if(role) 
        {
            const rolesArray =  this.users.filter(user => user.role === role)

            if(!rolesArray.length) throw new NotFoundException(' User role not found')
            
            return rolesArray
        }

        return this.users
    }

    findOne(id: number)  {
        const user = this.users.find(user => user.id === id);

        if(!user) throw new NotFoundException(' User Not Found')
        return user
    }

    create(user: CreateUserDto)
    {
        const usersByHeighestId = [...this.users].sort((a,b) => b.id - a.id);
        const newUser = {
            id: usersByHeighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number , updatedUser: UpdateUserDto)
    {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user , ...updatedUser}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id!==id)

        return removedUser
    }
}
