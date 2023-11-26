const express=require('express');
const mongoose=require('mongoose');
const BrandName=require('./model');

const env=require('dotenv').config()

const app=express();//initializing express after requiring

const port=process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())//middleware or body parse

// mongoose.connect(process.env.URL)
// // mongoose.connect('mongodb://localhost:27017/Ribka')
// .then(()=>console.log('db connected'))
// .catch(err=>console.log('error', err))


const connectDB = async () =>{
    try{
        const conn=await mongoose.connect(process.env.URL);
        console.log(`MongoDB Connected `);
    } catch(error){
        console.log(error);
    }
}
connectDB();

app.get('/',(req,res)=>{
    res.send('<h1>Hello World!</h1>')
})
app.post('/addbrands', async(req,res)=>{
    const {brandname}=req.body;
    try{
        const newData=new BrandName({brandname});
        await newData.save();
        const Bd=await BrandName.find()
        return res.json(Bd)
    }
    catch(err){
        console.log(err.message);
    }
})
app.get('/home',(req,res)=>{
    res.send('hello home')
})
app.get('/getallbrands',async(req,res)=>{
    try{
        const allData=await BrandName.find();
        return res.json(allData);
    }
    catch(err){
        console.log(err.message);
    }
})
app.get('/getallbrands/:id',async(req,res)=>{
    try{
        const Data=await BrandName.findById(req.params.id);
        return res.json(Data);
    }
    catch(err){
        console.log(err.message);
    } 
})
app.delete('/deletebrand/:id', async(req,res)=>{
    try{
        await BrandName.findByIdAndDelete(req.params.id);
        return res.json(await BrandName.find())
    }
    catch(err){
        console.log(err.message);
    } 
})

app.listen(port, ()=>{
    console.log('server is runing on port 3000')
})
