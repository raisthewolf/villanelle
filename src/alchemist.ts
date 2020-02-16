/* /// <reference path="scripting.ts"/> */
import {
    addAgent, addPersonalityAgent, setAgentVariable, addItem, addLocation, setVariable, getNextLocation, action,
    getRandNumber, getVariable, sequence, selector, execute, Precondition, getAgentVariable, neg_guard, guard,
    isVariableNotSet, displayDescriptionAction, addUserAction, addUserInteractionTree, initialize,
    getUserInteractionObject, executeUserAction, worldTick, attachTreeToAgent, setItemVariable, getItemVariable,
    displayActionEffectText, areAdjacent, addUserActionTree
} from "./scripting";
import {isUndefined} from "typescript-collections/dist/lib/util";

// 1. Define State
// locations
var TOM_HOUSE = "TOM_HOUSE";
var ALCH_HOUSE = "ALCH_HOUSE";
var WOODS = "WOODS";


addLocation(TOM_HOUSE, [WOODS, ALCH_HOUSE]);
addLocation(ALCH_HOUSE, [WOODS, TOM_HOUSE]);
addLocation(WOODS, [TOM_HOUSE, ALCH_HOUSE]);

// agents
var tom = addPersonalityAgent("tom", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

// items
var herbs = addItem("herbs");
var potion = addItem("potion");
var coin = addItem("coin");
var formula = addItem("formula");
var poison = addItem("poison");
setItemVariable(herbs, "currentLocation", WOODS);
setItemVariable(coin, "currentLocation", "tom");
setItemVariable(potion, "currentLocation", "none");
setItemVariable(formula, "currentLocation", ALCH_HOUSE);
setItemVariable(poison, "currentLocation", ALCH_HOUSE);

// variables
//alien
setAgentVariable(tom, "currentLocation", TOM_HOUSE);
//player
var playerLocation = setVariable("playerLocation", ALCH_HOUSE);
var playerSleep = setVariable("playerSleep", false);
var playerPoisonTicks = setVariable("playerPoisonTicks", 0);
var knowHerbs = setVariable("knowHerbs", false);
var offer = setVariable("offer", false);
var cured = setVariable("cure", false);

// 2. Define BTs
// movement actions
let goToTOMS = action(() => true, () => {
    setAgentVariable(tom, "currentLocation", TOM_HOUSE);
    console.log("Tom is at: " + getAgentVariable(tom, "currentLocation"))
}, 0);
let goToALCH = action(() => true, () => {
    setAgentVariable(tom, "currentLocation", ALCH_HOUSE);
    console.log("Tom is at: " + getAgentVariable(tom, "currentLocation"))
}, 0);
let goToWOODS = action(() => true, () => {
    setAgentVariable(tom, "currentLocation", WOODS);
    console.log("Tom is at: " + getAgentVariable(tom, "currentLocation"))
}, 0);


//other actions
//wait
let wait = action(
    () => true,
    () => {
        console.log("Tom waits for this turn.")
    },
    0
);

//tell the alchemist about the herbs
let tellAlchAboutHerbs = action(
    () => getAgentVariable(tom, "currentLocation") == getVariable("playerLocation") && !getVariable("playerSleep") && !getVariable("knowHerbs"),
    () => {
        setVariable("knowHerbs", true);
        console.log("Tom tells you where you can find herbs to make a healing potion.")
    },
    0
);

//gather the herbs
let gatherHerbs = action(
    () => getAgentVariable(tom, "currentLocation") == WOODS && getItemVariable(herbs, "currentLocation") == WOODS,
    () => {
        setItemVariable(herbs, "currentLocation", "tom");
        console.log("Tom gathers the herbs in the woods.")
    },
    0
);

//give alchemist the herbs
let giveAlchHerbs = action(
    () => getAgentVariable(tom, "currentLocation") == getVariable("playerLocation") && !getVariable("playerSleep") && getItemVariable(herbs, "currLocation", "tom"),
    () => {
        setItemVariable(herbs, "currLocation", "player");
        console.log("Tom gives you herbs to make a healing potion.")
    },
    0
);

//steal formula
let stealFormula = action(
    () => getAgentVariable(tom, "currentLocation") == ALCH_HOUSE && (getVariable("playerLocation") != ALCH_HOUSE || getVariable("playerSleep")) && getItemVariable(formula, "currLocation", ALCH_HOUSE),
    () => {
        setItemVariable(formula, "currLocation", "tom");
        console.log("Tom steals the formula for the healing potion.")
    },
    0
);

//steal poison
let stealPoison = action(
    () => getAgentVariable(tom, "currentLocation") == ALCH_HOUSE && (getVariable("playerLocation") != ALCH_HOUSE || getVariable("playerSleep")) && getItemVariable(poison, "currLocation", ALCH_HOUSE),
    () => {
        setItemVariable(poison, "currLocation", "tom");
        console.log("Tom steals poison.")
    },
    0
);

//poison alchemist
let poisonAlch = action(
    () => getAgentVariable(tom, "currentLocation") == getVariable("playerLocation") && getItemVariable(poison, "currLocation", "tom"),
    () => {
        setItemVariable(poison, "currLocation", "none");
        setVariable("playerSleep", true);
        setVariable("playerPoisonTicks", 5);
        console.log("Tom poisons you.")
    },
    0
);

//make potion
let makePotion = action(
    () => getItemVariable(formula, "currLocation", "tom") && getItemVariable(herbs, "currLocation", "tom"),
    () => {
        setItemVariable(herbs, "currLocation", "none");
        setItemVariable(potion, "currLocation", "tom");
        console.log("Tom makes the potion.")
    },
    0
);

//stealPotion
let stealPotion = action(
    () => getAgentVariable(tom, "currentLocation") == getVariable("playerLocation") && getVariable("playerSleep") && getItemVariable(potion, "currLocation", "player"),
    () => {
        setItemVariable(potion, "currLocation", "tom");
        console.log("Tom steals the potion.")
    },
    0
);

//make offer
let makeOffer = action(
    () => getAgentVariable(tom, "currentLocation") == getVariable("playerLocation") && !getVariable("playerSleep") && getItemVariable(potion, "currLocation", "player") && getItemVariable(coin, "currLocation", "tom"),
    () => {
        setVariable(offer, true);
        console.log("Tom offers to buy the potion.")
    },
    0
);

//take potion
let takePotion = action(
    () => getItemVariable(potion, "currLocation", "tom"),
    () => {
        setVariable(cure, true);
        setItemVariable(potion, "currLocation", "none");
        console.log("Tom takes the potion and is cured.")
    },
    0
);

// description wrappers
// coming soon

// create behavior trees
let tryStealFormula = selector([
    stealFormula,
    sequence([
        poisonAlch, stealFormula,
    ])
]);

let tryStealPotion = selector([
    stealPotion,
    sequence([
        poisonAlch, stealPotion,
    ])
]);

let stealCraft = sequence([
  goToWOODS,
  gatherHerbs,
  goToALCH,
  tellAlchAboutHerbs,
  stealPoison,
  wait,
  poisonAlch,
  tryStealFormula,
  makePotion,
  takePotion
]);

let stealAlch = sequence([
  goToALCH,
  tellAlchAboutHerbs,
  stealPoison,
  wait,
  wait,
  poisonAlch,
  tryStealPotion,
  takePotion
]);

let purchase = sequence([
  goToALCH,
  tellAlchAboutHerbs,
  wait,
  wait,
  wait,
  makeOffer,
  takePotion
]);

let purchaseGather = sequence([
  goToWOODS,
  gatherHerbs,
  goToALCH,
  giveAlchHerbs,
  makeOffer,
  takePotion
]);

let tomBT = selector([
  purchaseGather,
  purchase,
  stealAlch,
  stealCraft
]);

//attach behaviour trees to agents
attachTreeToAgent(tom, tomBT);

// 3. Construct story
// create user actions

var moveWOODSBT = guard(() => getVariable(playerLocation) != WOODS && !getVariable(playerSleep),
    sequence([
            //displayDescriptionAction("You enter the docking station."),
            addUserAction("Go to the woods.", () => setVariable(playerLocation, WOODS)),
            addUserAction("Do nothing.", () => {})
        ]
    ));
addUserInteractionTree(moveWOODSBT);
var moveALCHBT = guard(() => getVariable(playerLocation) != ALCH_HOUSE && !getVariable(playerSleep),
    sequence([
            //displayDescriptionAction("You enter the docking station."),
            addUserAction("Go home.", () => setVariable(playerLocation, ALCH_HOUSE)),
            addUserAction("Do nothing.", () => {})
        ]
    ));
addUserInteractionTree(moveALCHBT);
//gather herbs
var gatherHerbsBT = guard(() => getVariable(playerLocation) == getItemVariable(herbs, "currentLocation") && !getVariable(playerSleep) && getVariable(knowHerbs),
    sequence([
            //displayDescriptionAction("You enter the docking station."),
            addUserAction("Gather the herbs.", () => setItemVariable(herbs, "currentLocation", "player"))
        ]
    ));
addUserInteractionTree(gatherHerbsBT);
//make Potion
var makePotionBT = guard(() => getVariable(playerLocation) == ALCH_HOUSE && getItemVariable(herbs, "currentLocation") == "player" && !getVariable(playerSleep),
    sequence([
            //displayDescriptionAction("You enter the docking station."),
            addUserAction("Make the potion.", () => {setItemVariable(herbs, "currentLocation", "none"); setItemVariable(potion, "currentLocation", "player")})
        ]
    ));
addUserInteractionTree(makePotionBT);
//accept offer
var acceptOfferBT = guard(() => getVariable(playerLocation) == getAgentVariable(tom, "currentLocation") && getItemVariable(potion, "currentLocation") == "player" && !getVariable(playerSleep) && getVariable(offer),
    sequence([
            //displayDescriptionAction("You enter the docking station."),
            addUserAction("Sell the potion to Tom.", () => {setItemVariable(coin, "currentLocation", "player"); setItemVariable(potion, "currentLocation", "tom")})
        ]
    ));
addUserInteractionTree(makePotionBT);
//go to go to sleep
var sleepBT = guard(() => !getVariable(playerSleep),
    sequence([
            //displayDescriptionAction("You enter the docking station."),
            addUserAction("Go to sleep.", () => setVariable(playerSleep, true)),
        ]
    ));
addUserInteractionTree(sleepBT);
//wake up
var wakeBT = guard(() => getVariable(playerPoisonTicks) == 0 && getVariable(playerSleep),
    sequence([
            //displayDescriptionAction("You enter the docking station."),
            addUserAction("Wake up.", () => setVariable(playerSleep, false)),
            addUserAction("Do nothing.", () => {})
        ]
    ));
addUserInteractionTree(wakeBT);
//be poisoned
var wakeBT = guard(() => getVariable(playerPoisonTicks) > 0,
    sequence([
            displayDescriptionAction("You are poisoned."),
            addUserAction("Do nothing.", () => {setVariable(playerPoisonTicks, getVariable(playerPoisonTicks)-1)})
        ]
    ));
addUserInteractionTree(wakeBT);
var gameOver = guard(() => getVariable(cure),
    displayDescriptionAction("Tom is cured!"));
addUserInteractionTree(gameOver);

//4. Run the world
initialize();
var userInteractionObject = getUserInteractionObject();

//RENDERING-----
var displayPanel = {x: 500, y: 0};
var textPanel = {x: 500, y: 350};
var actionsPanel = {x: 520, y: 425};

var canvas = <HTMLCanvasElement> document.getElementById('display');
var context = canvas.getContext('2d');

var spaceshipImage = new Image();
spaceshipImage.onload = render;
//var playerImage = new Image();
//var alienImage = new Image();

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 300);
    // displayPlayer();
    // displayAlien();
    displayTextAndActions();
}

