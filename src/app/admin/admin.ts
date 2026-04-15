import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AccomplissementService } from '../accomplissement-service';
import { AuthService } from '../AuthService';
import { ModelAccomplissement } from '../ModelAccomplissement';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule ,RouterModule ,CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComp implements OnInit {

  accomplissements: ModelAccomplissement[] = [];
  form: FormGroup;
  currentUserName = '';
  currentUserRole = '';

  constructor(
    private fb: FormBuilder,
    private accomService: AccomplissementService,
    private auth: AuthService,
      private cdr: ChangeDetectorRef
  ) {
   
    this.form = this.fb.group({
      nom: ['', Validators.required],
      typeAccomplissement: ['', Validators.required],
      dateRealisation: ['', Validators.required],
      technologie: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    const user = this.auth.getUser();
    




    if (!user || user.role.toLowerCase() !== 'admin') {
      Swal.fire({
        icon: 'error',
        title: 'Accès refusé',
        text: 'Vous n’êtes pas autorisé à accéder à cette page',
        timer: 2500,
        showConfirmButton: false
      });
      return;
    }

    this.currentUserName = user.username;
    this.currentUserRole = user.role;

    this.loadAccomplissements();
  }


  loadAccomplissements(): void {
    this.accomService.getAccomplissements().subscribe({
      next: data => {
        this.accomplissements = data.map(a => new ModelAccomplissement(
         
          a.typeAccomplissement,
          a.nom,
          a.dateRealisation,
          a.technologie,
          a.description,
           a.id 
        ));
             console.log('Accomplissements chargés avec ID :', this.accomplissements);
            this.cdr.detectChanges(); 
      },

      
      error: err => console.error('Erreur chargement', err)
    });
  }


  addAccomplissement(): void {
    if (this.form.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs requis', 'error');
      return;
    }

    const newAccom = new ModelAccomplissement(
    
      this.form.value.typeAccomplissement,
      this.form.value.nom,
      this.form.value.dateRealisation,
      this.form.value.technologie,
      this.form.value.description,
 
    );

    this.accomService.addAccomplissement(newAccom).subscribe({
      next: () => {
        Swal.fire('Ajouté !', 'Accomplissement ajouté avec succès', 'success');
        this.form.reset();
        this.loadAccomplissements();
      },
      error: err => Swal.fire('Erreur', 'Impossible d\'ajouter', 'error')
    });
  }

deleteAccomplissement(id?: number): void {
  
  if (id == null) {
    console.warn('Aucun ID fourni pour la suppression');
    return;
  }
  console.log('Suppression ID :', id);

  Swal.fire({
    title: 'Confirmer la suppression',
    text: 'Êtes-vous sûr de vouloir supprimer cet accomplissement ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Non, annuler'
  }).then(result => {
    if (result.isConfirmed) {
      this.accomService.deleteAccomplissement(id).subscribe({
        next: () => {
          Swal.fire('Supprimé !', 'Accomplissement supprimé.', 'success');
          this.loadAccomplissements();
        },
        error: err => Swal.fire('Erreur', 'Impossible de supprimer', 'error')
      });
    }
  });
}


}