# Projet HRnet

## Description

**Faites passer une librairie jQuery vers React.**

Quatorzième projet de la formation Développeur d'application Front-End développé avec React et Vite.js

L'objectif de ce projet était de convertir une application (JQuery) de gestion RH en application 100% React.
Il a également été demandé de créer un plugin pour remplacer les quatre plugins JQuery suivants

- Plugin de sélection de date
- Plugin de fenêtre modale - jQuery.modal.js
- Menus déroulants
- Plugin pour les tables de données
  et de le publier sur npm.

## Obectifs et outils

### Objectifs du projet:

- Analyser la performance d'une application web
- Déployer une application front-end
- Refondre une application pour réduire la dette technique
- Mettre en place son environnement Front-End

### Outils:

- react
- react router
- react-hook-form
- redux
- redux toolKit
- react-redux
- redux-persist
- vite
- vitest
- nanoid (une bibliothèque JavaScript légère et rapide pour générer des identifiants uniques)
- date-fns (une bibliothèque JavaScript légère pour la manipulation et le formatage des dates)

## Initialisation du projet

- Cloner le dépot - (https://github.com/hajernaas/P14_HRnet.git).
- Installer les dépendances

```
npm install

```

- Lancer le Front-end

```
 npm run dev

```

- La persistance des données est géré par Redux et le local storage.

## Lancer un build et le visualiser

```
npm run build
npm run preview

```

## Tests

```
npm run test
npm run coverage

```

## Différentes librairies ont été utilisé dans la nouvelle application:

### Le plugin pour les tables de données à été choisit pour être hébergé sur npm:

`datatable-component-library`

Disponible ici:
[NPM] (https://www.npmjs.com/package/datatable-component-library)
[Github](https://github.com/hajernaas/DataTables_component_library.git)

### React-datepicker

Sélection de date (format calendrier)
[NPM](https://www.npmjs.com/package/react-datepicker), [Documentation](https://reactdatepicker.com/),

#### React-select

Liste déroulante
[NPM](https://www.npmjs.com/package/react-select), [Documentation](https://react-select.com/home)
