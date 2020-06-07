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


app.post('/api/login', async (_req,res)=>{//err is prefixed with an under score because it was declared but not used
    try {
        //Mock user
    const payload = {
        id: 1,
        name: 'Kennie',
        email: 'kennie@gmail.com'
    };

    //Generates Token from the payload and secret data
    jwt.sign({ payload }, secret, { expiresIn: '60s'}, (_err, token)=>{//err is prefixed with an under score because it was declared but not used
        res.json({
            token
        });
    });
        
    } catch (err) {
        console.error(err.message);
    }
});



app.post('/api/posts', verifyToken, async (req,res)=>{
    try {
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
    } catch (err) {
        console.error(err.message);
    }
});




app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});