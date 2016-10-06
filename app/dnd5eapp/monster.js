"use strict";
var Monster = (function () {
    function Monster() {
        this.Saves = [];
        this.Bonuses = [];
        this.Senses = [];
        this.Languages = [];
        this.Immunities = [];
        this.Resistances = [];
        this.Vulnerabilities = [];
        this.Traits = [];
        this.Actions = [];
        this.Legendaries = [];
        this.Reactions = [];
        this.Spells = [];
    }
    return Monster;
}());
exports.Monster = Monster;
var MonsterProperty = (function () {
    function MonsterProperty() {
        this.Description = [];
        this.Attacks = [];
    }
    return MonsterProperty;
}());
exports.MonsterProperty = MonsterProperty;
var Attack = (function () {
    function Attack() {
    }
    return Attack;
}());
exports.Attack = Attack;
//# sourceMappingURL=monster.js.map