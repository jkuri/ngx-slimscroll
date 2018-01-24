export interface ISlimScrollState {
    scrollPosition: number;
    isScrollAtStart: boolean;
    isScrollAtEnd: boolean;
}

export class SlimScrollState implements ISlimScrollState {
    scrollPosition: number;
    isScrollAtStart: boolean;
    isScrollAtEnd: boolean;
    constructor(obj?: ISlimScrollState) {
        this.scrollPosition = obj && obj.scrollPosition ? obj.scrollPosition : 0;
        this.isScrollAtStart = obj && typeof obj.isScrollAtStart !== 'undefined' ? obj.isScrollAtStart : true;
        this.isScrollAtEnd = obj && typeof obj.isScrollAtEnd !== 'undefined' ? obj.isScrollAtEnd : false;
    }
}
