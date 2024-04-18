const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3002;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const RecetteModel = require('./model/recette');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Recette')
.then(()=>{
    console.log("data base is connected");
}).catch((err)=>{
    console.log('error')
});

app.get('/', (req, res)=>{
    RecetteModel.find({})
    .then(recette=>res.json(recette))
    .catch(e=>res.status(400).json({"message": e}));
});

app.post('/add', (req, res)=>{
    RecetteModel.create({
        libelle: req.body.libelle
    })
    .then(recette=>res.json(recette))
    .catch(e=>res.status(400).json({"message": e}));
});

app.put('/update/:id', (req, res)=>{
    RecetteModel.findByIdAndUpdate({_id:req.params.id}, {
        libelle: req.body.libelle
    })
    .then(recette=>res.json(recette))
    .catch(e=>res.status(400).json({"message": e}));
});

app.delete('/delete/:id', (req, res)=>{
    RecetteModel.findByIdAndDelete(req.params.id)
    .then(recette=>res.json(recette))
    .catch(e=>res.status(400).json({"message": e}));
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})