describe("Bataille Navale Scénario Nominal", function() {

	it("Lorsque je clique sur New Game alors la page de création d'un nouveau jeu s'ouvre", function() {
		browser.get("http://localhost:8080");
		expect(browser.getLocationAbsUrl()).toEqual('/');
		element(by.linkText("Nouvelle partie")).click();
		expect(browser.getLocationAbsUrl()).toEqual("/new");

		element(by.model("newGame.game.name")).sendKeys("Nom de la partie");
		element(by.model("newGame.game.user1.email")).sendKeys("dendooven.rémi@gmail.com");
		element(by.buttonText("Créer un jeu")).click();
		expect(browser.getLocationAbsUrl()).toEqual("/");
	});

});