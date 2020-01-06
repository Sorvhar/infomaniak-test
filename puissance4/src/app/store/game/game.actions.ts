export class SwitchPlayer {
  static readonly type = '[Game] SwitchPlayer';
}

export class StartTheGame {
  static readonly type = '[Game] StartTheGame';
}

export class StopTheGame {
  static readonly type = '[Game] StopTheGame';
  constructor(public draw: boolean) { }
}
