export interface Exercise{
    id:string;
    name:string;
    muscleGroup: 'chest' | 'back' | 'legs' | 'arms' | 'shoulders' | 'abs';
    description: string;
    calories: number;
    repetitions: number;
    
}