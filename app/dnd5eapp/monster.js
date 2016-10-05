"use strict";
var Monster = (function () {
    function Monster() {
        this.Saves = [];
        this.Bonuses = [];
        this.Languages = [];
        this.Traits = [];
        this.Actions = [];
        this.Legendaries = [];
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