import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraService } from 'src/app/services/carrera.service';
import { Carrera } from 'src/app/models/carrera';

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})
export class CarreraFormComponent implements OnInit {
  title = "Registro de una nueva carrera";

  carrera : Carrera = new Carrera();
  
  form: FormGroup;  

  constructor(
    private carreraService: CarreraService, 
    private formBuilder: FormBuilder, 
    private activatedRoute : ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      departamento: [''],
      modalidad: [''],
      duracion: [''],
      coordinadorr: [''],          
      titulo_otorgado: [''],      
    });  

    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.carreraService.retrieve(params['id']).subscribe(
              result =>
              { 
                this.carrera = result;
                this.title = "Actualizando el registro de " + this.carrera.nombre;
              }
          )
        }
      }
    );
  
  }


  onSubmit() : void {
    if(this.form.invalid){
      console.error('Error en formulario');
      return;
    }

    console.log(this.carrera);

    this.carreraService.save(this.carrera).subscribe(
      result => {
        console.log(result);   
        this.router.navigate(['carrera/list']);

      }
    );
  }

  onReset() : void {   
    this.form.reset();    
  }


}
