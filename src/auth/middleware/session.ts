import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from 'src/utils/jwt'

interface RequestExtends extends Request {
  user?: string | JwtPayload
}

export const checkJWT = async (
  req: RequestExtends,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jwtByUser = req.headers.authorization || ''
    const jwt = jwtByUser.split(' ').pop() // me toma el jwt
    const isUser = await verifyToken(`${jwt}`)
    if (isUser) {
      req.user = isUser
      next()
    }
  } catch (error) {
    res.status(401)
    res.send('UNAUTORIZED')
  }
}
