import { LightningElement, wire } from 'lwc';
import getProfessores from '@salesforce/apex/ProfessorController.getProfessores';

const COLUMNS = [
    { label: 'Nome', fieldName: 'Name' },
    { label: 'E-mail', fieldName: 'E_mail__c' },
    {  label: 'Titulação', fieldName: 'Titula_o__c'  },
    { label: 'Especialidade', fieldName: 'Especialidade__c' } 
];

export default class Lista_professores extends LightningElement {
    columns = COLUMNS;
    professores;
    erro;

    @wire(getProfessores)
    wiredProfessores({ data, error }) {
        if (data) {
            this.professores = data;
        } else if (error) {
            this.erro = error;
        }
    }
}