const Sauce = require('../models/Sauce');
const fs = require('fs');


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

exports.createSauce = (req, res, next) => {
    console.log()
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject)
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0

    });
    console.log(sauce)
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
}

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
                        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                });

            })
            .catch();//erreur à mettre
    } else {
        sauceObject = { ...req.body };
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
            .catch(error => res.status(400).json({ error }));
    }
}


exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId
    const like = req.body.like
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            console.log(sauce)
            switch (like) {
                case 1:
                    if (!sauce.userLiked.includes(userId)) {
                        console.log("like");
                        sauce.likes++;
                        sauce.userLiked.push(userId)
                    }
                    if (sauce.userDisliked.includes(userId)) {
                        sauce.dislikes--;
                        let index = sauce.userDisliked.indexOf(userId)
                        sauce.userDisliked.splice(index, 1);
                    }

                    break;
                case -1:
                    
                    if (!sauce.userDisliked.includes(userId)) {
                        sauce.dislikes++;
                        sauce.userDisliked.push(userId)
                    }
                    if (sauce.userLiked.includes(userId)) {
                        sauce.likes--;
                        let index = sauce.userLiked.indexOf(userId)
                        sauce.userLiked.splice(index, 1);
                    }
                    break;
                case 0:
                    if (sauce.userLiked.includes(userId)) {
                        sauce.likes--;
                        let index = sauce.userLiked.indexOf(userId)
                        sauce.userLiked.splice(index, 1);
                    }

                    if (sauce.userDisliked.includes(userId)) {
                        sauce.dislikes--;
                        let index = sauce.userDisliked.indexOf(userId)
                        sauce.userDisliked.splice(index, 1);
                    }
                    break;
            }
            console.log(sauce)
            Sauce.updateOne({ _id: req.params.id }, sauce)
                .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                .catch(error => res.status(400).json({ error }));
        })

        .catch();



}