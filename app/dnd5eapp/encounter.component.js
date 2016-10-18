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
var gaussianNumberGenerator_1 = require('./gaussianNumberGenerator');
var EncounterComponent = (function () {
    function EncounterComponent(monsterService, router, randGenerator) {
        this.monsterService = monsterService;
        this.router = router;
        this.randGenerator = randGenerator;
        this.difficultyEnum = encounterConstants_1.Difficulty;
        this.players = [];
        this.monsters = [];
        this.difficultyLevel = encounterConstants_1.Difficulty.Easy;
        this.typeFilter = "all";
        this.alignmentFilter = "all";
    }
    EncounterComponent.prototype.generateEncounter = function () {
        var _this = this;
        if (this.players.length <= 0) {
            console.error("Cannot generate encounter with no players. Please add at least one player.");
        }
        else {
            var maxCr = Math.min.apply(Math, this.players);
            var xpThreshold = 0;
            var encounterMonsters = [];
            var map = void 0;
            switch (this.difficultyLevel) {
                case encounterConstants_1.Difficulty.Easy:
                    map = encounterConstants_1.easyMap;
                    break;
                case encounterConstants_1.Difficulty.Medium:
                    map = encounterConstants_1.mediumMap;
                    break;
                case encounterConstants_1.Difficulty.Hard:
                    map = encounterConstants_1.hardMap;
                    break;
                case encounterConstants_1.Difficulty.Deadly:
                    map = encounterConstants_1.deadlyMap;
                    break;
                default:
                    console.log(this.difficultyLevel);
                    console.error("Undefined Difficulty encountered. Not generating encounter.");
                    return;
            }
            for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
                var level = _a[_i];
                xpThreshold += map[level];
            }
            var crMult_1 = 1;
            if (this.difficultyLevel === encounterConstants_1.Difficulty.Deadly)
                crMult_1 = 1.5;
            var filteredMonsters = this.monsters.filter(function (monster) { return monster.CR * crMult_1 <= maxCr && (_this.typeFilter === "all" || monster.Type.indexOf(_this.typeFilter) > -1) && (_this.alignmentFilter === "all" || monster.Align.indexOf(_this.alignmentFilter) > -1); });
            console.log(filteredMonsters);
            if (filteredMonsters.length === 0) {
                console.error("There are no monsters of type: " + this.typeFilter + " that match the filter and players that you have selected. ");
                return;
            }
            var currentXP = 0;
            var unmodifiedXP = 0;
            console.log("Threshold XP: " + xpThreshold);
            var retries = 0;
            var totalRetries = 0;
            var resets = 0;
            var MAX_RESETS = 8;
            while (!this.withinThreshold(currentXP, xpThreshold, 0.10)) {
                console.log("Current XP: " + currentXP);
                var monsterToExamine = this.getRandomMonster(filteredMonsters, maxCr);
                console.log(monsterToExamine);
                console.log(monsterToExamine.Name);
                var monsterXP = encounterConstants_1.crMap[monsterToExamine.CR];
                var calculatedXP = 0;
                calculatedXP = this.calculateXP(encounterMonsters.length + 1, unmodifiedXP, monsterXP);
                console.log("Calculated XP: " + calculatedXP);
                if (calculatedXP < xpThreshold) {
                    encounterMonsters.push(monsterToExamine);
                    currentXP = calculatedXP;
                    unmodifiedXP += monsterXP;
                    console.log("New XP: " + currentXP);
                }
                else {
                    retries++;
                    totalRetries++;
                    if (retries > 5 && totalRetries % 5 < 4 && encounterMonsters.length > 0) {
                        var monster_1 = encounterMonsters.pop();
                        unmodifiedXP -= encounterConstants_1.crMap[monster_1.CR];
                        currentXP = this.calculateXP(encounterMonsters.length, unmodifiedXP, 0);
                        console.log("unmod xp: " + unmodifiedXP);
                        console.log("Retrying. New XP: " + currentXP);
                        retries = 0;
                    }
                    else if (retries > 5 && (totalRetries % 5 == 4 || encounterMonsters.length === 0)) {
                        encounterMonsters = [];
                        unmodifiedXP = 0;
                        currentXP = 0;
                        resets++;
                        retries = 0;
                    }
                    if (resets >= MAX_RESETS) {
                        encounterMonsters = [];
                        unmodifiedXP = 0;
                        currentXP = 0;
                        console.error("Could not generate encounter with given parameters");
                        return;
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
        if (isNaN(multiplier) && numMonsters > 0) {
            multiplier = encounterConstants_1.encounterMultipliers.maxValue;
        }
        else if (numMonsters = 0) {
            return 0;
        }
        return (unModifiedXP + newXP) * multiplier;
    };
    EncounterComponent.prototype.getRandomMonster = function (monsterList, minLevel) {
        var cr = this.getNearestCR(this.randGenerator.generateGaussianNoise(minLevel / 2, minLevel / 4));
        cr = Math.min(cr, minLevel);
        console.log("CR: " + cr);
        var filteredMonsters = monsterList.filter(function (monster) { return monster.CR === cr; });
        var randIndex = Math.floor(Math.random() * filteredMonsters.length);
        return filteredMonsters[randIndex];
    };
    EncounterComponent.prototype.withinThreshold = function (currentNumber, maxNumber, thresholdPercentage) {
        if (currentNumber == 0)
            return false;
        return Math.abs(Math.max(maxNumber, currentNumber) - Math.min(maxNumber, currentNumber)) / Math.min(maxNumber, currentNumber) < thresholdPercentage;
    };
    EncounterComponent.prototype.addPlayer = function (number) {
        this.players.push(number);
    };
    EncounterComponent.prototype.removePlayer = function (index) {
        this.players.splice(index, 1);
    };
    EncounterComponent.prototype.setDifficulty = function (diff) {
        this.difficultyLevel = diff;
    };
    EncounterComponent.prototype.setFilter = function (filter) {
        this.typeFilter = filter;
    };
    EncounterComponent.prototype.setAlignmentFilter = function (filter) {
        this.alignmentFilter = filter;
    };
    EncounterComponent.prototype.getNearestCR = function (cr) {
        if (cr >= 1) {
            return Math.floor(cr);
        }
        else if (cr >= 0.5) {
            return 0.5;
        }
        else if (cr >= 0.25) {
            return 0.25;
        }
        else if (cr >= 0.125) {
            return 0.125;
        }
        else {
            return 0;
        }
    };
    EncounterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.monsterService.getMonsters().subscribe(function (monsters) { return _this.monsters = monsters; }, function (error) { return console.error(error); });
        this.monsterService.getTypes().then(function (types) { _this.types = types; _this.types.sort(); });
        this.monsterService.getAlignments().then(function (alignments) { _this.alignments = alignments; });
    };
    EncounterComponent = __decorate([
        core_1.Component({
            selector: 'encounter',
            moduleId: module.id,
            templateUrl: "encounter.component.html",
            styleUrls: ["encounter.component.css"]
        }), 
        __metadata('design:paramtypes', [monster_service_1.MonsterService, router_1.Router, gaussianNumberGenerator_1.gaussianRandomNumberGenerator])
    ], EncounterComponent);
    return EncounterComponent;
}());
exports.EncounterComponent = EncounterComponent;
//# sourceMappingURL=encounter.component.js.map