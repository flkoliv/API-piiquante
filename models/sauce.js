const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageURL: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number }, 
    dislikes: { type: Number },
    userLiked: { type: Array },
    userDisliked: { type: Array },
});


module.exports = mongoose.model('Sauce', sauceSchema);