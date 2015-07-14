describe("Test de HomeController", function() {
	
	beforeEach(function() {
		module("battleship");
	});

	it("HomeController.prepareGame redirige vers /prepare/idGame", inject(function($controller, $location) {
		var homeCtrl = $controller("HomeController");
		var game = { id: 123 };
		homeCtrl.prepareGame(game);
		expect($location.path()).toEqual("/prepare/" + game.id);
	}));
});