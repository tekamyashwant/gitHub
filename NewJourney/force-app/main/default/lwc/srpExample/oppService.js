import {oppServiceCTO} from './oppServiceCTO.js';
import {oppServiceSalesAssociate} from './oppServiceSalesAssociate.js';
import {oppServiceManager}  from './oppServiceManager.js';
import {oppServiceFactory} from './oppServiceFactory.js';

export class oppService{
    calculateOpps(userType){
        let classType;
        if(userType==='CTO'){
            classType=new oppServiceCTO();
        }else if(userType==='Sales Associate'){
            classType=new oppServiceSalesAssociate();
        }else if(userType==='Manager'){
            classType=new oppServiceManager();
        }else{
            console.log('No class instance created');
        }
        const oppServiceFactory1=new oppServiceFactory(classType);
        oppServiceFactory1.calculateOpps();
    }
}