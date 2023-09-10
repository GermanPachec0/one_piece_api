import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://localhost:5173',
  'https://one-piece-api-jamo-dev.fl0.io',
  'https://one-piece-reader.vercel.app',
  'one-piece-reader-k8euw2jhc-germanpachec0.vercel.app',
  'https://one-piece-reader-k8euw2jhc-germanpachec0.vercel.app',
  'https://one-piece-reader.vercel.app/'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})