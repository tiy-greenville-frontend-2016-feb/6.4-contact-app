/**
 * Contact Views
 */

// 3rd Party
var $ = require('jquery');
var Backbone = require('backbone');

// Local
var formTemplate = require('../../templates/form.hbs');
var contactTemplate = require('../../templates/contact.hbs');

// Utility
$.fn.serializeObject = function() {
  return this.serializeArray().reduce(function(acum, i) {
    acum[i.name] = i.value;
    return acum;
  }, {});
};


var ContactFormView = Backbone.View.extend({
  tagName: "form",
  template: formTemplate,
  events: {
    "submit": "addContact"
  },
  addContact: function(e){
    e.preventDefault();
    var formData = this.$el.serializeObject();
    this.collection.add(formData);

    // Clearing input fields on form
    this.render();
  },
  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var ContactListView = Backbone.View.extend({
  tagName: "ul",
  initialize: function(){
    this.listenTo(this.collection, "add", this.renderChild);
  },
  renderChild: function(contact){
    var view = new ContactItemView({model: contact});
    this.$el.append(view.render().el);
  },
  render: function(){
    return this;
  }
});

var ContactItemView = Backbone.View.extend({
  tagName: "li",
  template: contactTemplate,
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

module.exports = {
  'ContactFormView': ContactFormView,
  'ContactListView': ContactListView,
  'ContactItemView': ContactItemView
}
