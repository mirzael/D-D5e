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
        this.schools = [];
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
            spell.ritual = jSpell.ritual.indexOf("yes") > -1;
            spell.duration = jSpell.duration;
            spell.concentration = jSpell.duration.indexOf("yes") > -1;
            spell.casting_time = jSpell.casting_time;
            spell.level = jSpell.level;
            spell.school = jSpell.school;
            spell.classes = jSpell.class.split(',');
            this.spells.push(spell);
        }
        return this.spells;
    };
    SpellService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    SpellService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SpellService);
    return SpellService;
}());
exports.SpellService = SpellService;
//# sourceMappingURL=spell.service.js.map