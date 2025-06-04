import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, TitleCasePipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    QueryList,
    Renderer2,
    ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatButtonToggleChange,
    MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { TicketService } from 'app/services/admin/ticket.service';
import { AlertService } from 'app/services/alert.service';
@Component({
  selector: 'app-ticket-detalle',
  styles: [
        `
            fuse-card {
                margin: 16px !important;
            }
        `,
    ],
   imports: [
    CommonModule,
    MatButtonToggleModule,
        FormsModule,
        FuseCardComponent,
        MatButtonModule,
        MatIconModule,
        RouterLink,
        NgClass,
        MatMenuModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatDividerModule,
        MatTooltipModule,
        MatCardModule,
        MatChipsModule,
        TitleCasePipe,],
  templateUrl: './ticket-detalle.component.html'
})
export class TicketDetalleComponent implements OnInit {

  @ViewChildren(FuseCardComponent, { read: ElementRef })
    private _fuseCards: QueryList<ElementRef>;

    filters: string[] = [
        'all',
        'article',
        'listing',
        'list',
        'info',
        'shopping',
        'pricing',
        'testimonial',
        'post',
        'interactive',
    ];
    numberOfCards: any = {};
    selectedFilter: string = 'all';

  isLoading = false;

  ticket = {
  folio: 'TCK-000123',
  categoria: 'Infraestructura',
  prioridad: 'Alta',
  area: 'Piso 3 - Urgencias',
  descripcion: 'Fuga de agua cerca de la entrada principal del área de urgencias.',
  afectaOperacion: true,
  fechaDesde: new Date('2025-05-28T08:00:00'),
  estatus: 'Abierto',
  responsable: {
    nombre: 'Dra. María López',
    telefono: '8112345678',
    correo: 'maria.lopez@hospital.com'
  },
  reportante: {
    nombre: 'Juan Pérez',
    telefono: '8112340000',
    correo: 'juan.perez@hospital.com'
  },
  asignado: {
    nombre: 'Carlos Ruiz',
    telefono: '8188889999',
    correo: 'carlos.ruiz@soporte.com'
  },
  archivos: [
    { nombre: 'foto_fuga.jpg', url: '/assets/foto_fuga.jpg' },
    { nombre: 'reporte_preliminar.pdf', url: '/assets/reporte.pdf' }
  ],
  mensajes: [
    {
      creadoPor: 'Sistema',
      tipo: 'sistema',
      fecha: new Date(),
      contenido: 'Ticket creado automáticamente desde el portal.',
      archivoAdjunto: null
    },
    {
      creadoPor: 'Juan Pérez',
      tipo: 'reportante',
      fecha: new Date(),
      contenido: 'Se agregó foto del problema.',
      archivoAdjunto: {
        nombre: 'foto_fuga.jpg',
        url: '/assets/foto_fuga.jpg'
      }
    },
    {
      creadoPor: 'Carlos Ruiz',
      tipo: 'responsable',
      fecha: new Date(),
      contenido: 'Se realizará inspección en sitio a las 10:00 am.',
      archivoAdjunto: null
    }
  ]
};

constructor(
  private route: ActivatedRoute,
  private ticketService: TicketService,
  private alertService:AlertService

) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.ticketService.VerDetalle(id)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      complete: () => {
        //this.btnLoading = false;
      },
      error: () => {
        //this.btnLoading = false;
        this.alertService.showError('Error', 'Ocurrió un error inesperado.');
      }
    })
  }
}
}
