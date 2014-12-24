Puls4.Views.Articles = Backbone.View.extend({
	events : {
		"click .acciones .votos .up" : "upVote",
		"click .acciones .votos .down" : "downVote",
		"click" : "navigate"
	},

	tagName : "article",
	className : "post",

	initialize : function() {
		var self = this;

		this.model.on('change', function() {
			if(window.app.State == "articleSingle") self.extendedRender();
			else self.render();
		});

		window.routers.base.on('route:root', function() {
			self.$el.css('display', '');
			self.render();
		});

		window.routers.base.on('route:articleSingle', function() {
			if(window.app.article == self.model.get('id')) {
				// muestra version extendida
				self.extendedRender();
			} else {
				self.$el.hide();
			}
		});

		this.template = _.template( $('#article-template').html() );
		//this.template = swig.compile( $('#article-template').html() );
		this.extendedTemplate = _.template( $('#article-extended-template').html() );
		//this.template = swig.compile( $('#article-extended-template').html() );
	},

	navigate : function() {
		Backbone.history.navigate('/article/' + this.model.get('id'), {trigger:true});
	},

	upVote : function(e) {
		e.preventDefault();
		e.stopPropagation();

		var votes = parseInt(this.model.get('votes'), 10);

		this.model.set('votes', ++votes);
		this.model.save();
	},

	downVote : function(e) {
		e.preventDefault();
		e.stopPropagation();

		var votes = parseInt(this.model.get('votes'), 10);

		this.model.set('votes', --votes);
		this.model.save();
	},

	extendedRender : function() {
		var data = this.model.toJSON();

		var html = this.extendedTemplate(data);

		this.$el.html(html);
	},

	render : function() {
		var data = this.model.toJSON();
		// junto data con el template
		var html = this.template(data);

		this.$el.html(html);
	}
});