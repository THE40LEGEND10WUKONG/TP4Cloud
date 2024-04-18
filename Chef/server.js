const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3001;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const ChefModel = require('./model/chef');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Chef')
.then(()=>{
    console.log("data base is connected");
}).catch((err)=>{
    console.log('error')
});

app.get('/', (req, res)=>{
    ChefModel.find({})
    .then(chef=>res.json(chef))
    .catch(e=>res.status(400).json({"message": e}));
});

app.post('/add', (req, res)=>{
    ChefModel.create({
        nom: req.body.nom,
        specialite: req.body.specialite
    })
    .then(chef=>res.json(chef))
    .catch(e=>res.status(400).json({"message": e}));
});

app.put('/update/:id', (req, res)=>{
    ChefModel.findByIdAndUpdate({_id:req.params.id}, {
        nom: req.body.nom,
        specialite: req.body.specialite
    })
    .then(chef=>res.json(chef))
    .catch(e=>res.status(400).json({"message": e}));
});

app.delete('/delete/:id', (req, res)=>{
    ChefModel.findByIdAndDelete(req.params.id)
    .then(chef=>res.json(chef))
    .catch(e=>res.status(400).json({"message": e}));
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})