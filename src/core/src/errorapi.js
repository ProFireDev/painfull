var config = require('../../../config.json');
var client = require('../../index').client;
function error (error) {
    let bootDMs = [];
    bootDMs.push(`The bot ran into an error, \n\`\`\`${error}\`\`\``);
    bootDMs.forEach(dm => {
		config.owners.forEach(owner => {
			client.users.fetch(owner).then(user => {
				user.send(dm);
			})
		})
	});
}
module.exports = {
    api: {error}
}