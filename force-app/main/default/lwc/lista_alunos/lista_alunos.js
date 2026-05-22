import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

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

    @wire(graphql, {
        query: gql`
            query getAlunos {
                uiapi {
                    query {
                        Aluno__c {
                            edges {
                                node {
                                    Id
                                    Name { value }
                                    CPF__c { value }
                                    E_mail__c { value }
                                    Status__c { value }
                                }
                            }
                        }
                    }
                }
            }
        `
    })
    wiredAlunos({ data, error }) {
        if (data) {
            this.alunos = data.uiapi.query.Aluno__c.edges.map(edge => ({
                Id: edge.node.Id,
                Name: edge.node.Name.value,
                CPF__c: edge.node.CPF__c.value,
                E_mail__c: edge.node.E_mail__c.value,
                Status__c: edge.node.Status__c.value
            }));
        } else if (error) {
            this.erro = error;
        }
    }
}
