import express from 'express';
import userRoutes from './routes/userRoutes.ts';
import quizRoutes from './routes/quizRoutes.ts';
import flashcardRoutes from './routes/flashcardRoutes.ts';
import collectionRoutes from './routes/collectionRoutes.ts';
import ratingRoutes from './routes/ratingRoutes.ts';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', flashcardRoutes);
app.use('/api', quizRoutes);
app.use('/api', collectionRoutes);
app.use('/api', ratingRoutes);

app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop via localhost 3000/.');
});
