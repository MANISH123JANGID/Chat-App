const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const http= require('http').Server(app);
const io= require('socket.io')(http); 
const port=process.env.PORT || 3000;
mongoose.connect('mongodb+srv://user:987654321@cluster0.qsbdg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(err)=>{
    console.log("CONNECTED TO DATABASE SUCCESSFULLY",err);
})

let message= mongoose.model('message',{
    name:'string',
    message:'string'
})

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/messages',(req,res) => {
    message.find({},(err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', async (req, res) => {
    try{
        let Message = await new message(req.body);
        let mesaa= await Message.save()
        console.log('message saved', mesaa);
        let censored= await  message.findOne({message:'badword'})
        if(censored){
        console.log('CENSORED WORD FOUND!')
        await message.deleteOne({_id:censored.id})
        }
        else 
        io.emit('message', req.body)
        res.sendStatus(200);

    }
    catch(error){
        res.sendStatus(500);
        console.log(error);
    }
})



io.on('connection',(socket) =>{
    console.log("A NEW USER CONNECTED");
})

const server= http.listen(port,()=>{
    console.log('SERVER IS RUNNING ON PORT', server.address().port);
})