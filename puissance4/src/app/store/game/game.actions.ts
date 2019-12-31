export class SwitchPlayer {
    static readonly type = '[Game] SwitchPlayer';
}

export class StopTheGame {
    static readonly type = '[Game] StopTheGame';
    constructor(public draw: boolean) { }
}

export class ResetTheGame {
    static readonly type = '[Game] ResetTheGame';
}