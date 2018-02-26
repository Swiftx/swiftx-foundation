export const Reducers = Symbol();
export const ReducerName = Symbol();
export const EffectName = Symbol();

export const ModelEntity = <T extends {new(...args:any[]):{}}>(constructor:T) => {
    return class extends constructor {
        public constructor(...args:any[]){
            super(...args);
            this[Reducers] = {};
            let self : any = this;
            for(let method in self){
                if(method === 'constructor') continue;
                if(self[method] instanceof Function){
                    if(self[method][ReducerName] !== undefined){
                        let name = self[method][ReducerName];
                        this[Reducers][name] = self[method][name].bind(this);
                    }

                }
            }
        }

    }
};


/**
 * 模型注解
 * @param {string} name
 * @returns {(target: Function) => void}
 * @constructor
 */
export const Reducer = (name:string) => (target:Function) =>{
    target.prototype[ReducerName] = name;
};


/**
 * 模型注解
 * @param {string} name
 * @returns {(target: Function) => void}
 * @constructor
 */
export const Effect = (name:string) => (target:Function) =>{
    target.prototype[ReducerName] = name;
};