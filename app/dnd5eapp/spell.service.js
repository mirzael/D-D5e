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
var spell_1 = require('./spell');
var SpellService = (function () {
    function SpellService(http) {
        this.http = http;
        this.spells = [];
        this.classes = [];
        this.levels = [];
        this.completedProcessing = false;
    }
    SpellService.prototype.getSpells = function () {
        var _this = this;
        if (this.spells.length > 0) {
            return Rx_1.Observable.fromPromise(Promise.resolve(this.spells));
        }
        else {
            return this.http.get('/app/spells.json')
                .map(function (response) { return _this.extractData(response); })
                .catch(this.handleError);
        }
    };
    SpellService.prototype.getClasses = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 1500);
        })
            .then(function () { return _this.classes; });
    };
    SpellService.prototype.getLevels = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 1500);
        })
            .then(function () { return _this.levels; });
    };
    SpellService.prototype.extractData = function (resp) {
        console.log(resp);
        var data = resp.json();
        console.log(data);
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var jSpell = data_1[_i];
            console.log(jSpell.class);
            var spell = new spell_1.Spell;
            spell.name = jSpell.name;
            spell.description = jSpell.desc;
            spell.range = jSpell.range;
            spell.components = jSpell.components;
            spell.material = jSpell.material;
            spell.ritual = jSpell.ritual.toUpperCase();
            spell.duration = jSpell.duration;
            spell.concentration = jSpell.concentration.toUpperCase();
            spell.casting_time = jSpell.casting_time;
            spell.level = jSpell.level.trim();
            spell.school = jSpell.school;
            spell.classes = jSpell.class.split(',');
            for (var i = spell.classes.length - 1; i >= 0; i--) {
                spell.classes[i] = spell.classes[i].trim();
            }
            this.addClasses(spell.classes);
            this.addLevels(spell.level);
            this.spells.push(spell);
        }
        this.completedProcessing = true;
        return this.spells;
    };
    SpellService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    SpellService.prototype.addClasses = function (classes) {
        for (var _i = 0, classes_1 = classes; _i < classes_1.length; _i++) {
            var cls = classes_1[_i];
            if (this.classes.indexOf(cls.trim()) === -1) {
                this.classes.push(cls.trim());
            }
        }
    };
    SpellService.prototype.addLevels = function (level) {
        if (this.levels.indexOf(level.trim()) === -1) {
            this.levels.push(level.trim());
        }
    };
    SpellService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SpellService);
    return SpellService;
}());
exports.SpellService = SpellService;
//# sourceMappingURL=spell.service.js.map