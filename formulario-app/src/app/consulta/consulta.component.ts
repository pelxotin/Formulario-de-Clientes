import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cadastro/cliente';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css',
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class ConsultaComponent implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];

  constructor(
    private service: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisarCliente() {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string | undefined) {
    this.router.navigate(['/cadastro', id]);
  }

  deletar(id: string | undefined) {
    if (confirm("Deseja realmente deletar este cliente?")) {
      this.service.deletarCliente(id);
      this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
    }
  }

}