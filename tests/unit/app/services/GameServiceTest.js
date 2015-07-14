describe("Test du GameService", function() {

	beforeEach(function() {
		module("battleship");
	});

	it("Le pseudo doit être Gardon", inject(function(GameService) {
		expect(GameService.pseudo).toEqual("Gardon");
	}));

	it("Le service GameService.getGameById(1) renvoie un objet Game", inject(function(GameService, $httpBackend) {
		var idGame = 1;
		var gameSimule = {id: 1, name: "Game 1"};

		$httpBackend.when("GET", "http://localhost:3030/games/" + idGame).respond(gameSimule);

		var gamePromesse = GameService.getGameById(idGame);

		gamePromesse.then(function(game) {
			expect(game.id).toEqual(1);
			expect(game.name).toEqual("Game 1");
		})

		$httpBackend.flush();
	}));

	it("Le service GameService.getGames() renvoie une liste de Game", inject(function(GameService, $httpBackend) {
		var gameListSimule = [
			{id: 1, name: "Game 1", user1: {pseudo: "Gardon"}},
			{id: 2, name: "Game 2"}
		];

		$httpBackend.when("GET", "http://localhost:3030/games").respond(gameListSimule);

		var gamesPromesse = GameService.getGames();

		gamesPromesse.then(function(games) {
			expect(games[0].id).toEqual(1);
			expect(games[0].name).toEqual("Game 1");
			expect(games[1].id).toEqual(2);
			expect(games[1].name).toEqual("Game 2");
		})

		$httpBackend.flush();
	}));
});