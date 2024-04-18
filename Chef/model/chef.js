const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
    nom: String,
    specialite: String
});

const ChefModel = mongoose.model('chef', ChefSchema);
module.exports = ChefModel