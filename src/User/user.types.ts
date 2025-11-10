import { Request, Response } from "express";
import { Prisma, User } from "../generated/prisma";

// export type User = Prisma.UserGetPayload<{}>;

export interface UserControllerContract {
    login: (req: Request<object, string, {email: string, password: string}>, res: Response<string>) => void
}


export interface UserRepositoryContract {
    login: (email: string) => Promise<User | undefined>;
}
export interface UserServiceContract {
    login: (email: string) => Promise<User | undefined>;
}
// Request<P, ResBody, ReqBody, ReqQuery, Locals>
// P - динамічний параметри (req.params)
// ResBody - відповідь контроллера, те, що робимо у res.json
// ReqBody - тіло запиту (при POST/PATCH) в req.body
// ReqQuery - query параметри запиту, те, що в req.body
// Locals поки не чіпаємо

// Response<ResBody, Locals>
// ResBody - відповідь контроллера, те, що робимо у res.json
// Locals поки не чіпаємо