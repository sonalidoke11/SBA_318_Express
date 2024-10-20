import express from 'express';
//import bodyParser from 'body-parser';
import morgan from 'morgan';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';

const app = express();
//const PORT = 4004

// Using Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');


// Middleware
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
app.use(express.static('public'));

// Routes
app.get('/', (req,res) =>{
  res.render('layout')
})

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


const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
