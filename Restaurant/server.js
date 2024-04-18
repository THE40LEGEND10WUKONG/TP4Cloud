const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3003;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const RestaurantModel = require('./model/restaurant');
const ChefModel = require('../Chef/model/chef');
const RecetteModel = require('../Recette/model/recette');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Restaurant')
.then(()=>{
    console.log("data base is connected");
}).catch((err)=>{
    console.log('error')
});

app.get('/all', (req, res)=>{
    RestaurantModel.find({})
    .then(restaurants=>res.json(restaurants))
    .catch(err => console.log(err));
});

app.get('/chefs/:id', (req, res)=>{
    const Restaurant = RestaurantModel.findOne({_id:req.params.id});

    ChefModel.find({_id: Restaurant.chef_id})
    .then(chefs=>res.json(chefs))
    .catch(err => console.log(err));
});

app.get('/recettes/:id', (req, res)=>{
    const Restaurant = RestaurantModel.findOne({_id:req.params.id});

    RecetteModel.find({_id: Restaurant.recette_id})
    .then(recettes=>res.json(recettes))
    .catch(err => console.log(err));
});

app.post('/add', (req, res)=>{
    RestaurantModel.create({
        chef_id: req.body.chef,
        recette_id: req.body.recette,
        nom: req.body.nom
    })
    .then(restaurant=>res.json(restaurant))
    .catch(err => console.log(err));
});

app.put('/update/:id', (req, res)=>{
    RestaurantModel.findByIdAndUpdate({_id:req.params.id}, {
        chef_id: req.body.chef,
        recette_id: req.body.recette,
        nom: req.body.nom
    })
    .then(restaurant=>res.json(restaurant))
    .catch(err => console.log(err));
});

app.delete('/delete/:id', (req, res)=>{
    RestaurantModel.findByIdAndDelete(req.params.id)
    .then(restaurant=>res.json(restaurant))
    .catch(err => console.log(err));
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})