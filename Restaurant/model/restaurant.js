const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    chef_id: {type: mongoose.Schema.Types.ObjectId, ref: 'chef'},
    recette_id: {type: mongoose.Schema.Types.ObjectId, ref: 'recette'},
    nom: String
});

const RestaurantModel = mongoose.model("restaurant",RestaurantSchema);
module.exports = RestaurantModel