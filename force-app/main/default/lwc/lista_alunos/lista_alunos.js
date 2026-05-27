import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAlunos from '@salesforce/apex/AlunoController.getAlunos';

const COLUMNS = [
    { label: 'Nome', fieldName: 'Name' },
    { label: 'CPF', fieldName: 'CPF__c' },
    { label: 'E-mail', fieldName: 'E_mail__c' },
    { label: 'Status', fieldName: 'Status__c' }
];

export default class Lista_alunos extends NavigationMixin(LightningElement) {
    columns = COLUMNS;
    @track alunos;
    erro;
    statusSelecionado = '';

    statusOptions = [
        { label: 'Todos', value: '' },
        { label: 'Ativo', value: 'Ativo' },
        { label: 'Inativo', value: 'Inativo' },
        { label: 'Formado', value: 'Formado' }
    ];

    _todosAlunos = [];

    @wire(getAlunos)
    wiredAlunos({ data, error }) {
        if (data) {
            this._todosAlunos = data;
            this.alunos = data;
        } else if (error) {
            this.erro = error;
        }
    }

    handleFiltro(event) {
        this.statusSelecionado = event.detail.value;
        if (this.statusSelecionado === '') {
            this.alunos = this._todosAlunos;
        } else {
            this.alunos = this._todosAlunos.filter(
                aluno => aluno.Status__c === this.statusSelecionado
            );
        }
    }

    novoRegistro() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Aluno__c',
                actionName: 'new'
            }
        });
    }
}