import { LightningElement, wire } from 'lwc';
import getAlunos from '@salesforce/apex/AlunoController.getAlunos';

const COLUMNS = [
    { label: 'Nome', fieldName: 'Name' },
    { label: 'CPF', fieldName: 'CPF__c' },
    { label: 'E-mail', fieldName: 'E_mail__c' },
    { label: 'Status', fieldName: 'Status__c' }
];

export default class Lista_alunos extends LightningElement {
    columns = COLUMNS;
    alunos;
    erro;

    @wire(getAlunos)
    wiredAlunos({ data, error }) {
        if (data) {
            this.alunos = data;
        } else if (error) {
            this.erro = error;
        }
    }
}