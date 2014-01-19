ActiveSockets = new Meteor.Collection("activesockets");

Meteor.subscribe("ActiveSockets");

 Template.hello.greeting = function () {
    return "Welcome to testdcsub.";
  };

  Template.hello.socks = function() {
    return ActiveSockets.find();
  }

  Meteor.startup(function() {
    console.log("GO");
    Meteor.subscribe("testigo", new Date(), function(e) {
      console.log(e, "RESUB", new Date());
    });
  })

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });