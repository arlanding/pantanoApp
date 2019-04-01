import { UserData } from './user-data';

export interface GameConfig {
    start: boolean,
    gameOver: boolean,
    wildcardApplied: boolean
    gameQuestions: any,
    childsInitialized: number,
    questionNumber: number,
    errorsCommitted: number,
    errorsAllowed: number,
    matches: { win: number, lose: number },
    userData: UserData
}
