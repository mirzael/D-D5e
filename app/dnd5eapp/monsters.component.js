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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var monster_service_1 = require('./monster.service');
var encounterConstants_1 = require('./encounterConstants');
var MonstersComponent = (function () {
    function MonstersComponent(monsterService, route, location) {
        this.monsterService = monsterService;
        this.route = route;
        this.location = location;
        this.monsters = [];
        this.totalXP = 0;
    }
    MonstersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.monsterService.getMonsters().subscribe(function (monsters) {
            _this.route.params.forEach(function (params) {
                var idArr = params['ids'];
                console.log(idArr);
                var ids = idArr.split(',');
                for (var i = 0; i < ids.length; i++) {
                    ids[i] = +ids[i];
                }
                console.log(ids);
                _this.monsters = _this.monsterService.getMonstersByIds(ids);
                for (var _i = 0, _a = _this.monsters; _i < _a.length; _i++) {
                    var monster = _a[_i];
                    _this.totalXP += encounterConstants_1.crMap[monster.CR];
                }
                console.log(_this.monsters);
            });
        }, function (err) {
            console.error(err);
        });
    };
    MonstersComponent = __decorate([
        core_1.Component({
            selector: 'monsters',
            moduleId: module.id,
            templateUrl: "monsters.component.html",
            styleUrls: ["monsters.component.css"]
        }), 
        __metadata('design:paramtypes', [monster_service_1.MonsterService, router_1.ActivatedRoute, common_1.Location])
    ], MonstersComponent);
    return MonstersComponent;
}());
exports.MonstersComponent = MonstersComponent;
//# sourceMappingURL=monsters.component.js.map