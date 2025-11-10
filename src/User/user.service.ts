import { UserServiceContract } from './user.types'
import { UserRepository } from './user.repository'

export const userService: UserServiceContract = {
    async login(email){
        return UserRepository.login(email)
    }
}