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
    MonsterService.prototype.getMonstersByIds = function (ids) {
        return this.monsters.filter(function (monster) { return ids.indexOf(monster.ID) !== -1; });
    };
    MonsterService.prototype.extractData = function (res) {
        var doc = JSON.parse(xml2json(res.text(), "  "));
        var monsters = doc.compendium.monster;
        for (var i = monsters.length - 1; i >= 0; i--) {
            var monster = new monster_1.Monster();
            monster.ID = i + 1;
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
            monster.Reactions = this.processMonsterProperty(monsters[i].reaction);
            if (monsters[i].hasOwnProperty("languages")) {
                monster.Languages = monsters[i].languages.split(",");
            }
            if (monsters[i].hasOwnProperty("immune")) {
                monster.Immunities = monster.Immunities.concat(monsters[i].immune.split(/[;,]/));
            }
            if (monsters[i].hasOwnProperty("conditionImmune")) {
                monster.Immunities = monster.Immunities.concat(monsters[i].conditionImmune.split(/[;,]/));
            }
            if (monsters[i].hasOwnProperty("resist")) {
                monster.Resistances = monsters[i].resist.split(/[;,]/);
            }
            if (monsters[i].hasOwnProperty("vulnerable")) {
                monster.Vulnerabilities = monsters[i].vulnerable.split(/[;,]/);
            }
            if (monsters[i].hasOwnProperty("spells")) {
                monster.Spells = monsters[i].spells.split(/[;,]/);
            }
            if (monsters[i].hasOwnProperty("save")) {
                monster.Saves = monsters[i].save.split(/[;,]/);
            }
            if (monsters[i].hasOwnProperty("senses")) {
                monsters.Senses = monsters[i].senses.split(/[;,]/);
            }
            this.monsters.push(monster);
        }
        return this.monsters;
    };
    MonsterService.prototype.processSingleMonsterProperty = function (property) {
        var newProp = new monster_1.MonsterProperty();
        newProp.Name = property.name;
        if (Array.isArray(property.text)) {
            for (var k = 0; k < property.text.length; k++) {
                newProp.Description.push(property.text[k]);
            }
        }
        else {
            newProp.Description.push(property.text);
        }
        if (property.hasOwnProperty("attack")) {
            if (Array.isArray(property.attack)) {
                for (var k = property.attack.length - 1; k >= 0; k--) {
                    var attack = new monster_1.Attack();
                    var actAttrs = property.attack[k].split("|");
                    attack.Name = actAttrs[0];
                    attack.ToHitBonus = parseInt(actAttrs[1]);
                    attack.Damage = actAttrs[2];
                    newProp.Attacks.push(attack);
                }
            }
            else {
                var attack = new monster_1.Attack();
                var actAttrs = property.attack.split("|");
                attack.Name = actAttrs[0];
                attack.ToHitBonus = parseInt(actAttrs[1]);
                attack.Damage = actAttrs[2];
                newProp.Attacks.push(attack);
            }
        }
        return newProp;
    };
    MonsterService.prototype.processMonsterProperty = function (property) {
        var properties = [];
        if (property !== undefined) {
            if (Array.isArray(property)) {
                for (var i = property.length - 1; i >= 0; i--) {
                    properties.push(this.processSingleMonsterProperty(property[i]));
                }
            }
            else {
                properties.push(this.processSingleMonsterProperty(property));
            }
        }
        return properties;
    };
    MonsterService.prototype.processTraits = function (monster) {
        return this.processMonsterProperty(monster.trait);
    };
    MonsterService.prototype.processActions = function (monster) {
        return this.processMonsterProperty(monster.action);
    };
    MonsterService.prototype.processLegendaries = function (monster) {
        return this.processMonsterProperty(monster.legendary);
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