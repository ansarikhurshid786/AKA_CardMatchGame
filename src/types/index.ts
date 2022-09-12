export interface State {
    value: number,
    isShown: boolean,
    isDone: boolean
}

export interface PreviousState {
    value: number,
    isShown: boolean,
    index: number,
    isDone: boolean
}

export interface Action {
    type: string,
    payload?: { index: number, isShown?: boolean }
}