// var mapPositions = {
//     "START": {x: 230, y: 235},
//     "BC_CORRIDOR": {x: 240, y: 210},
//     "BR_CORRIDOR": {x: 300, y: 190},
//     "MR_CORRIDOR": {x: 305, y: 150},
//     "QUARTERS2": {x: 340, y: 155},
//     "QUARTERS1": {x: 340, y: 190},
//     "TR_CORRIDOR": {x: 300, y: 100},
//     "TC_CORRIDOR": {x: 230, y: 100},
//     "TL_CORRIDOR": {x: 170, y: 100},
//     "EXIT_ELEVATOR": {x: 230, y: 60},
//     "LAB": {x: 240, y: 170},
//     "ML_CORRIDOR": {x: 160, y: 150},
//     "BL_CORRIDOR": {x: 160, y: 200},
//     "ENGINES": {x: 170, y: 60},
//     "COCKPIT": {x: 120, y: 60},
//     "COMMS": {x: 120, y: 100},
//     "MEDICAL": {x: 250, y: 130},
//     "STORAGE": {x: 200, y: 150}
// };
//
// function displayPlayer() {
//     var currLocation = getVariable(playerLocation);
//     if (!isUndefined(mapPositions[currLocation]))
//         context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 16, 16);
// }
//
// function displayAlien() {
//     var currLocation = getAgentVariable(alien, "currentLocation");
//     context.drawImage(alienImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 24, 24);
// }
//
 spaceshipImage.src = "../images/isolation_map.png";
