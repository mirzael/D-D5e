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
            return this.http.get('/#/5emonsters')
                .map(function (response) { return _this.extractData(response); })
                .catch(this.handleError);
        }
    };
    MonsterService.prototype.extractData = function (res) {
        console.log(res);
        var body = res.text();
        var allTextLines = body.split(/\r\n|\n/);
        var lines = [];
        for (var i = 1; i < allTextLines.length; i++) {
            console.log(allTextLines[i]);
            var data = allTextLines[i].split(/,(?=([^\"]*\"[^\"]*\")*[^\"]*$)/);
            if (data.length >= 8) {
                var monster = new monster_1.Monster;
                //Monster,CR,Type,Subtype,Size,Align,Legendary?,Lair?
                monster.Name = data[0];
                monster.CR = Number(data[1]);
                monster.Type = data[2];
                monster.SubType = data[3];
                monster.Size = data[4];
                monster.Align = data[5];
                monster.Legendary = data[6] === 'Y';
                monster.Lair = data[7].indexOf('Y') !== -1;
                this.monsters.push(monster);
            }
        }
        return this.monsters;
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