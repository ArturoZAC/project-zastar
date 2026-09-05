import rateLimit from "express-rate-limit";

// General API rate limiter: 100 requests per minute per IP
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter for auth endpoints: 10 requests per minute per IP
export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    message: "Too many auth attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Payment endpoints: 5 requests per minute per IP
export const paymentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    message: "Too many payment attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
