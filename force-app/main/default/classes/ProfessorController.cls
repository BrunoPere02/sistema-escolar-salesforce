public with sharing class ProfessorController {
    
    @AuraEnabled(cacheable=true)
    public static List<Professor__c> getProfessores() {
        return [
           SELECT Id, Name, E_mail__c, Titula_o__c, Especialidade__c
           FROM Professor__c
            ORDER BY Name
        ];
    }
}