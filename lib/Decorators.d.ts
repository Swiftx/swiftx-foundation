export declare const Reducers: unique symbol;
export declare const ReducerName: unique symbol;
export declare const EffectName: unique symbol;
export declare const ModelEntity: <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {};
} & T;
/**
 * 模型注解
 * @param {string} name
 * @returns {(target: Function) => void}
 * @constructor
 */
export declare const Reducer: (name: string) => (target: Function) => void;
/**
 * 模型注解
 * @param {string} name
 * @returns {(target: Function) => void}
 * @constructor
 */
export declare const Effect: (name: string) => (target: Function) => void;
