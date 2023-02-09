import { sign, verify } from 'jsonwebtoken'
import 'dotenv/config'
import { tokenData } from 'src/auth/models/auth.model'

const JWT_SECRET = process.env.JWT_SECRET || 'sarasa'

const generateToken = async (user: tokenData) => {
  const jwt = sign(user, JWT_SECRET, { expiresIn: '1h' })
  return jwt
}

const verifyToken = async (jwt: string) => {
  const isUser = verify(jwt, JWT_SECRET)
  return isUser
}

export { generateToken, verifyToken }
