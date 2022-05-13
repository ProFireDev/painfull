let config = require('../../../../config.json');
const errorAPI = require('../errorapi.js').api
let clsData
const fs = require("fs")
let clsActive = true // Used by the error api to know if localization should be used. If the CLS is in a disabled state it will need to communicate to the user anyway.

// init runs when the bot starts
function init() { 
	// checking for the localization file
	if (fs.existsSync(`${__dirname}/locals.json`)) {
		clsData = JSON.parse(fs.readFileSync(`${__dirname}/locals.json`).toString())
	} else {
		clsActive = false
		errorAPI.error("Localization data not found, your Painfull installation appears to be corrupt.") // It should be included in the framework, if its not then something is wrong.
		setTimeout(() => {
			console.error("Localization data not found. Cannot continue in corrupt state, exiting....")
			process.exit(1)
		}, 1000)
	}
}

function getString(moduleName, stringKey) { 
	/*
		This function will be exposed as an api to the other modules for localization via util.apis["core-cls"].api.getString()
		It takes in the name of the module (used to find the right modules strings) and the key of the string to get.
		It will use the selected bot-wide language.
	*/
    if (!clsActive) return false
    if (clsData.locals[moduleName][clsData.config.lang][stringKey]) {
        return clsData.locals[moduleName][clsData.config.lang][stringKey]
    } else if (clsData.locals[moduleName]["en"][stringKey]) {
        return clsData.locals[moduleName]["en"][stringKey]
    } else {
        return stringKey
    } // generated by copilot lol
}
module.exports = {
	api: {getString},
	init
}