const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// CORS
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use('/api', limiter);

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
// app.use('/api/v1/jobs', require('./routes/jobs'));
// app.use('/api/v1/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const errorHandler = require('./middlewares/error');

// ... (other imports)

// Routes
// app.use('/api/v1/auth', require('./routes/auth'));
// app.use('/api/v1/jobs', require('./routes/jobs'));
// app.use('/api/v1/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(errorHandler);

module.exports = app;
