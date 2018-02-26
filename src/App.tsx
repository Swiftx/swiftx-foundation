import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { HooksInterface } from "./Hooks";
import { ModelInterface } from "./Model";

/**
 * 应用状态类型
 */
export interface StateInterface {
    [index:string] : any
}

/**
 * 应用程序类型
 */
export interface AppInterface{

    /**
     * 启动应用
     * @param {string} selector
     */
    start(selector:string): void;

    /**
     * 注册 model
     * @param {string} namespace
     * @param {ModelInterface} model
     */
    model(namespace:string, model:ModelInterface):void;

    /**
     * 取消 model 注册
     * @param {string} namespace
     */
    unModel(namespace:string):void;

    /**
     * 注册路由器
     * @param {React.ComponentClass} route
     */
    router(route : React.ComponentClass):void;

    /**
     * 初始化状态
     * @returns {StateInterface}
     */
    initialState(): StateInterface;

}

export class App implements AppInterface {

    /**
     * 用户路由组件
     */
    protected _router : React.ComponentClass|React.SFC;

    /**
     * 系统模型对象
     */
    protected _models : {[index: string]:ModelInterface} = {};


    /**
     * Saga模块
     */
    protected _saga : SagaMiddleware<any>;

    /**
     * 全局贮存对象
     */
    protected _store : Store<StateInterface>;

    /**
     * 中间件对象
     */
    protected _hooks : Array<HooksInterface>;

    /**
     * 创建状态管理器
     * @returns {Store<StateInterface>}
     */
    protected createStore():Store<StateInterface>{
        this._saga = createSagaMiddleware();
        return createStore(
            this.buildReducer(),
            this.initialState(),
            applyMiddleware(this._saga)
        );
    }

    /**
     * 启动应用
     * @param {string} selector
     */
    public start(selector:string): void {
        this._store = this.createStore();
        this._saga.run(this.onEffect.bind(this));
        ReactDOM.render(
            <Provider store={this._store}>
                <HashRouter>
                    <this._router />
                </HashRouter>
            </Provider>,
            document.querySelector(selector)
        );
    }

    /**
     * 注册 model
     * @param {string} namespace
     * @param {ModelInterface} model
     */
    public model(namespace:string, model:ModelInterface):void{
        this._models[namespace] = model;
    }

    /**
     * 获取模型对象
     * @param {string} namespace
     * @returns {ModelInterface}
     */
    public getModel(namespace:string):ModelInterface{
        return this._models[namespace];
    }

    /**
     * 取消 model 注册
     * @param {string} namespace
     */
    public unModel(namespace:string):void{
        delete this._models[namespace];
    }

    /**
     * 注册路由器
     * @param {React.ComponentClass | React.SFC} route
     */
    public router(route : React.ComponentClass|React.SFC):void{
        this._router = route;
    }


    /**
     * 初始化状态
     * @returns {StateInterface}
     */
    public initialState(): StateInterface {
        let state:StateInterface = {};
        for(let name in this._models)
            state[name] = this._models[name].getInitState();
        return state;
    }

    /**
     * 出错时处理方法
     */
    onError() {

    }

    /**
     * 有Action发生时
     */
    public onAction() {

    }

    /**
     * 状态改变时
     */
    onStateChange() {

    }

    /**
     * 状态处理方法
     * @returns {Reducer}
     */
    protected buildReducer(): Reducer<any> {
        let reducers : any = {};
        for(let name in this._models){
            let model = this._models[name];
            reducers[name] = model.reducer.bind(model);
        }
        return combineReducers(reducers);
    }

    /**
     * 触发效果处理
     */
    public *onEffect() {
        for(let name in this._models){
            let model = this._models[name];
            yield model.watcher();
        }
    }

    /**
     * 当热部署生效
     */
    onHmr() {
    }

    /**
     * 额外的状态处理
     */
    extraReducers() {

    }

    /**
     * 额外的处理方法
     */
    extraEnhancers() {

    }

}