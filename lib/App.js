"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
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
        return redux_1.createStore(this.buildReducer(), this.initialState());
    };
    /**
     * 启动应用
     * @param {string} selector
     */
    App.prototype.start = function (selector) {
        this._store = this.createStore();
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
