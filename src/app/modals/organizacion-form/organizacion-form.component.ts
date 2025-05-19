import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, matDialogAnimations, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { OrganizacionService } from 'app/services/admin/organizacion.service';

@Component({
  selector: 'app-organizacion-form',
  templateUrl: './organizacion-form.component.html',
  imports: [MatFormField, MatLabel, MatDialogActions, MatDialogContent, FormsModule,
          ReactiveFormsModule,
          MatFormFieldModule,
          MatIcon,
          MatButton,
    MatInputModule,]
})
export class OrganizacionFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrganizacionFormComponent>,
    private organizacionService: OrganizacionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      responsable: ['', Validators.required],
    });
  }

  save(): void {
    if (this.form.valid) {
      //this.dialogRef.close(this.form.value);
      this.organizacionService.Crear(this.form.value)
      .subscribe({
          next: (response) => {
            //this.dataSource.data = response;
          },
          error:(err)=>{
            //this.msg.error(err.error.message);
            //this.loadData();
          },
          complete() {
            this.isLoading = false;
          },
        });
      console.log(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
