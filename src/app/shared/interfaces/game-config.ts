import { UserData } from './user-data';

export interface GameConfig {
    start: boolean,
    gameOver: boolean,
    win: boolean,
    wildcardApplied: boolean
    gameQuestions: any,
    qtyOfQuestions: number,
    childsInitialized: number,
    questionNumber: number,
    errorsCommitted: number,
    errorsAllowed: number,
    matches: { win: number, lose: number },
    userData: UserData
}
