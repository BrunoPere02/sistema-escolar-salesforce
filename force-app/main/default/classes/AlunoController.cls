public with sharing class AlunoController {
    
    @AuraEnabled(cacheable=true)
    public static List<Aluno__c> getAlunos() {
        return [
            SELECT Id, Name, CPF__c, E_mail__c, Status__c
            FROM Aluno__c
            ORDER BY Name
        ];
    }
}