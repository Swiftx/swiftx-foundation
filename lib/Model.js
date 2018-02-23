"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model() {
        /**
         * 模型状态
         * @type {{}}
         * @private
         */
        this.state = {};
        /**
         * 状态处理
         * @type {{}}
         */
        this.reducers = {};
    }
    /**
     * 生成初始状态
     * @returns {any}
     */
    Model.prototype.getInitState = function () {
        return this.state;
    };
    /**
     * 事件状态处理
     * @param state
     * @param action
     */
    Model.prototype.reducer = function (state, action) {
        if (this.reducers[action.type] === undefined)
            return {};
        return this.reducers[action.type](state, action);
    };
    return Model;
}());
exports.Model = Model;
