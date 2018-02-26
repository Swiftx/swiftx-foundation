"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
var redux_saga_1 = require("redux-saga");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var App = /** @class */ (function () {
    function App() {
        /**
         * 系统模型对象
         */
        this._models = {};
    }
    /**
     * 创建状态管理器
     * @returns {Store<StateInterface>}
     */
    App.prototype.createStore = function () {
        this._saga = redux_saga_1.default();
        return redux_1.createStore(this.buildReducer(), this.initialState(), redux_1.applyMiddleware(this._saga));
    };
    /**
     * 启动应用
     * @param {string} selector
     */
    App.prototype.start = function (selector) {
        this._store = this.createStore();
        this._saga.run(this.onEffect.bind(this));
        ReactDOM.render(React.createElement(react_redux_1.Provider, { store: this._store },
            React.createElement(react_router_dom_1.HashRouter, null,
                React.createElement(this._router, null))), document.querySelector(selector));
    };
    /**
     * 注册 model
     * @param {string} namespace
     * @param {ModelInterface} model
     */
    App.prototype.model = function (namespace, model) {
        this._models[namespace] = model;
    };
    /**
     * 获取模型对象
     * @param {string} namespace
     * @returns {ModelInterface}
     */
    App.prototype.getModel = function (namespace) {
        return this._models[namespace];
    };
    /**
     * 取消 model 注册
     * @param {string} namespace
     */
    App.prototype.unModel = function (namespace) {
        delete this._models[namespace];
    };
    /**
     * 注册路由器
     * @param {React.ComponentClass | React.SFC} route
     */
    App.prototype.router = function (route) {
        this._router = route;
    };
    /**
     * 初始化状态
     * @returns {StateInterface}
     */
    App.prototype.initialState = function () {
        var state = {};
        for (var name_1 in this._models)
            state[name_1] = this._models[name_1].getInitState();
        return state;
    };
    /**
     * 出错时处理方法
     */
    App.prototype.onError = function () {
    };
    /**
     * 有Action发生时
     */
    App.prototype.onAction = function () {
    };
    /**
     * 状态改变时
     */
    App.prototype.onStateChange = function () {
    };
    /**
     * 状态处理方法
     * @returns {Reducer}
     */
    App.prototype.buildReducer = function () {
        var reducers = {};
        for (var name_2 in this._models) {
            var model = this._models[name_2];
            reducers[name_2] = model.reducer.bind(model);
        }
        return redux_1.combineReducers(reducers);
    };
    /**
     * 触发效果处理
     */
    App.prototype.onEffect = function () {
        var _a, _b, _i, name_3, model;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [];
                    for (_b in this._models)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    name_3 = _a[_i];
                    model = this._models[name_3];
                    return [4 /*yield*/, model.watcher()];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    /**
     * 当热部署生效
     */
    App.prototype.onHmr = function () {
    };
    /**
     * 额外的状态处理
     */
    App.prototype.extraReducers = function () {
    };
    /**
     * 额外的处理方法
     */
    App.prototype.extraEnhancers = function () {
    };
    return App;
}());
exports.App = App;
