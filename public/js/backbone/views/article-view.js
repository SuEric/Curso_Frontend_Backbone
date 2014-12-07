Puls3.Views.Articles = Backbone.View.extend({
	tagName : "article",
	className : "post",
	initialize : function () {
		//debugger;

		this.template = _.template( $('#article-template').html() );
		//this.template = swig.compile( $('#article-template').html() );
	},
	render : function () {
		var data = this.model.toJSON();
		// junto data con el template
		var html = this.template(data);

		this.$el.html(html);
	}
});