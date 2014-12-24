Puls4.Routers.Base = Backbone.Router.extend({
	routes : {
		"" : "root",
		"article/:id" : "articleSingle" 
	},
	root : function() {
		console.log('Estamos en el root de nuestra aplicacion');

		window.app.State = "root";
		window.app.article = null;
	},
	articleSingle : function(id) {
		console.log('Estamos en articleSingle');

		window.app.State = "articleSingle";
		window.app.article = id;
	}
});