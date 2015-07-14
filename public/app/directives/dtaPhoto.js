"use strict"

angular.module("battleship")
.directive("dtaPhoto", function() {
	return {
		restrict: "E",
		template: "ici bientôt une photo",
		link: function(scope, element, attrs) {		// Fonction liée à la directive
			element.css("border-style", "solid");
			element.css("display", "inline-block");
			element.css("color", attrs.couleur || "yellow");
			scope.$watch("borderWidth", function() {		// A chaque changement de borderWidth on change la bordure
				element.css("border-width", scope.borderWidth + "px");
			})
		}
	}
})