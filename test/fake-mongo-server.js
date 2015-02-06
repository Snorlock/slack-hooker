var mongoose = require('mongoose')
  , mongodbFs = require('mongodb-fs');

exports.initialize = function (mockCollections) {
	var config = {
	 	port: 27030,
	 	mocks: {
	 		fakedb:	mockCollections
	 	},
	 	fork: true
	 }
	 mongodbFs.init(config);
};

exports.attachModel = function(model) {
	return mongoose.connection.model(model);
}

exports.connect = function (connectedCallback) {
	mongodbFs.start(function() {
		mongoose.connect('mongodb://localhost:27030/fakedb', function(err) {
			if(err) {
				console.log(err);
			}
			else {
				connectedCallback();
			}
		});	
	})
}

exports.find = function(model, callback) {
	var Model;
	Model = mongoose.connection.model(model);
	Model.find(function(err, model){
		if(err) {
			console.log(err);
		}
		else {
			console.log(model);
			callback();
		}
	});
}

exports.stop = function() {
	mongoose.disconnect(function(err){
		mongodbFs.stop(function(err){
			console.log('bye');
		})
	})
}

