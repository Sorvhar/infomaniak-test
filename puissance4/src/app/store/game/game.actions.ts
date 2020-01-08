export class SwitchPlayer {
  static readonly type = '[Game] SwitchPlayer';
}

export class StartNewGame {
  static readonly type = '[Game] StartNewGame';
}

export class StartRound {
  static readonly type = '[Game] StartRound';
  constructor() { }
}

export class EndRound {
  static readonly type = '[Game] EndRound';
  constructor(public draw: boolean) { }
}
