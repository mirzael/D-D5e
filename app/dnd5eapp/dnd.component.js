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
var DndComponent = (function () {
    function DndComponent() {
        this.title = "D&D 5e encounter generator";
    }
    DndComponent = __decorate([
        core_1.Component({
            selector: 'dnd-app',
            template: "\n\t\t<nav class=\"navbar navbar-default\">\n\t\t\t<div class=\"navbar-header\">\n\t\t\t\t<a class=\"navbar-brand\" href=\"encounter\"> Encounter Generator </a>\n\t\t\t</div>\n\t\t\t<div id=\"navbar\" class=\"navbar-collapse collapse\" aria-expanded=\"false\" style=\"height: 1px;\">\n\t\t\t\t<ul class=\"nav navbar-nav\">\n\t\t\t\t\t<li> \n\t\t\t\t\t\t<a href=\"spells\"> Spell list </a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</nav>\n\t\t<h1>D&D 5e Encounter Generator</h1>\n\t\t<router-outlet></router-outlet>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], DndComponent);
    return DndComponent;
}());
exports.DndComponent = DndComponent;
//# sourceMappingURL=dnd.component.js.map