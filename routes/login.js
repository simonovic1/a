var edge = require('edge');

var authentication = edge.func('./routes/authentication.dll');

module.exports = {
  check: function(username, password) {
  		var passed = authentication({
  			uname: username,
  			pass: password,
  			},true);

  	return passed;
  }
};
