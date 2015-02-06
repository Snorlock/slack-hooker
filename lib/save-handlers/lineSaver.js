var FunnySegment = require('../../models/FunnySegments');

exports.handler = function (args, saveRequest) {
	console.log("saving by lines", args);
	console.log("LENGHT ", args.length);
	if(args.length == 1) {
		saveLastLines(args[0], saveRequest, function(err) {
			console.log("CALLLLBAAAACK");
			if(err) {
				return err;
			}
			else {
				return true;
			}
		});
	}		
}


function saveLastLines(numberOfLines, saveRequest, callback) {
	var segment = new FunnySegment({
		type:"LINE",
		user_name: saveRequest.user_name,
		user_id: saveRequest.user_id,
		start: saveRequest.timestamp,
		end: numberOfLines
	});

	console.log(segment);

	segment.save(function(err) {
		console.log("ERRRRROR", err);
		if (err) {
			callback(err);
		}
	});
}
