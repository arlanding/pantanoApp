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
    lifes: number,
    matches: { win: number, lose: number },
    userData: UserData
}
