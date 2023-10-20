import 'dotenv/config'
export const JWT_SECRET = <string>process.env.JWT_SECRET.replace(/\\n/g, '\n')
