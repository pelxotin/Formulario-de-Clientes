import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.novoCliente();

  constructor(
    private service: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      const clienteEncontrado = this.service.buscarPorId(id);

      if(clienteEncontrado){
        this.cliente = clienteEncontrado;
      }
    }

  }

  salvarCliente() {

    this.service.salvarCliente(this.cliente);

    this.cliente = Cliente.novoCliente();

  }

}