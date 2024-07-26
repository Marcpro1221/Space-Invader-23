import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.get('/', (req, res)=>{
    res.sendFile('public/index.html');
})

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);  // Log the server is running on the specified port.  // Server is listening on port 3000.  // Server is running on port 3000.  // Server is listening on port 3000.  // Server is running on port 3000.  // Server is listening on port 3000.  // Server is running on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port 3000.  // Server is listening on port
})