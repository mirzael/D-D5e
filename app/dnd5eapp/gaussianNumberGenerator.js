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
var gaussianRandomNumberGenerator = (function () {
    function gaussianRandomNumberGenerator() {
        this.two_pi = 2.0 * Math.PI;
        this.epsilon = Number.MIN_VALUE;
    }
    gaussianRandomNumberGenerator.prototype.generateGaussianNoise = function (mean, std) {
        this.generate = !this.generate;
        if (!this.generate)
            return this.z1 * std + mean;
        var u1;
        var u2;
        u1 = Math.random();
        u2 = Math.random();
        this.z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(this.two_pi * u2);
        this.z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(this.two_pi * u2);
        console.log(this.z0 * std + mean);
        console.log(this.z1 * std + mean);
        return this.z0 * std + mean;
    };
    gaussianRandomNumberGenerator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], gaussianRandomNumberGenerator);
    return gaussianRandomNumberGenerator;
}());
exports.gaussianRandomNumberGenerator = gaussianRandomNumberGenerator;
//# sourceMappingURL=gaussianNumberGenerator.js.map