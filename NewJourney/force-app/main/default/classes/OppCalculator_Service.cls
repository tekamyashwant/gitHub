public with sharing class OppCalculator_Service {
    private static Map<String,Type> userTypeToCalculateImp=new Map<String,Type>{
        'CTO' =>OppCalculatorService_CTO.class,
        'Sales Associate' =>OppCalculatorService_SalesAssociate.class,
        'Manager' =>OppCalculatorService_Managers.class
    };
    public static void calculateOpps(String userType){
        //Service Logic
        System.debug('Inside OppCalculator_Service ');    
        OppCalculator_Interface oppCalculator=
            (OppCalculator_Interface)userTypeToCalculateImp.get(userType).newInstance();
        oppCalculator.calculateOpps();
    }
}