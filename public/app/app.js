"use strict"

angular.module("battleship", ["ngRoute"])
.value("version", "1.0")

.config(function($routeProvider) {
	$routeProvider
		// Route home, HomeController as home
		.when("/", {
			templateUrl: "views/home.html",
			controller: "HomeController",
			controllerAs: "home"
		})

		// Route new, NewGameController as newGame
		.when("/new", {
			templateUrl: "views/new.html",
			controller: "NewGameController",
			controllerAs: "newGame"
		})

		// Route prepare
		.when("/prepare/:id", {
			templateUrl: "views/prepare.html",
			controller: "PrepareGameController",
			controllerAs: "prepareGame"
		})

		.otherwise({
			redirectTo: "/"
		});
})