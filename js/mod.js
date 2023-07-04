let modInfo = {
	name: "Niftyj971's Tree (Demo ver.)",
	id: "demofile",
	author: "Niftyj971",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.0B",
	// 0.2 onwards is adding the second regular layer of the game,
	// 1.0 is the addition of the third regular layer,
	// 2.0 is the addition of the fourth (and so far last) regular layer,
	// and 3.0-4.0 is the addition of the ChorDilation challenge and its unique layers.
	name: "20 minute tutorial",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.6a</h3><br>
		- Added the first layer of the game.<br>
		- Added 6 upgrades.<br>
		- Added a buyable.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this demo! \n Soon, a new layer will unlock, and your journew will truly start...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.times(1)
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
	if (hasUpgrade('p', 21)) gain = gain.times(upgradeEffect('p', 21))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e201922000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}