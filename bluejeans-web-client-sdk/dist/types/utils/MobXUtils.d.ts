import { IReactionPublic, IAutorunOptions, IObservableValue, IComputedValue, IValueDidChange, IReactionOptions } from 'mobx';
export declare class MobXReactor {
    private disposers;
    autorun(view: (r: IReactionPublic) => any, opts?: IAutorunOptions): void;
    observe(value: IObservableValue<unknown> | IComputedValue<unknown>, listener: (change: IValueDidChange<unknown>) => void, fireImmediately?: boolean): void;
    observe<T, K extends keyof T>(object: T, property: K, listener: (change: IValueDidChange<T[K]>) => void, fireImmediately?: boolean): void;
    reaction<T>(expression: (r: IReactionPublic) => T, effect: (arg: T, r: IReactionPublic) => void, opts?: IReactionOptions): void;
    dispose(): void;
}
