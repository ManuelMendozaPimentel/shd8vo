import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionprendasPageRoutingModule } from './gestionprendas-routing.module';

import { GestionprendasPage } from './gestionprendas.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionprendasPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [GestionprendasPage]
})
export class GestionprendasPageModule {}
