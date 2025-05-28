import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardComponent } from '@fuse/components/card';

@Component({
  selector: 'app-tickets',
  imports: [
    
      MatSelectModule,
      MatFormFieldModule,
      MatOptionModule,
      MatFormField,
      MatLabel,
      MatTableModule,
      FuseCardComponent,
      MatDialogActions,
      MatDialogContent,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatRadioModule,
      MatIcon,
      MatTooltipModule,
      MatButton,
      MatInputModule,
      CommonModule,
      MatProgressSpinnerModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
filtroTexto: string = '';
  filtroArea: string = '';
  filtroCategoria: string = '';
  filtroPrioridad: string = '';

  columnas: string[] = [
    'folio',
    'organizacion',
    'solicitante',
    'area',
    'estatus',
    'categoria',
    'prioridad',
    'descripcion',
    'contacto',
    'afectaOperacion',
    'fechaCreacion',
    'asignado',
    'acciones'
  ];

  tickets = [
    {
      folio:1,
      solicitante: 'Juan Pérez',
      area: 'Urgencias',
      estatus: 'Abierto',
      categoria: 'Equipo Médico',
      prioridad: 'Alta',
      descripcion: 'El monitor de signos vitales no enciende.',
      contacto: { nombre: 'Juan Pérez', telefono: '555-123-4567' },
      afectaOperacion: true,
      fechaCreacion: new Date('2025-05-20'),
      asignado:'',
      organizacion:'UMAE Especialidades Nuevo Leon'
    },
    {
      folio:1,
      solicitante: 'Ana Gómez',
      area: 'Laboratorio',
      estatus: 'Abierto',
      categoria: 'Infraestructura',
      prioridad: 'Media',
      descripcion: 'Fuga de agua debajo del fregadero.',
      contacto: { nombre: 'Ana Gómez', telefono: '555-987-6543' },
      afectaOperacion: false,
      fechaCreacion: new Date('2025-05-18'),
      asignado:'',
      organizacion:'UMAE Especialidades Nuevo Leon'
    },
    {
      folio:1,
      solicitante: 'Luis Ramírez',
      area: 'Rayos X',
      estatus: 'Abierto',
      categoria: 'Sistema',
      prioridad: 'Alta',
      descripcion: 'El sistema PACS no conecta.',
      contacto: { nombre: 'Luis Ramírez', telefono: '555-555-5555' },
      afectaOperacion: true,
      fechaCreacion: new Date('2025-05-22'),
      asignado:'',
      organizacion:'UMAE Especialidades Nuevo Leon'
    }
  ];

  get areasUnicas() {
    return [...new Set(this.tickets.map(t => t.area))];
  }

  get categoriasUnicas() {
    return [...new Set(this.tickets.map(t => t.categoria))];
  }

  get prioridadesUnicas() {
    return [...new Set(this.tickets.map(t => t.prioridad))];
  }

  getPrioridadClass(prioridad: string) {
    switch (prioridad) {
      case 'Alta':
        return 'bg-red-100 text-red-700 font-semibold px-2 py-1 rounded-full text-sm';
      case 'Media':
        return 'bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded-full text-sm';
      case 'Baja':
        return 'bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full text-sm';
      default:
        return 'bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm';
    }
  }

  filteredTickets() {
    return this.tickets.filter(ticket => {
      const texto = this.filtroTexto.toLowerCase();
      return (
        (!this.filtroArea || ticket.area === this.filtroArea) &&
        (!this.filtroCategoria || ticket.categoria === this.filtroCategoria) &&
        (!this.filtroPrioridad || ticket.prioridad === this.filtroPrioridad) &&
        (
          ticket.solicitante.toLowerCase().includes(texto) ||
          ticket.area.toLowerCase().includes(texto) ||
          ticket.categoria.toLowerCase().includes(texto) ||
          ticket.descripcion.toLowerCase().includes(texto)
        )
      );
    });
  }
}