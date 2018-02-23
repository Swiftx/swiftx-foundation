/// <reference types="react" />
import * as React from 'react';
import { Reducer, Store } from 'redux';
import { HooksInterface } from "./Hooks";
import { ModelInterface } from "./Model";
/**
 * 应用状态类型
 */
export interface StateInterface {
    [index: string]: any;
}
/**
 * 应用程序类型
 */
export interface AppInterface {
    /**
     * 启动应用
     * @param {string} selector
     */
    start(selector: string): void;
    /**
     * 注册 model
     * @param {string} namespace
     * @param {ModelInterface} model
     */
    model(namespace: string, model: ModelInterface): void;
    /**
     * 取消 model 注册
     * @param {string} namespace
     */
    unModel(namespace: string): void;
    /**
     * 注册路由器
     * @param {React.ComponentClass} route
     */
    router(route: React.ComponentClass): void;
    /**
     * 初始化状态
     * @returns {StateInterface}
     */
    initialState(): StateInterface;
}
export declare class App implements AppInterface {
    /**
     * 用户路由组件
     */
    protected _router: React.ComponentClass | React.SFC;
    /**
     * 系统模型对象
     */
    protected _models: {
        [index: string]: ModelInterface;
    };
    /**
     * 全局贮存对象
     */
    protected _store: Store<StateInterface>;
    /**
     * 中间件对象
     */
    protected _hooks: Array<HooksInterface>;
    /**
     * 创建状态管理器
     * @returns {Store<StateInterface>}
     */
    protected createStore(): Store<StateInterface>;
    /**
     * 启动应用
     * @param {string} selector
     */
    start(selector: string): void;
    /**
     * 注册 model
     * @param {string} namespace
     * @param {ModelInterface} model
     */
    model(namespace: string, model: ModelInterface): void;
    /**
     * 获取模型对象
     * @param {string} namespace
     * @returns {ModelInterface}
     */
    getModel(namespace: string): ModelInterface;
    /**
     * 取消 model 注册
     * @param {string} namespace
     */
    unModel(namespace: string): void;
    /**
     * 注册路由器
     * @param {React.ComponentClass | React.SFC} route
     */
    router(route: React.ComponentClass | React.SFC): void;
    /**
     * 初始化状态
     * @returns {StateInterface}
     */
    initialState(): StateInterface;
    /**
     * 出错时处理方法
     */
    onError(): void;
    /**
     * 有Action发生时
     */
    onAction(): void;
    /**
     * 状态改变时
     */
    onStateChange(): void;
    /**
     * 状态处理方法
     * @returns {Reducer}
     */
    protected buildReducer(): Reducer<any>;
    /**
     * 触发效果处理
     */
    onEffect(): void;
    /**
     * 当热部署生效
     */
    onHmr(): void;
    /**
     * 额外的状态处理
     */
    extraReducers(): void;
    /**
     * 额外的处理方法
     */
    extraEnhancers(): void;
}
