import React, {Dispatch, SetStateAction, useEffect, useState} from "react";

/*
    Creates global state hook that triggers re-render of all children that uses it.
    Must be declared globally and {use|update}SingletonState must be used within a component.

    Returns getter and setter for global state hook.
*/
export function createSingletonState<T>(initial: T): [() => T, () => T, (arg0: T) => void] {
    // Closure variables
    let _state: T = initial;
    const _updates: Dispatch<SetStateAction<T>>[] = [];

    const useSingletonState = () => {
        const [_, setState] = useState(_state);

        // Add setState to _updates on mount and rm it on unmount
        useEffect(() => {
            _updates.push(setState);

            return () => {
                const ind = _updates.indexOf(setState);
                if (ind > -1)
                    _updates.splice(ind);
            }
        }, []);

        return _state;
    }

    const getSingletonState = () => {
        return _state;
    }

    const updateSingletonState = (state: T) => {
        _state = state;
        _updates.forEach(update => update(_state));
    }

    return [useSingletonState, getSingletonState, updateSingletonState]
}

/*
    Creates global effect hooks that depend on singleton states
*/
export function createSingletonEffect<T>(deps: (() => T)[]) {
    const useSingletonEffect = (body: React.EffectCallback) => {
        // Use the state for each dependency
        deps.forEach(useDepState => useDepState());
        useEffect(body, deps);
    }

    return useSingletonEffect;
}