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
var monster_service_1 = require('./monster.service');
var MonstersComponent = (function () {
    function MonstersComponent(monsterService) {
        this.monsterService = monsterService;
    }
    MonstersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.monsterService.getMonsters().subscribe(function (monsters) { _this.monsters = monsters; console.log(monsters); }, function (error) { return _this.errorMessage = error; });
    };
    MonstersComponent = __decorate([
        core_1.Component({
            selector: 'monsters',
            moduleId: module.id,
            template: "\n\t<div class=\"container\">\n\t\t<div class=\"row monsterContainer\" *ngFor=\"let monster of monsters\" style=\"margin: 10px 0;background-color: darkgray;\">\n\t\t\t<div class=\"row monsterRow\" >\n\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\tName\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t{{monster.Name}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\" >\n\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\tCR\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t{{monster.CR}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\" >\n\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\tSize\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t{{monster.Size}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\" >\n\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\tType\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t{{monster.Type}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\" >\n\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\tAlignment\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t{{monster.Align}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\" >\n\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\tHP\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t{{monster.HP}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\" >\n\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\tAC\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t{{monster.AC}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\">\n\t\t\t\t<div class=\"col-md-2 attributes\"> \n\t\t\t\t\tAttributes\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3 attributesDef\" >\n\t\t\t\t\t<div class=\"row\" \n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Strength > 15, 'text-muted': monster.Strength < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tSTR: {{ monster.Strength }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Dexterity > 15, 'text-muted': monster.Dexterity < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tDEX: {{ monster.Dexterity }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Wisdom > 15, 'text-muted': monster.Wisdom < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tWIS: {{ monster.Wisdom }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Intelligence > 15, 'text-muted': monster.Intelligence < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tINT: {{ monster.Intelligence }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Charisma > 15, 'text-muted': monster.Charisma < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tCHA: {{ monster.Charisma }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Constitution > 15, 'text-muted': monster.Constitution < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tCON: {{ monster.Constitution }} \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\" >\n\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\tSpeed\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t{{monster.Speed}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\" *ngIf=\"monster.Traits.length > 0\">\n\t\t\t\tTraits\n\t\t\t\t<div class=\"row monsterRow\" *ngFor=\"let trait of monster.Traits\">\n\t\t\t\t\t<div class=\"monsterRow\"> {{trait.Name}} </div>\n\t\t\t\t\t<div class=\"monsterRow\"> \n\t\t\t\t\t\t<span style=\"display: inline-block\" *ngFor=\"let description of trait.Description\">\n\t\t\t\t\t\t\t{{description}}\n\t\t\t\t\t\t\t<br/>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row monsterRow\" *ngIf=\"monster.Actions.length > 0\">\n\t\t\t\tActions\n\t\t\t\t<div class=\"monsterRow\" *ngFor=\"let action of monster.Actions\">\n\t\t\t\t\t<div class=\"monsterRow\"> {{action.Name}} </div>\n\t\t\t\t\t<div class=\"monsterRow\"> \n\t\t\t\t\t\t<span style=\"display: inline-block\" *ngFor=\"let description of action.Description\">\n\t\t\t\t\t\t\t{{description}}\n\t\t\t\t\t\t\t<br/>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"monsterRow\" *ngFor=\"let attack of action.Attacks\">\n\t\t\t\t\t\t{{attack.Name}}\n\t\t\t\t\t\t<br/>\n\t\t\t\t\t\tBonus: +{{attack.ToHitBonus}}\n\t\t\t\t\t\t<br/>\n\t\t\t\t\t\tDamage: {{attack.Damage}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t",
            styleUrls: ["monsters.component.css"]
        }), 
        __metadata('design:paramtypes', [monster_service_1.MonsterService])
    ], MonstersComponent);
    return MonstersComponent;
}());
exports.MonstersComponent = MonstersComponent;
//# sourceMappingURL=monsters.component.js.map