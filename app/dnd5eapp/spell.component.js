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
var spell_service_1 = require('./spell.service');
var SpellsComponent = (function () {
    function SpellsComponent(spellService) {
        this.spellService = spellService;
        this.spells = [];
        this.classes = [];
        this.levels = [];
        this.filteredSpells = [];
    }
    SpellsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spellService.getSpells().subscribe(function (spells) { _this.spells = spells; _this.filteredSpells = spells; });
        this.spellService.getClasses().then(function (classes) { return _this.classes = classes; });
        this.spellService.getLevels().then(function (levels) { return _this.levels = levels; });
    };
    SpellsComponent.prototype.setClassFilter = function (classFilter) {
        this.classFilter = classFilter;
        this.filterSpells();
    };
    SpellsComponent.prototype.setLevelFilter = function (levelFilter) {
        this.levelFilter = levelFilter;
        this.filterSpells();
    };
    SpellsComponent.prototype.filterSpells = function () {
        var _this = this;
        this.filteredSpells = this.spells.filter(function (spell) {
            return (_this.classFilter === "none" || spell.classes.indexOf(_this.classFilter) > -1)
                &&
                    (_this.levelFilter === "none" || spell.level.indexOf(_this.levelFilter) > -1);
        });
    };
    SpellsComponent = __decorate([
        core_1.Component({
            selector: 'spells',
            moduleId: module.id,
            templateUrl: "spell.component.html",
            styleUrls: ["monsters.component.css"]
        }), 
        __metadata('design:paramtypes', [spell_service_1.SpellService])
    ], SpellsComponent);
    return SpellsComponent;
}());
exports.SpellsComponent = SpellsComponent;
//# sourceMappingURL=spell.component.js.map