// playerImage.src = "../images/player2.png";
// alienImage.src = "../images/xenomorph.png";

var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 50;

function displayTextAndActions() {
    context.clearRect(textPanel.x, textPanel.y, 500, 1000);
    yOffset = actionsPanel.y + 25;

    context.font = "15pt Calibri";
    context.fillStyle = 'white';
    console.log("Actions effect text: " + userInteractionObject.actionEffectsText);
    var textToDisplay = userInteractionObject.actionEffectsText.length != 0 ? userInteractionObject.actionEffectsText : userInteractionObject.text;
    context.fillText(textToDisplay, textPanel.x, textPanel.y + 20);

    context.font = "15pt Calibri";
    context.fillStyle = 'white';
    for (var i = 0; i < userInteractionObject.userActionsText.length; i++) {
        var userActionText = userInteractionObject.userActionsText[i];
        context.fillText(userActionText, actionsPanel.x + 20, yOffset);
        if (i == 0) {
            currentSelection = i;
        }
        yOffset += yOffsetIncrement;
    }

    displayArrow();
    // console.log("Crew cards: " + getVariable(crewCardsCollected));
}

function displayArrow() {
    if(userInteractionObject.userActionsText.length != 0){
        context.clearRect(actionsPanel.x, actionsPanel.y, 20, 1000);
        context.fillText("> ", 520, actionsPanel.y + 25 + (currentSelection * yOffsetIncrement));
    }
}

//User input
function keyPress(e) {
    if (e.keyCode == 13) {
        var selectedAction = userInteractionObject.userActionsText[currentSelection];
        if(!isUndefined(selectedAction)){
            executeUserAction(selectedAction);
            worldTick();
            render();
        }
    }
}

function keyDown(e) {
    if (e.keyCode == 40) {//down
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection++;
            currentSelection = currentSelection % userInteractionObject.userActionsText.length;
            displayArrow();
        }
    } else if (e.keyCode == 38) {//up
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection--;
            if (currentSelection < 0)
                currentSelection = userInteractionObject.userActionsText.length - 1;
            displayArrow();
        }
    }
}

document.addEventListener("keypress", keyPress, false);
document.addEventListener("keydown", keyDown, false);
