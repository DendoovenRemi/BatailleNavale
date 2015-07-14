"use strict"

angular.module("battleship")
.controller("NewGameController", function(GameService, $location) {
	var newGame = this;

	// Valeurs du select fleetSize
	newGame.ships = GameService.fleetSizeValues;
	var defaut = {
		fleetSize: GameService.fleetSizeValues[0].value
	};

	// Initialisation du game
	newGame.game = angular.copy(defaut);

	// Ajouter une partie dans la base
	newGame.addGame = function(form) {
		if (form.$invalid) return;					// On sort au plus vite si formulaire invalide
		var clone = angular.copy(newGame.game);		// Copie battleship.game dans une nouvelle référence, ici clone
		newGame.game = angular.copy(defaut);
		GameService.addGame(clone).then(function() {	// Quand addGame est terminé on retourne sur la page home
			$location.path("/");
		})
	}
})