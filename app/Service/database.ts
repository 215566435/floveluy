import * as Sequelize from 'sequelize';
import { Service } from "egg";


var instance: any = undefined;

export default class DatabaseService extends Service {
    
    constructor(props: any) {
        console.log('调用');
        super(props);
        if (!instance) {
            instance = this;
        }
        return instance;
    }

}