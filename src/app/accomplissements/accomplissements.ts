import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';

import { ModelAccomplissement} from '../ModelAccomplissement';
import { AccomplissementService } from '../accomplissement-service';

import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-accomplissements',
  templateUrl: './accomplissements.html',
  styleUrls: ['./accomplissements.css'],
      standalone: true,         
  imports: [CommonModule, RouterModule , NgFor, NgIf],

})


export class Accomplissements implements OnInit {

  accomplissements: ModelAccomplissement[] = [];

constructor(
  private accomService: AccomplissementService,
  private cdr: ChangeDetectorRef
) {}


  
  ngOnInit(): void {
    this.loadAccomplissements();



  }
loadAccomplissements(): void {
  this.accomplissements = []; 

  this.accomService.getAccomplissements().subscribe({
    next: (data: ModelAccomplissement[]) => {
      this.accomplissements = data.slice(0, 12);
      console.log('Accomplissements chargés :', this.accomplissements);

      this.cdr.detectChanges(); 
    },
    error: (err) => console.error('Erreur API :', err)
  });
}


 openId: number | null = null;

toggleDescription(id?: number): void {
    if (id === undefined) return;
    this.openId = this.openId === id ? null : id;
    console.log('openId actuel :', this.openId);
  }

  // Vérifie si la description d'un ID doit être affichée
  isDescriptionOpen(id?: number): boolean {
    if (id === undefined) return false;
    return this.openId === id;
  }


}