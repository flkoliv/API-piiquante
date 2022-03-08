const Sauce = require('../models/Sauce');
const fs = require('fs');

// récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}


// récupération d'une sauce en fonction de son id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}


// Création d'une sauce
exports.createSauce = (req, res, next) => {
    console.log()
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject)
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    console.log(sauce)
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
}


// supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// modifier une sauce
exports.modifySauce = (req, res, next) => {
    let sauceObject = {};
    if (req.file) {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                console.log(filename)
                fs.unlink(`images/${filename}`, () => {
                    sauceObject = {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                        .catch(error => res.status(400).json({ error }));
                });

            })
            .catch(error => res.status(400).json({ error }));
    } else {
        sauceObject = { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }));
    }
}

// donner un avis sur une sauce
exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId
    const like = req.body.like
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            switch (like) {
                case 1: // like
                    if (!sauce.usersLiked.includes(userId)) { //si l'utilisateur n'a pas deja donné un like
                        sauce.likes++;
                        sauce.usersLiked.push(userId)
                    }
                    if (sauce.usersDisliked.includes(userId)) {
                        sauce.dislikes--;
                        let index = sauce.usersDisliked.indexOf(userId)
                        sauce.usersDisliked.splice(index, 1);
                    }

                    break;
                case -1: //dislike

                    if (!sauce.usersDisliked.includes(userId)) { //si l'utilisateur n'a pas deja donné un dislike
                        sauce.dislikes++;
                        sauce.usersDisliked.push(userId)
                    }
                    if (sauce.usersLiked.includes(userId)) {
                        sauce.likes--;
                        let index = sauce.usersLiked.indexOf(userId)
                        sauce.usersLiked.splice(index, 1);
                    }
                    break;
                case 0: // enlever like ou dislike
                    if (sauce.usersLiked.includes(userId)) {
                        sauce.likes--;
                        let index = sauce.usersLiked.indexOf(userId)
                        sauce.usersLiked.splice(index, 1);
                    }

                    if (sauce.usersDisliked.includes(userId)) {
                        sauce.dislikes--;
                        let index = sauce.usersDisliked.indexOf(userId)
                        sauce.usersDisliked.splice(index, 1);
                    }
                    break;
            }
            console.log(sauce)
            Sauce.updateOne({ _id: req.params.id }, sauce)
                .then(() => res.status(200).json({ message: 'Like modifiée !' }))
                .catch(error => res.status(400).json({ error }));
        })

        .catch(error => res.status(400).json({ error }));



}