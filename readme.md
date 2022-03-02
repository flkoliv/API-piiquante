# Piiquante : Projet 6 du parcours Dev Web Openclassrooms

## Construisez une API sécurisée pour une application d'avis gastronomiques

Conception d'une API pour le site HOT TAKES qui est une "galerie de sauces" permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, le but étant donc de mettre en place une API qui correspond aux spécifications fournis dans le cahier des charges.

![desktop hot takes](Capture.png)


## Cahier des charges

* [Dépôt du frontend](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6)
* [Spécifications techniques](https://github.com/flkoliv/API-piiquante/blob/master/Requirements_DW_P6.pdf)

## Installation
Tout d'abord clonez le repository de l'API dans un dossier backend, puis faire de même pour le repository frontend dont le lien est fourni ci dessus dans un dossier frontend.

pour lancer le frontend mettez vous dans le dossier et suivez les instructions données dans le repository en question.

Dans le dossier backend, créez un fichierr .env contenant l'url de connexion à la base mongoDB du type : 

> `MONGO="mongodb+srv://identifiant:password@piiquante.i1xze.mongodb.net/piiquante?retryWrites=true&w=majority"`

pour lancer le backend naviguez jusqu'au répertoire puis ouvrir un terminal et exécutez la commande :

> `npm install`


Cela installe les dépendences.

Pour démarrer l'API exécuter la commande suivante :

> `node server`

## Outils et languages pour la réalisation du projet
NodeJS et MongoDB