import express from 'express';
import pg from 'pg';
const app = express();
const port = 3000;
var listOfScores = [];

const clientDB = new pg.Client({
    host: 'localhost',
    port: 5432,
    database: 'SpaceInvader23',
    user: 'postgres',
    password: 'HelloWorld123'
});
clientDB.connect();
clientDB.query('SELECT score FROM spaceinvader_highscore ORDER BY score DESC;', (err, res)=>{
    if(err){
        console.error('Error executing query', err.stack);
    }else{
        listOfScores = res.rows;
        console.log(listOfScores);
    }
});

app.use(express.static('public'));
app.get('/', (req, res)=>{
    res.sendFile('public/index.html');
})
app.post('/', (req,res)=>{
    console.log(listOfScores);
});
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);  // Log the server is running on the specified port.  // Server is listening on port 3000.  // Server is running on port 3000.  // Server is listening on port 3000.  // Server is running on port 3000.  // Server is listening on port 3000.  // Server is running on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port
})