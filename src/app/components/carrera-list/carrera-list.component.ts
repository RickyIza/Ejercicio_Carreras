import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera';
import { CarreraService } from 'src/app/services/carrera.service';
import {  faEye,  faPlus,faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrera-list',
  templateUrl: './carrera-list.component.html',
  styleUrls: ['./carrera-list.component.css']
})
export class CarreraListComponent implements OnInit {
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;


  carreras:Carrera[];

  constructor(private carreraService:CarreraService) { }

  ngOnInit(): void {
    this.list();
  }

  list() : void {
    this.carreraService.list().subscribe(result => this.carreras = result);
  }

  delete(a:Carrera) :void {
    Swal.fire({
      title: '¿Está seguro de continuar?',
      text: "La Carrera " + a.nombre + " será eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.carreraService.delete(a).subscribe(
          result => {
            console.log(result);
            this.list();
          }
        )
      }
    })
  }


}

