import { LightningElement, wire, track } from 'lwc';
import getAlunos from '@salesforce/apex/AlunoController.getAlunos';

const COLUMNS = [
    { label: 'Nome', fieldName: 'Name' },
    { label: 'CPF', fieldName: 'CPF__c' },
    { label: 'E-mail', fieldName: 'E_mail__c' },
    { label: 'Status', fieldName: 'Status__c' }
];

export default class Lista_alunos extends LightningElement {
    columns = COLUMNS;
    @track alunosFiltrados;
    todosAlunos;
    statusSelecionado = 'Todos';

    opcoesStatus = [
        { label: 'Todos', value: 'Todos' },
        { label: 'Matriculado', value: 'Matriculado' },
        { label: 'Formado', value: 'Formado' },
        { label: 'Inativo', value: 'Inativo' }
    ];

    @wire(getAlunos)
    wiredAlunos({ data, error }) {
        if (data) {
            this.todosAlunos = data;
            this.alunosFiltrados = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleFiltro(event) {
        this.statusSelecionado = event.detail.value;
        if (this.statusSelecionado === 'Todos') {
            this.alunosFiltrados = this.todosAlunos;
        } else {
            this.alunosFiltrados = this.todosAlunos.filter(
                aluno => aluno.Status__c === this.statusSelecionado
            );
        }
    }
}