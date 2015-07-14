"use strict"

angular.module("battleship")
.controller("HomeController", function(GameService, $location) {
	var home = this;

	// Récupérer les game sur le serveur
	home.fetchGames = function() {
		GameService.getGames()
			.then(function(games) {
				home.games = games;
			})
	}

	home.joinGame = function(game) {
		GameService.joinGame(game);
	}

	home.prepareGame = function(game) {
		$location.path("/prepare/" + game.id);
	}

	home.fetchGames();
})