export interface Workout{
    id?:String
    username:string;
    date: Date;
    isRestDay: boolean;
    duration?: number;
    exercises?: string[];
    
}