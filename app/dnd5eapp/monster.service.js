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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var monster_1 = require('./monster');
var MonsterService = (function () {
    function MonsterService(http) {
        this.http = http;
        this.monsters = [];
    }
    MonsterService.prototype.getMonsters = function () {
        var _this = this;
        if (this.monsters.length > 0) {
            return Rx_1.Observable.fromPromise(Promise.resolve(this.monsters));
        }
        else {
            return this.http.get('/app/monsters.xml')
                .map(function (response) { return _this.extractData(response); })
                .catch(this.handleError);
        }
    };
    MonsterService.prototype.extractData = function (res) {
        console.log(res);
        var doc = JSON.parse(xml2json(res.text(), "  "));
        var monsters = doc.compendium.monster;
        for (var i = monsters.length - 1; i >= 0; i--) {
            console.log(monsters[i]);
            var monster = new monster_1.Monster();
            monster.Name = monsters[i].name;
            monster.Size = monsters[i].size;
            monster.Type = monsters[i].type.replace(", monster manual", "");
            monster.Align = monsters[i].alignment;
            if (monsters[i].cr.indexOf("/") != -1) {
                monster.CR = eval(monsters[i].cr);
            }
            else {
                monster.CR = parseInt(monsters[i].cr);
            }
            monster.AC = monsters[i].ac;
            monster.HP = monsters[i].hp;
            monster.Speed = monsters[i].speed;
            if (monsters[i].hasOwnProperty("skill")) {
                monster.Bonuses = monsters[i].skill.split(',');
            }
            monster.Perception = monsters[i].passive;
            monster.Strength = monsters[i].str;
            monster.Dexterity = monsters[i].dex;
            monster.Wisdom = monsters[i].wis;
            monster.Intelligence = monsters[i].int;
            monster.Charisma = monsters[i].cha;
            monster.Constitution = monsters[i].con;
            monster.Traits = this.processTraits(monsters[i]);
            monster.Actions = this.processActions(monsters[i]);
            monster.Legendaries = this.processLegendaries(monsters[i]);
            if (monsters[i].hasOwnProperty("languages")) {
                monster.Languages = monsters[i].languages.split(",");
            }
            if (monsters[i].hasOwnProperty("immune")) {
                monster.Immunities = monsters[i].immune;
            }
            this.monsters.push(monster);
        }
        return this.monsters;
    };
    MonsterService.prototype.processTraits = function (monster) {
        var traits = [];
        if (monster.hasOwnProperty("trait")) {
            if (Array.isArray(monster.trait)) {
                for (var j = monster.trait.length - 1; j >= 0; j--) {
                    var trait = new monster_1.MonsterProperty();
                    var xmlTrait = monster.trait[j];
                    trait.Name = xmlTrait.name;
                    if (Array.isArray(xmlTrait.text)) {
                        for (var k = xmlTrait.text.length - 1; k >= 0; k--) {
                            trait.Description.push(xmlTrait.text[k]);
                        }
                    }
                    else {
                        trait.Description.push(xmlTrait.text);
                    }
                    traits.push(trait);
                }
            }
            else {
                var trait = new monster_1.MonsterProperty();
                var xmlTrait = monster.trait;
                trait.Name = xmlTrait.name;
                if (Array.isArray(xmlTrait.text)) {
                    for (var k = xmlTrait.text.length - 1; k >= 0; k--) {
                        trait.Description.push(xmlTrait.text[k]);
                    }
                }
                else {
                    trait.Description.push(xmlTrait.text);
                }
                traits.push(trait);
            }
        }
        return traits;
    };
    MonsterService.prototype.processActions = function (monster) {
        var actions = [];
        if (monster.hasOwnProperty("action")) {
            if (Array.isArray(monster.action)) {
                for (var j = monster.action.length - 1; j >= 0; j--) {
                    var action = new monster_1.MonsterProperty();
                    var xmlaction = monster.action[j];
                    action.Name = xmlaction.name;
                    if (Array.isArray(xmlaction.text)) {
                        for (var k = xmlaction.text.length - 1; k >= 0; k--) {
                            action.Description.push(xmlaction.text[k]);
                        }
                    }
                    else {
                        action.Description.push(xmlaction.text);
                    }
                    if (xmlaction.hasOwnProperty("attack")) {
                        if (Array.isArray(xmlaction.attack)) {
                            for (var k = xmlaction.attack.length - 1; k >= 0; k--) {
                                var attack = new monster_1.Attack();
                                var actAttrs = xmlaction.attack[k].split("|");
                                attack.Name = actAttrs[0];
                                attack.ToHitBonus = parseInt(actAttrs[1]);
                                attack.Damage = actAttrs[1];
                                action.Attacks.push(attack);
                            }
                        }
                        else {
                            var attack = new monster_1.Attack();
                            var actAttrs = xmlaction.attack.split("|");
                            attack.Name = actAttrs[0];
                            attack.ToHitBonus = parseInt(actAttrs[1]);
                            attack.Damage = actAttrs[1];
                            action.Attacks.push(attack);
                        }
                    }
                    actions.push(action);
                }
            }
            else {
                var action = new monster_1.MonsterProperty();
                var xmlaction = monster.action;
                action.Name = xmlaction.name;
                if (Array.isArray(xmlaction.text)) {
                    for (var k = xmlaction.text.length - 1; k >= 0; k--) {
                        action.Description.push(xmlaction.text[k]);
                    }
                }
                else {
                    action.Description.push(xmlaction.text);
                }
                if (xmlaction.hasOwnProperty("attack")) {
                    if (Array.isArray(xmlaction.attack)) {
                        for (var k = xmlaction.attack.length - 1; k >= 0; k--) {
                            var attack = new monster_1.Attack();
                            var actAttrs = xmlaction.attack[k].split("|");
                            attack.Name = actAttrs[0];
                            attack.ToHitBonus = parseInt(actAttrs[1]);
                            attack.Damage = actAttrs[1];
                            action.Attacks.push(attack);
                        }
                    }
                    else {
                        var attack = new monster_1.Attack();
                        var actAttrs = xmlaction.attack.split("|");
                        attack.Name = actAttrs[0];
                        attack.ToHitBonus = parseInt(actAttrs[1]);
                        attack.Damage = actAttrs[1];
                        action.Attacks.push(attack);
                    }
                }
                actions.push(action);
            }
        }
        return actions;
    };
    MonsterService.prototype.processLegendaries = function (monster) {
        var legendaries = [];
        if (monster.hasOwnProperty("legendary")) {
            if (Array.isArray(monster.legendary)) {
                for (var j = monster.legendary.length - 1; j >= 0; j--) {
                    var legendary = new monster_1.MonsterProperty();
                    var xmllegendary = monster.legendary[j];
                    legendary.Name = xmllegendary.name;
                    if (Array.isArray(xmllegendary.text)) {
                        for (var k = xmllegendary.text.length - 1; k >= 0; k--) {
                            legendary.Description.push(xmllegendary.text[k]);
                        }
                    }
                    else {
                        legendary.Description.push(xmllegendary.text);
                    }
                    if (xmllegendary.hasOwnProperty("attack")) {
                        if (Array.isArray(xmllegendary.attack)) {
                            for (var k = xmllegendary.attack.length - 1; k >= 0; k--) {
                                var attack = new monster_1.Attack();
                                var actAttrs = xmllegendary.attack[k].split("|");
                                attack.Name = actAttrs[0];
                                attack.ToHitBonus = parseInt(actAttrs[1]);
                                attack.Damage = actAttrs[1];
                                legendary.Attacks.push(attack);
                            }
                        }
                        else {
                            var attack = new monster_1.Attack();
                            var actAttrs = xmllegendary.attack.split("|");
                            attack.Name = actAttrs[0];
                            attack.ToHitBonus = parseInt(actAttrs[1]);
                            attack.Damage = actAttrs[1];
                            legendary.Attacks.push(attack);
                        }
                    }
                    legendaries.push(legendary);
                }
            }
            else {
                var legendary = new monster_1.MonsterProperty();
                var xmllegendary = monster.legendary;
                legendary.Name = xmllegendary.name;
                if (Array.isArray(xmllegendary.text)) {
                    for (var k = xmllegendary.text.length - 1; k >= 0; k--) {
                        legendary.Description.push(xmllegendary.text[k]);
                    }
                }
                else {
                    legendary.Description.push(xmllegendary.text);
                }
                if (xmllegendary.hasOwnProperty("attack")) {
                    if (Array.isArray(xmllegendary.attack)) {
                        for (var k = xmllegendary.attack.length - 1; k >= 0; k--) {
                            var attack = new monster_1.Attack();
                            var actAttrs = xmllegendary.attack[k].split("|");
                            attack.Name = actAttrs[0];
                            attack.ToHitBonus = parseInt(actAttrs[1]);
                            attack.Damage = actAttrs[1];
                            legendary.Attacks.push(attack);
                        }
                    }
                    else {
                        var attack = new monster_1.Attack();
                        var actAttrs = xmllegendary.attack.split("|");
                        attack.Name = actAttrs[0];
                        attack.ToHitBonus = parseInt(actAttrs[1]);
                        attack.Damage = actAttrs[1];
                        legendary.Attacks.push(attack);
                    }
                }
                legendaries.push(legendary);
            }
        }
        return legendaries;
    };
    MonsterService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    MonsterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MonsterService);
    return MonsterService;
}());
exports.MonsterService = MonsterService;
//# sourceMappingURL=monster.service.js.map