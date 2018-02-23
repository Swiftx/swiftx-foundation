import { Event } from "./Event";

export interface ModelInterface {

    /**
     * 生成初始状态
     * @returns {any}
     */
    getInitState():any;

    /**
     * 事件状态处理
     * @param state
     * @param action
     */
    reducer(state:any, action:Event);

}

export class Model implements ModelInterface {

    /**
     * 模型状态
     * @type {{}}
     * @private
     */
    protected state:any = {};

    /**
     * 状态处理
     * @type {{}}
     */
    protected reducers = {};

    /**
     * 生成初始状态
     * @returns {any}
     */
    public getInitState():any {
        return this.state;
    }

    /**
     * 事件状态处理
     * @param state
     * @param action
     */
    public reducer(state:any, action:Event){
        if(this.reducers[action.type] === undefined) return {};
        return this.reducers[action.type](state, action);
    }

}