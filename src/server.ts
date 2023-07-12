import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createUser, signinUser } from './handlers/user';


 const app = express();
 app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 /**
 * Route to greet the user.
 */
app.get('/', (req, res,next) => {
  try {
    res.status(200).send({ message: 'hello' });
  } catch (err) {
    next(err);
  }
});
 /**
 * Route to handle user authentication.
 */
app.use('/api', protect, router);
 /**
 * Route to create a new user.
 */
app.post('/user', createUser);
 /**
 * Route to sign in a user.
 */
app.post('/signin', signinUser);
 /**
 * Error handling middleware.
 */
app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid Input' });
  } else {
    res.status(500).json({ message: 'Unexpected error' });
  }
});
 export default app;