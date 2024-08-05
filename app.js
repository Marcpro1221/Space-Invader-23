import express from 'express';
import pg from 'pg';
import {Server} from 'socket.io';
import { fileURLToPath } from 'url';
import {dirname, join} from 'path';
import path from 'path';
import { createServer } from 'http';

const app = express();
const port = 3000;
var listOfScores = [];
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = createServer(app);
const io = new Server(server);

const clientDB = new pg.Client({
    host: 'localhost',
    port: 5432,
    database: 'SpaceInvader23',
    user: 'postgres',
    password: 'HelloWorld123'
});
clientDB.connect();

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected');

  const sendScoresToClients = async () => {
    try {
      const result = await clientDB.query('SELECT score FROM spaceinvader_highscore ORDER BY score DESC;');
      listOfScores = result.rows;
      socket.emit('updateScores', listOfScores[0].score);
      console.log(listOfScores); 
      console.log(listOfScores[0]); 

    } catch (err) {
      console.error('Error retrieving scores:', err);
    }
  };

  socket.on('totalscores', async (score) => {
    try {
      await clientDB.query('INSERT INTO spaceinvader_highscore(score) VALUES($1)', [score]);
      console.log('New score record added');
      sendScoresToClients(); // Retrieve and send updated scores
    } catch (err) {
      console.error('Error inserting score:', err);
    }
  });

  // Initial send of scores when a client connects
  sendScoresToClients();
});

server.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`); 
});