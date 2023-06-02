import jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

const hashPassword = (password) => {
    return bcrypt.hash(password,5)
}

export const createJWT = (user) => {
    const token = jwt.sign({ 
        id: user.id,
        username: user.username
    },
    process.env.JWT_SECRET 
    )
    return token
}

export const protect = (req,res,next) => {
    const bearer = req.headers.authorization

    if(!bearer){
        res.status(401).send({ 
            message: "Not Authorized"
        })
        return bearer;
    }

    const [ ,token] = bearer.split(' ')

    if(!token){
        res.status(401).send({
            message: 'Not a valid token'
        })
        return
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        console.log(payload)
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({
            message: 'Not a valid token'
        })
    }
}