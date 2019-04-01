import { UserData } from './user-data';

export interface UserInfo {
    userData: UserData, 
    matches: { win: number, lose: number } 
}
