var test = require('tape');
var lineSaver = require('../lib/save-handlers/lineSaver');
var fakeMongo = require('./fake-mongo-server');
var funnyMocks = require('./mocks/funny-segment-mocks');
// var lineSaver = require('../lib/save-handlers/lineSaver');
var slackRequests = require('./mocks/slack-post-mocks');
var FunnySegment = require('../models/FunnySegments');
var mongoose = require('mongoose');
 
function doBefore(callback) {
	fakeMongo.initialize(funnyMocks);
	fakeMongo.connect(callback);
	
	var segment = new FunnySegment({
		type:"LINE",
		user_name: "saveRequest.user_name",
		user_id: "saveRequest.user_id",
		start: "saveRequest.timestamp",
		end: "numberOfLines"
	});
	segment.save(function(err) {
		if(err) {
			console.log("EREROROER",err)
		}
		else {
			console.log("NOT ERR")
		}
	});

}

function doAfter() {
	fakeMongo.stop();
}

test('save the last 5 lines', function(t) {
	t.plan(1);
	doBefore();
	setTimeout(function () {
    	t.equal(test, true);
    	doAfter();
	}, 2000);
	
	// doBefore(function(){
		// var test = lineSaver.handler(['5'], slackRequests.simpleLineSaveRequest);
		// setTimeout(function () {
  //       	t.equal(test, true);
  //   	}, 2000);
		
	// });

});


