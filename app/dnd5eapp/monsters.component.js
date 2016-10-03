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
        this.monsterService.getMonsters().subscribe(function (monsters) { _this.monsters = monsters; }, function (error) { return _this.errorMessage = error; });
    };
    MonstersComponent = __decorate([
        core_1.Component({
            selector: 'monsters',
            moduleId: module.id,
            template: "\n\t<div class=\"container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-lg-12\">\n\t\t\t\t<table class=\"table table-striped table-hover\">\n\t\t\t\t\t<thead>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th> Name </th>\n\t\t\t\t\t\t\t<th> Type </th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>\n\t\t\t\t\t<tbody>\n\t\t\t\t\t\t<tr *ngFor=\"let monster of monsters\">\n\t\t\t\t\t\t\t<td> {{monster.Name }} </td>\n\t\t\t\t\t\t\t<td> {{monster.Type }} </td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t"
        }), 
        __metadata('design:paramtypes', [monster_service_1.MonsterService])
    ], MonstersComponent);
    return MonstersComponent;
}());
exports.MonstersComponent = MonstersComponent;
//# sourceMappingURL=monsters.component.js.map