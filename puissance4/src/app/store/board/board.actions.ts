export class InitializeBoard {
    static readonly type = '[Board] Initialize';
    constructor(public columns: number, public rows: number) { }
}

export class AddToken {
    static readonly type = '[Board] AddToken';
    constructor(public colIndex: number) { }
}