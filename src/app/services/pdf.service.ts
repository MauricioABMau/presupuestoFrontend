import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { Presupuesto } from '../models/presupuesto.model';
import { Gastos } from '../models/gasto.model';
import { Material } from '../models/material.model';
import { Herramienta } from '../models/herramienta.model';
import { ManoObra } from '../models/manoObra.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  public idpro: string = '';
  public idpre;
  public idg: string = '';
  public idi: string = '';
  public cargando: boolean = false;
  public presupuestos: Presupuesto[] = [];
  public gastos: Gastos[] = [];
  public materiales: Material[] = [];
  public herramientas: Herramienta[] = [];
  public manoObra: ManoObra[] = [];
  
  public total: number = 0;
  public totalMaterial: number = 0;
  public totalHerramienta: number = 0;
  public totalManoObra: number = 0;
  public totalManoObra2: number = 0;
  public totalGasto: number = 0;
  public totalGasto2: number[] = [];
  
  public cargaSocial: number = 0;
  public ivaMano: number = 0;
  
  public sueldo: number[] = [];
  public precioMaterial: number[] = [];
  public precioHerramienta: number[] = [];
  
  public preciosTotales: number[] = [];  

  constructor() { }
  async generatePDF(presupuestos: Presupuesto[], materiales: Material[], precioMaterial: number[], totalMaterial: number, 
    manoObra: ManoObra[], sueldo: number[], totalManoObra: number, cargaSocial: number, ivaMano: number, totalManoObra2: number, 
    herramientas: Herramienta[], precioHerramienta: number[], totalHerramienta: number, total: number, totalGasto2: number[]) {  
    
    var bodyPresupuesto = [];
    var bodyMaterial = [];
    var bodyManoObra = [];
    var bodyHeramienta = [];
    var bodyGasto = [];
    
    var totalGasto = totalGasto2[0] + totalGasto2[1] + totalGasto2[2];

    var titulo = ['Proyecto', 'Actividad', 'Unidad', 'Nro', 'Codigo', 'Moneda'];
    const titulo2 = ['Descripcion', 'Unidad', 'Cantidad', 'Precio Producto', 'Costo Total'];
    const titulo3 = ['Descripcion', 'Unidad', 'Cantidad', 'Precio Producto', 'Costo Total'];
    const titulo4 = ['Descripcion', 'Unidad', 'Cantidad', 'Precio Producto', 'Costo Total'];
    const titulo5 = ['Descripcion', 'Unidad', 'Cantidad', 'Precio Producto', 'Costo Total'];
    var utilidad = 0;
    var it = 0;
    
    bodyPresupuesto.push(titulo);
    bodyMaterial.push(titulo2);
    bodyManoObra.push(titulo3);
    bodyHeramienta.push(titulo4);
    bodyGasto.push(titulo5);

    for (let index = 0; index < presupuestos.length; index++) {
      var fila = new Array();
      fila.push(presupuestos[index].proyecto.nombre_proyecto);
      fila.push(presupuestos[index].actividad);
      fila.push(presupuestos[index].unidad);
      fila.push(presupuestos[index].numero);
      fila.push(presupuestos[index].codigo);
      fila.push(presupuestos[index].moneda);
      utilidad = presupuestos[index].utilidad;
      it = presupuestos[index].it;
      bodyPresupuesto.push(fila);
    }

    for (let index = 0; index < materiales.length; index++) {
      var fila = new Array();
      fila.push(materiales[index].nombre_material);
      fila.push(materiales[index].unidad);
      fila.push(materiales[index].cantidad_material);
      fila.push(materiales[index].precio_material);
      fila.push(precioMaterial[index]);
      bodyMaterial.push(fila);
    }
    
    for (let index = 0; index < manoObra.length; index++) {
      var fila = new Array();
      fila.push(manoObra[index].cargo);
      fila.push('hr');
      fila.push(manoObra[index].nro_personal);
      fila.push(manoObra[index].sueldo);
      fila.push(sueldo[index]);
      bodyManoObra.push(fila);
    }
    
    for (let index = 0; index < herramientas.length; index++) {
      var fila = new Array();
      fila.push(herramientas[index].nombre_herramienta);
      fila.push('hr');
      fila.push(herramientas[index].cantidad_herramienta);
      fila.push(herramientas[index].precio_herramienta);
      fila.push(precioHerramienta[index]);
      bodyHeramienta.push(fila);
    }

    let docDefinition = {  
      content: [
        {
          image: await this.getBase64ImageFromURL(
            "../../assets/images/logo-icon.png"
            
          ),
          
          fit: [100, 100]
        },
        {
          text: 'REPORTE DE PRESUPUESTO',
          fontSize: 16,  
          alignment: 'center',  
          color: '#047886'
        },
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 'auto', 'auto', 'auto', 'auto' ],
            body: bodyPresupuesto 
          }
          
        },
        
        {
          text: ' '
        },
        
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 'auto', 'auto', 'auto' ],
            body: bodyMaterial
          }
        },
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto'],
            body: [['Total Material',totalMaterial]]
          }
        },

        {
          text: ' '
        },
        
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 'auto', 'auto', 'auto' ],
            body: bodyManoObra
          }
        },
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto'],
            body: [
              ['Sub Total Mano de Obra', totalManoObra],
              ['Carga Social', cargaSocial],
              ['IVA', ivaMano],
              ['Total Mano de Obra', totalManoObra2],
            ]
          }
        },

        {
          text: ' '
        },
        
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 'auto', 'auto', 'auto' ],
            body: bodyHeramienta
          }
        },
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto'],
            body: [
              ['Total Herramienta', totalHerramienta]
            ]
          }
        },

        {
          text: ' '
        },
        
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 'auto'],
            body: [
              ['Gastos Generales y Administrativos', '', ''],
              [total, (totalGasto).toFixed(2), ((total/100) * (totalGasto)).toFixed(2)],
            ]
          }
        },

        {
          text: ' '
        },
        
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 'auto'],
            body: [
              ['Utilidad', '', ''],
              [utilidad, ((totalGasto)+((total/100) * (totalGasto))).toFixed(2), (((totalGasto)+(total/100) * (totalGasto)) * (utilidad/100)).toFixed(2)],
            ]
          }
        },

        {
          text: ' '
        },
        
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 'auto'],
            body: [
              ['Impuesto', '', ''],
              [it, ((totalGasto)+((total/100) * (totalGasto)) + (((totalGasto)+(total/100) * (totalHerramienta + totalManoObra
                + totalMaterial)) * (utilidad/100))).toFixed(2), (((totalGasto)+((total/100) * (totalGasto)) + (((totalGasto)+(total/100) * (totalHerramienta + totalManoObra
                  + totalMaterial)) * (utilidad/100))) * (it/100)).toFixed(2)],
            ]
          }
        },

        {
          text: ' '
        },
        
        {
          table: {
            headerRows: 1,
            widths: [ '*', 'auto'],
            body: [
              ['TOTAL', ((totalGasto)+((total/100) * (totalGasto)) + (((totalGasto)+(total/100) * (totalHerramienta + totalManoObra
                + totalMaterial)) * (utilidad/100))+((totalGasto)+((total/100) * (totalGasto)) + (((totalGasto)+(total/100)
                * (totalGasto)) * (utilidad/100))) * (it/100)).toFixed(2)],
              
            ]
          }
        },
        
      ]  
    };  
   
    pdfMake.createPdf(docDefinition).open();

  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}
