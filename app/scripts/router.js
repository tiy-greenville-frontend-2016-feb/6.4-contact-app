/**
 * Contact App Router
 */

// 3rd Party
var $ = require('jquery');
var Backbone = require('backbone');

// Local
var views = require('./view/contact');
var ContactsCollection = require('./models/contact');


var Router = Backbone.Router.extend({
  routes: {
    "/":                     "index",
    "help":                 "help",    // #help
    "search/:query":        "search",  // #search/kiwis
    "search/:query(/p:page)": "search",   // #search/kiwis/p7
    "user/:id/contacts":    "loadUserContacts",  // #user/10/contacts
    "user/:id/contacts/:id":    "loadUserContact"  // #user/10/contacts/5
  },
  help: function(){
    console.log('Calling 911...');
  },
  search: function(query, page) {
    console.log("query: ", query);
    console.log("page: ", page);
  },
  loadUserContacts: function(id){
    console.log("contact list for user: ", id);
  },
  loadUserContact: function(userId, contactId){
    console.log("a contact for user: ", userId);
    console.log("a contact for user: ", contactId);
  },
  index: function(){
    console.log("Index: Hello, Goodbye");
    this.navigate("help", {trigger: true});
  },
  initialize: function(){
    var contacts = new ContactsCollection();
    var contactForm = new views.ContactFormView({collection: contacts});
    var contactList = new views.ContactListView({collection: contacts});

    $('#app')
      .html(contactForm.render().el)
      .append(contactList.render().el);
  }
});

module.exports = new Router();
