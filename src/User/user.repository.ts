import { UserRepositoryContract } from './user.types'
import { client } from '../config/client'

export const UserRepository: UserRepositoryContract = {
    async login(email, password) {
        try {
            return await client.user.findUnique({where: {
                email: email,
                password: password
            }})
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async register(body) {
        try {
            const {email, password, firstName, secondName, avatar} = body

            let isRegistered = !!(await client.user.findUnique({where: {
                email: email
            }}))
            if (!isRegistered){
                const user = await client.user.create({
                    data: {
                        firstName: firstName,
                        secondName: secondName,
                        email: email,
                        avatar: avatar,
                        password: password
                    },
                })
                return user.id
            } else{
                return 'Same user already registered'
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async me(userId) {
        try {
            return await client.user.findUnique({
                where: {
                    id: userId
                }, 
                omit: {
                    password: true
                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}