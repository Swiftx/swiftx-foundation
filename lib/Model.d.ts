import { Event } from "./Event";
export interface ModelInterface {
    /**
     * 生成初始状态
     * @returns {any}
     */
    getInitState(): any;
    /**
     * 事件状态处理
     * @param state
     * @param action
     */
    reducer(state: any, action: Event): any;
}
export declare class Model implements ModelInterface {
    /**
     * 模型状态
     * @type {{}}
     * @private
     */
    protected state: any;
    /**
     * 状态处理
     * @type {{}}
     */
    protected reducers: {};
    /**
     * 生成初始状态
     * @returns {any}
     */
    getInitState(): any;
    /**
     * 事件状态处理
     * @param state
     * @param action
     */
    reducer(state: any, action: Event): any;
}
