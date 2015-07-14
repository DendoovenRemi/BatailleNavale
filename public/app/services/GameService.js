"use strict"

angular.module("battleship")
.factory("GameService", function($http) {
	var apiUrl = "http://localhost:3030/games";
	return {
		pseudo: "Dendooven",

		// Les valeurs possibles pour le nombre de bateaux
		fleetSizeValues: [
			{label: "1 bateau", value: 1}, 
			{label: "2 bateaux", value: 2}, 
			{label: "3 bateaux", value: 3}, 
			{label: "4 bateaux", value: 4}, 
			{label: "5 bateaux", value: 5}
		],

		// Service qui récupère les games
		getGames: function() {
			return $http.get(apiUrl)
			.then(
				function(response) {
					return response.data;
				})
			.then(
				function (games) {	// Filtre les games sans deuxieme joueur et les games auxquelles on participe
                    return games.filter(
                    	function (game) {
                        	return !game.user2 || (game.user1.pseudo === this.pseudo || game.user2.pseudo === this.pseudo)
                    }.bind(this))
                }.bind(this))
		},

		getGameById: function(id) {
			return $http.get(apiUrl + "/" + id)
				.then(
					function(response) {
						return response.data;
				})
		},

		// Service qui ajoute une game
		addGame: function(game) {
			game.user1.pseudo = this.pseudo;
			return $http.post(apiUrl, game);
		},

		joinGame: function(game) {
			game.user2 = {
				pseudo: this.pseudo
			}
			return $http.put(apiUrl + "/" + game.id, game);
		}
	}
})