"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model() {
        /**
         * 模型状态
         * @type {{}}
         * @private
         */
        this._state = {};
        this.reducers = {};
    }
    /**
     * 生成初始状态
     * @returns {any}
     */
    Model.prototype.getInitState = function () {
        return this._state;
    };
    Model.prototype.reducer = function () {
    };
    return Model;
}());
exports.Model = Model;
