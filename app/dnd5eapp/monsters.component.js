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
            template: "\n\t<div class=\"container\">\n\t\t<div class=\"row\" *ngFor=\"let monster of monsters\" style=\"margin: 10px 0;background-color: darkgray;\">\n\t\t\t<div class=\"row\" style=\"padding: 10px 0; margin: 10px 10px; background-color: dimgrey; width=80%;\">\n\t\t\t\t<div class=\"col-md-2\">\n\t\t\t\t\tName\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t{{monster.Name}}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row\" style=\"padding: 10px 0; margin: 10px 10px; background-color: dimgrey; width=80%;\">\n\t\t\t\t<div class=\"col-md-2 attributes\"> \n\t\t\t\t\tAttributes\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3 attributesDef\" >\n\t\t\t\t\t<div class=\"row\" \n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Strength > 15, 'text-muted': monster.Strength < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tSTR: {{ monster.Strength }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Dexterity > 15, 'text-muted': monster.Dexterity < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tDEX: {{ monster.Dexterity }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Wisdom > 15, 'text-muted': monster.Wisdom < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tWIS: {{ monster.Wisdom }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Intelligence > 15, 'text-muted': monster.Intelligence < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tINT: {{ monster.Intelligence }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Charisma > 15, 'text-muted': monster.Charisma < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tCHA: {{ monster.Charisma }} \n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\"\n\t\t\t\t\t\t[ngClass]=\"{'text-info': monster.Constitution > 15, 'text-muted': monster.Constitution < 10}\"\n\t\t\t\t\t> \n\t\t\t\t\t\tCON: {{ monster.Constitution }} \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!--\n\t\t\t\t\t<div> {{ monster.Name }} </div>\n\t\t\t\t\t<div> {{ monster.Size }} </div>\n\t\t\t\t\t<div> {{ monster.Type }} </div>\n\t\t\t\t\t<div> {{ monster.Align }} </div>\n\t\t\t\t\t<div> {{ monster.CR }} </div>\n\t\t\t\t\t<div> {{ monster.AC }} </div>\n\t\t\t\t\t<div> {{ monster.HP }} </div>\n\t\t\t\t\t<div> {{ monster.Speed }} </div>\n\t\t\t\t\t<div> {{ monster.Bonuses }} </div>\n\n\t\t\t\t\t<div> {{ monster.Constitution }} </div>\n\t\t\t\t\t<div> \n\t\t\t\t\t\t<div class=\"row\" >\n\t\t\t\t\t\t\t<div *ngFor=\"let trait of monster.Traits\">\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t<div > {{ trait.Name}} </div>\n\t\t\t\t\t\t\t\t\t<div > \n\t\t\t\t\t\t\t\t\t\t<span style=\"display: inline-block\" *ngFor=\"let description of trait.Description\">\n\t\t\t\t\t\t\t\t\t\t\t{{description}}\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t-->\n\t\t</div>\n\t</div>\n\t",
            styleUrls: ["monsters.component.css"]
        }), 
        __metadata('design:paramtypes', [monster_service_1.MonsterService])
    ], MonstersComponent);
    return MonstersComponent;
}());
exports.MonstersComponent = MonstersComponent;
//# sourceMappingURL=monsters.component.js.map