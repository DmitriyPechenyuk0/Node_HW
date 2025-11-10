import { UserRepositoryContract } from './user.types'
import { client } from '../config/client'

export const UserRepository: UserRepositoryContract = {
    async login(email) {
        try {
            return await client.user.findUnique({where: {
                email: email
            }})
        } catch (error) {
            console.log(error)
        }
    }
}