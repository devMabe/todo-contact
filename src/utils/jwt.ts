import { sign, verify } from 'jsonwebtoken'
import { UserModel } from '../users/models/user.model'
import 'dotenv'
import { tokenData } from 'src/users/models/auth.model'
const JWT_SECRET = process.env.JWT_SECRET || 'defualt0101'

const generateToken = async (user: tokenData) => {
  const jwt = sign(user, JWT_SECRET, { expiresIn: '1h' })
  return jwt
}

const verifyToken = async (jwt: string) => {
  const isUser = verify(jwt, JWT_SECRET)
  return isUser
}

export { generateToken, verifyToken }
