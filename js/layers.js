addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Introduction",
            description: "Triple point gain.",
            cost: new Decimal(2),
        },
        12: {
            title: "C, D, and E",
            description: "Point gain boosts itself.",
            cost: new Decimal(6),
            effect() {
                return player.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "F and G",
            description: "Point gain is increased by your prestige points.",
            cost: new Decimal(36),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "The Practice Begins",
            description: "Raises the second upgrade's power to the ^1.7",
            cost: new Decimal(500),
            effect() {
                return player.points.add(2).pow(0.7)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            title: "Prepare for the Best",
            description: "Makes the third upgrade more powerful based on your prestige points.",
            cost: new Decimal(10000),
            effect() {
                return player[this.layer].points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
            title: "First Trial",
            description: "Unlocks a buyable.",
            cost: new Decimal(200000),
        },
        31: {
            title: "You made it!",
            description: "You finished the demo! Prepare for the next layer (which unlocks in the next update)!",
            cost: new Decimal(4000000),
        },
    },
    buyables: {
        11: {
            title: "Your First True Piece",
            cost(){
                let amtl1 = getBuyableAmount("p", 11)
                let exp = amtl1.div(tmp.p.buyables[11].expDiv).plus(1)
                return amtl1.pow(exp).pow10()
            },
            expDiv(){
                let retl1 = new Decimal(20)
                return retl1
            },
            unlocked(){
                return hasUpgrade("p", 23)
            },
            canAfford(){
                return player.points,gte(tmp.p.buyables[11].cost)
            },
            buy(){
                if (!this.canAfford()) return
                let datal1 = player.p
                datal1.buyables[11] = datal1.buyables[11].plus(1)
                datal1.points = datal1.points.sub(tmp.p.buyables[11].cost)
            },
            base(){
                let retll1 = player.points.plus(10).log10()
                return retll1
            },
            effect(){
                return tmp.p.buyables[11].base.pow(player.p.buyables[11])
            },
        },
    },
})
