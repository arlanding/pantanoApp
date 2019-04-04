import { UserData } from './user-data';

export interface GameConfig {
    gameOver: boolean,
    win: boolean,
    wildcardApplied: boolean
    gameQuestions: any,
    userAnswers: any[],
    qtyOfQuestions: number,
    childsInitialized: number,
    questionNumber: number,
    errorsCommitted: number,
    errorsAllowed: number,
    matches: { win: number, lose: number },
    userData: UserData
}
