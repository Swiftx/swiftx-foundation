"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reducers = Symbol();
exports.ReducerName = Symbol();
exports.EffectName = Symbol();
exports.ModelEntity = function (constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this[exports.Reducers] = {};
            var self = _this;
            for (var method in self) {
                if (method === 'constructor')
                    continue;
                if (self[method] instanceof Function) {
                    if (self[method][exports.ReducerName] !== undefined) {
                        var name_1 = self[method][exports.ReducerName];
                        _this[exports.Reducers][name_1] = self[method][name_1].bind(_this);
                    }
                }
            }
            return _this;
        }
        return class_1;
    }(constructor));
};
/**
 * 模型注解
 * @param {string} name
 * @returns {(target: Function) => void}
 * @constructor
 */
exports.Reducer = function (name) { return function (target) {
    target.prototype[exports.ReducerName] = name;
}; };
/**
 * 模型注解
 * @param {string} name
 * @returns {(target: Function) => void}
 * @constructor
 */
exports.Effect = function (name) { return function (target) {
    target.prototype[exports.ReducerName] = name;
}; };
