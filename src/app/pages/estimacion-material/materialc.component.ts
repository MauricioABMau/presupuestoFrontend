import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Material } from '../../models/material.model';
import { MaterialService } from '../../services/material.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materialc',
  templateUrl: './materialc.component.html',
  styles: [
  ]
})
export class MaterialcComponent implements OnInit {

  public materialForm: FormGroup;
  public materials: Material[] = [];
  public materialSeleccionado: Material;
  public url: string = '';
  public idit: string = '';

  constructor(private fb: FormBuilder,
              private materialService: MaterialService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(({id}) => {
       this.cargarMaterialById(id);
       this.idit = id;
    })
    this.materialForm = this.fb.group({
      nombre_material: ['', Validators.required],
      cantidad_material: ['', Validators.required],
      precio_material: ['', Validators.required],
    });
    this.cargarMaterial();
    
  }

  cargarMaterial() {
    this.materialService.cargarMaterial()
    .subscribe(material => {
      this.materials = material;
    })
  }
  
  cargarMaterialById(id: string) {
    this.url = this.activatedRoute.snapshot.url[1].path;

    if(this.url === 'nuevo') {
      return;
    }
    this.materialService.obtenerMaterialPorId(id)
    .subscribe(material => {
      if(!material) {
        return this.router.navigateByUrl(`dashboard/material`)
      }
      const{nombre_material, precio_material, cantidad_material} = material;
      console.log(material);
      this.materialSeleccionado = material;
      this.materialForm.setValue({nombre_material, precio_material, cantidad_material})
    })
  }

  guardarMaterial() {
    const {id} = this.materialForm.value;

    if(this.materialSeleccionado) {
      //actualizar
      const data = { ...this.materialForm.value, id: this.materialSeleccionado.id}
      this.materialService.actualizarMaterial(data)
      .subscribe(resp => {
        Swal.fire('Actualizado', `${id} actualizado`, 'success')
      })
    } else {
      //crear
      
      this.materialService.crearMaterial(this.materialForm.value, this.idit)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${id} creado correctamente`, 'success');
        this.router.navigateByUrl(`dashboard/item`)
      })
    }
  }

}
