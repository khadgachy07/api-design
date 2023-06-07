import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createUser = async(req,res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password),
            email: req.body.email
        }
        
    })
    const token = createJWT(user)
    res.json({token : token})
}

export const signinUser = async(req,res) => {
    const user = await prisma.user.findUnique({
        where: {
            username : req.body.username,
            email: req.body.email
        }
    })

    if(!user) {
        res.status(401).json({message: 'User not found'})
        return
    }{

        const isValid = await comparePasswords(req.body.password, user.password)

        if(!isValid) {
            res.status(401).json({message: 'Wrong password'})
            return
        }
        
        const token = createJWT(user)
        res.json({token : token})
    }
}