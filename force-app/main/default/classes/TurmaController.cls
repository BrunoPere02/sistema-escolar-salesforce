public with sharing class TurmaController {
    
    @AuraEnabled(cacheable=true)
    public static List<Turma__c> getTurmas() {
        return [
            SELECT Id, Name, Professor__r.Name, Quantidade_de_Alunos__c, Status__c
            FROM Turma__c
            ORDER BY Name
        ];
    }
}