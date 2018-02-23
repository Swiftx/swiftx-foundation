export interface ModelInterface {

    /**
     * 生成初始状态
     * @returns {any}
     */
    getInitState():any;

}

export class Model implements ModelInterface {

    /**
     * 模型状态
     * @type {{}}
     * @private
     */
    protected _state:any = {};

    protected reducers = {};

    /**
     * 生成初始状态
     * @returns {any}
     */
    public getInitState():any {
        return this._state;
    }


    public reducer(){

    }

}