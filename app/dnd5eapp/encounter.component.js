"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var monster_service_1 = require('./monster.service');
var encounterConstants_1 = require('./encounterConstants');
var EncounterComponent = (function () {
    function EncounterComponent(monsterService, router) {
        this.monsterService = monsterService;
        this.router = router;
        this.players = [];
        this.monsters = [];
    }
    EncounterComponent.prototype.generateEncounter = function () {
        if (this.players.length <= 0) {
            console.error("Cannot generate encounter with no players. Please add at least one player.");
        }
        else {
            var maxCr = Math.min.apply(Math, this.players);
            var xpThreshold = 0;
            var encounterMonsters = [];
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var level = _a[_i];
                xpThreshold += encounterConstants_1.mediumMap[level];
            }
            var filteredMonsters = this.monsters.filter(function (monster) { return monster.CR <= maxCr; });
            var currentXP = 0;
            var unmodifiedXP = 0;
            console.log("Threshold XP: " + xpThreshold);
            var retries = 0;
            while (!this.withinThreshold(currentXP, xpThreshold, 0.10)) {
                console.log("Current XP: " + currentXP);
                var randIndex = Math.floor(Math.random() * filteredMonsters.length);
                var monsterToExamine = filteredMonsters[randIndex];
                var monsterXP = encounterConstants_1.crMap[monsterToExamine.CR];
                var calculatedXP = 0;
                calculatedXP = this.calculateXP(encounterMonsters.length + 1, unmodifiedXP, monsterXP);
                if (calculatedXP < xpThreshold) {
                    encounterMonsters.push(monsterToExamine);
                    currentXP = calculatedXP;
                    unmodifiedXP += monsterXP;
                    console.log("New XP: " + currentXP);
                }
                else {
                    retries++;
                    if (retries > 5) {
                        var monster = encounterMonsters.pop();
                        currentXP = this.calculateXP(encounterMonsters.length, unmodifiedXP, monsterXP);
                        unmodifiedXP -= encounterConstants_1.crMap[monster.CR];
                        retries = 0;
                    }
                }
            }
            var monsterIds = [];
            for (var _b = 0, encounterMonsters_1 = encounterMonsters; _b < encounterMonsters_1.length; _b++) {
                var monster = encounterMonsters_1[_b];
                monsterIds.push(monster.ID);
            }
            console.log(encounterMonsters);
            var link = ['/monsters', monsterIds.toString()];
            this.router.navigate(link);
        }
    };
    EncounterComponent.prototype.calculateXP = function (numMonsters, unModifiedXP, newXP) {
        var multiplier = encounterConstants_1.encounterMultipliers[numMonsters];
        return (unModifiedXP + newXP) * multiplier;
    };
    EncounterComponent.prototype.withinThreshold = function (currentNumber, maxNumber, thresholdPercentage) {
        if (currentNumber == 0)
            return false;
        console.log(Math.abs(maxNumber - currentNumber));
        console.log(Math.abs(maxNumber - currentNumber) / (currentNumber));
        console.log(Math.abs(maxNumber - currentNumber) / (currentNumber) < thresholdPercentage);
        return Math.abs(maxNumber - currentNumber) / (currentNumber) < thresholdPercentage;
    };
    EncounterComponent.prototype.addPlayer = function (number) {
        this.players.push(number);
    };
    EncounterComponent.prototype.removePlayer = function (index) {
        this.players.splice(index, 1);
    };
    EncounterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.monsterService.getMonsters().subscribe(function (monsters) { return _this.monsters = monsters; }, function (error) { return console.error(error); });
    };
    EncounterComponent = __decorate([
        core_1.Component({
            selector: 'encounter',
            moduleId: module.id,
            template: "\n\t<div class=\"dropdown pageButton\" style=\"width: 90%\">\n\t\t<button class=\"btn btn-primary dropdown-toogle\" type=\"button\" data-toggle=\"dropdown\">Add Player\n\t\t<span class=\"caret\"></span></button>\n\t\t<ul class=\"dropdown-menu\">\n\t\t\t<li><a (click)=\"addPlayer(1)\"> Level 01 </a></li>\n\t\t\t<li><a (click)=\"addPlayer(2)\"> Level 02 </a></li>\n\t\t\t<li><a (click)=\"addPlayer(3)\"> Level 03 </a></li>\n\t\t\t<li><a (click)=\"addPlayer(4)\"> Level 04 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(5)\"> Level 05 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(6)\"> Level 06 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(7)\"> Level 07 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(8)\"> Level 08 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(9)\"> Level 09 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(10)\"> Level 10 </a></li>\n\t\t\t<li><a (click)=\"addPlayer(11)\"> Level 11 </a></li>\n\t\t\t<li><a (click)=\"addPlayer(12)\"> Level 12 </a></li>\n\t\t\t<li><a (click)=\"addPlayer(13)\"> Level 13 </a></li>\n\t\t\t<li><a (click)=\"addPlayer(14)\"> Level 14 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(15)\"> Level 15 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(16)\"> Level 16 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(17)\"> Level 17 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(18)\"> Level 18 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(19)\"> Level 19 </a></li>\t\t\t\n\t\t\t<li><a (click)=\"addPlayer(20)\"> Level 20 </a></li>\t\t\n\t\t</ul>\n\t</div>\n\n\t<div class=\"panel panel-info\" *ngIf=\"players.length > 0\" style=\"width: 90%; margin: 0 auto;\">\n\t\t<div class=\"panel-heading\" >\n\t\t\t<h3 class=\"panel-title\">Players</h3>\n\t\t</div>\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-sm-2 bg-success playerElement\" *ngFor=\"let player of players; let i = index;\">\n\t\t\t\t\t<button class=\"close\" style=\"margin-top: 7px\" (click)=\"removePlayer(i)\">x</button>Level {{player}}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\n\t<button class=\"btn btn-success pageButton\" (click)=\"generateEncounter()\">\n\t\tGENERATE ENCOUNTER\n\t</button>\n\t",
            styleUrls: ["encounter.component.css"]
        }), 
        __metadata('design:paramtypes', [monster_service_1.MonsterService, router_1.Router])
    ], EncounterComponent);
    return EncounterComponent;
}());
exports.EncounterComponent = EncounterComponent;
//# sourceMappingURL=encounter.component.js.map