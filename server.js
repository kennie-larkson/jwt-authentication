const express = require('express');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
const verifyToken = require('./auth');
const secret = require('./secret');
const app = express();

//express middleware
app.use(express.json());



//ROUTES
app.get('/api',(req,res)=>{

    res.json({
        message: "Welcome to the API"
    });

});

app.post('/api/posts', verifyToken, (req,res)=>{
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            //forbidden
            res.sendStatus(403);
        }else {
            res.json({
                message: "Post created ...",
                authData
            });
        }
    });
});

app.post('/api/login', (req,res)=>{
    //Mock user
    const payload = {
        id: 1,
        name: 'Kennie',
        email: 'kennie@gmail.com'
    };

    //Generates Token from the payload and secret data
    jwt.sign({payload}, secret, { expiresIn: '30s'}, (err, token)=>{
        res.json({
            token
        });
    });
});




app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});