"use strict"

angular.module("battleship")
.controller("PrepareGameController", function(GameService, $routeParams) {
	var prepareGame = this;
	var currentBoat = {		// Les données du bateau en train d'être placé
		id: 1,
		positions: []
	};

	prepareGame.fleetSize = 0;		// Taille de la flotte 
	prepareGame.battlefield = [];	// Champ de bataille
	prepareGame.fleet = [];			// Flotte qui est une liste de bateaux

	GameService.getGameById($routeParams.id)
		.then(function(game) {
			prepareGame.game = game;
			prepareGame.fleetSize = prepareGame.game.fleetSize;		// On récupère la taille de la flotte 
			prepareGame.rows = new Array(game.battlefieldSize.height);	// On récupère la hauteur de la grille
			prepareGame.cols = new Array(game.battlefieldSize.width);	// On récupère la largeur de la grille

			for (var i=0; i<game.battlefieldSize.height; i++) {		// Création du tableau
				prepareGame.battlefield[i] = [];
				for (var j=0; j<game.battlefieldSize.width; j++) {
					prepareGame.battlefield[i][j] = 0;
				}
			}
	})

	prepareGame.gameReady = function() {
		return (prepareGame.fleet.length === prepareGame.fleetSize);	// Vérifie si tous les bateaux ont été placés
	}

	prepareGame.save = function() {
		console.log("Ici on sauvegarde");
	}
	
	prepareGame.setCase = function(x, y) {
		if (currentBoat.positions.length === 0 && prepareGame.fleet.length < prepareGame.fleetSize && prepareGame.battlefield[x][y] === 0) {	// Si la taille du bateau est à 0 et qu'on a pas atteint le nombre de bateau requis
			prepareGame.battlefield[x][y] = currentBoat.id;	// On met l'id du bateau dans la case
			currentBoat.positions.push([x, y]);	// On met les coords dans la liste de position du bateau
			return;
		}
		if (currentBoat.positions.length === 1 && prepareGame.fleet.length < prepareGame.fleetSize && prepareGame.battlefield[x][y] === 0) {	// Si la taille du bateau est à 1 et qu'on a pas atteint le nombre de bateau requis
			var x0 = currentBoat.positions[0][0];
			var y0 = currentBoat.positions[0][1];
			if (((x === x0-1 || x === x0+1) && y === y0) || ((y === y0-1 || y === y0+1) && x === x0)) {		// On vérifie que la case cliquée est bien à coté de la case du bateau
				prepareGame.battlefield[x][y] = currentBoat.id;	// On met l'id du bateau dans la case
				currentBoat.positions.push([x, y]);				// On ajoute la case cliquée dans les positions du bateau
				prepareGame.fleet.push(currentBoat);			// On ajoute currentboat à la fleet
				currentBoat.id = currentBoat.id + 1;			// On incrémente l'id
				currentBoat.positions = [];						// On reset les positions
				return;
			}
		}
	}
	
})