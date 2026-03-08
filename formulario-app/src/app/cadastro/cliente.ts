export class Cliente {
    id?: string = '';
    nome?: string = '';
    cpf?: string = '';
    datanascimento?: string = '';
    telefone?: string = '';
    email?: string = '';

    //metodo

    static novoCliente() {
        const cliente = new Cliente();
        return cliente;

    }
}