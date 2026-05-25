import { LightningElement, wire } from 'lwc';
import getTurmas from '@salesforce/apex/TurmaController.getTurmas';

const COLUMNS = [
    { label: 'Nome', fieldName: 'Name' },
    { label: 'Professor', fieldName: 'ProfessorName' },
    { label: 'Qtd Alunos', fieldName: 'Quantidade_de_Alunos__c' },
    { label: 'Status', fieldName: 'Status__c' }
];

export default class Lista_turmas extends LightningElement {
    columns = COLUMNS;
    turmas;
    erro;

    @wire(getTurmas)
    wiredTurmas({ data, error }) {
        if (data) {
            this.turmas = data.map(turma => ({
                ...turma,
                ProfessorName: turma.Professor__r ? turma.Professor__r.Name : 'Sem professor'
            }));
        } else if (error) {
            this.erro = error;
        }
    }
}