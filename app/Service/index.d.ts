import FoodService from './food';
import DatabaseService from './database';

declare module 'egg' {
    export interface IService {
        food: FoodService,
        Database: DatabaseService,
    }
}