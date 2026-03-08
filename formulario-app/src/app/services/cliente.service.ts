import { Injectable } from '@angular/core';
import { Cliente } from '../cadastro/cliente';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  private obterStorage(): Cliente[] {

    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);

    if (repositorioClientes) {
      return JSON.parse(repositorioClientes);
    }

    const clientes: Cliente[] = [];

    localStorage.setItem(
      ClienteService.REPO_CLIENTES,
      JSON.stringify(clientes)
    );

    return clientes;
  }

  salvarCliente(cliente: Cliente) {

    const storage = this.obterStorage();

    if(cliente.id){

      const index = storage.findIndex(c => c.id === cliente.id);

      storage[index] = cliente;

    }else{

      cliente.id = uuid();

      storage.push(cliente);

    }

    localStorage.setItem(
      ClienteService.REPO_CLIENTES,
      JSON.stringify(storage)
    );
  }

  pesquisarClientes(nome: string): Cliente[] {

    const clientes = this.obterStorage();

    if (!nome) return clientes;

    return clientes.filter(cliente =>
      cliente.nome?.toLowerCase().includes(nome.toLowerCase())
    );
  }

  buscarPorId(id: string): Cliente | undefined {

    const clientes = this.obterStorage();

    return clientes.find(cliente => cliente.id === id);

  }

  deletarCliente(id: string | undefined) {

    const clientes = this.obterStorage();

    const novaLista = clientes.filter(cliente => cliente.id !== id);

    localStorage.setItem(
      ClienteService.REPO_CLIENTES,
      JSON.stringify(novaLista)
    );
  }

  limparCliente(cliente: any) {
    Object.keys(cliente).forEach(item => cliente[item] = "");
  }

}