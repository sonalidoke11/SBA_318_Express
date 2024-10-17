import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

const app = express();

// Using Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Static files
app.use(express.static('public'));

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Custom middleware for logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
