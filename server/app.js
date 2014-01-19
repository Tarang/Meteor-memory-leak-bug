ActiveSockets = new Meteor.Collection("activesockets");

Meteor.publish("ActiveSockets", function() {
	return ActiveSockets.find();
})

Meteor.publish("testigo", function(d) {
	var self = this;
	console.log("Welcome", this.connection.id);

	this.ready();

	this.connection.onClose(function() {
		console.log("CLosed", self.connection.id);
		ActiveSockets.remove({sid: self.connection.id});
	});
});

LiveDataTestCollectionHooks.push(function(conns) {
	ActiveSockets.remove({});



	conns.forEach(function(socket) {
		ActiveSockets.insert({
			updated: new Date(),
			ua: socket.headers['user-agent'],
			ip: socket.remoteAddress,
			sid: socket._meteorSession.id,
			protocol: socket.protocol
		});
	});
});