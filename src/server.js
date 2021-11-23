import express,{ json } from 'express';
import cors from 'cors';
import db from './database/index.js';
import Company from './models/Company.js';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/create',async(req,res) => {

  const {
    cnpj,
    name,
    corporate_name,
    primary_activity,
    address
  } = req.body

  const data = {
    cnpj,
    name,
    corporate_name,
    primary_activity,
    street:address.street,
    number:address.number,
    complement:address.complement,
    zip_code:address.zip_code,
    neighborhood:address.neighborhood,
    city:address.city,
    state:address.state
  }
  

  
  Company.find({cnpj:data.cnpj}, function (err, value) {
    if (value.length){
     
       return res.status(400).json({msg:'Cnpj já existe'})
       
    }
  });


  try {

    await Company.create(data)
    return res.status(201).send();

  } catch (error) {
    res.status(200).json({error:error})
  }

});

app.get('/list',async(req,res) => {
  
  try {
    const companies = await Company.find();
    res.status(200).json(companies)

  } catch (error) {
    res.status(200).json({error:error})
  }
});

app.get('/show',(req,res) => {
  const { cnpj } = req.query
  
  const response = axios.get(`http://www.receitaws.com.br/v1/cnpj/${cnpj}`).then(function(response){
      res.status(200).json(response.data)
 
    }).catch(function(error){
    if(error){
        console.log(error)
    }
    })

});

app.get('/company/location',(req,res) => {
  const { address } = req.query
  

  const response = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBFu1W3qS2to-w_kLlAjby-0AAR7FSaMxA`).then(function(response){
      res.status(200).json(response.data)
 
    }).catch(function(error){
    if(error){
        console.log(error)
    }
    })

});

app.listen('3333');