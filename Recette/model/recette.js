const mongoose = require('mongoose');

const RecetteSchema = new mongoose.Schema({
    libelle: String
});

const RecetteModel = mongoose.model('recette', RecetteSchema);
module.exports = RecetteModel