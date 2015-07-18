# Webpack Basis
___

Implémentation simple de webpack avec:

* `DevServer + HotReload`
* `Babel`
* `Sass`
* `CommonsChunkPlugin`
* `ExtractTextPlugin`

Le `CommonsChunkPlugin` est utilisé pour la gestion des modules communs.  
L'extraction des styles dans un fichier externe est faite par `ExtractTextPlugin`.  
Les fichiers sont servis en cache par `webpack-dev-server` à l'addresse : [localhost:8080](http://localhost:8080)  
On peu trouver une version du site avec le debugging du server `webpack-dev-server` à l'addresse : [localhost:8080/webpack-dev-server](http://localhost:8080/webpack-dev-server).  

Le build est simple, sans *post-process/uglify/minify/concat …*  

### Installation :

`npm install`

### Dev :

`npm start`

### Build : 

`npm run build`