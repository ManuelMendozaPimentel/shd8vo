import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionprendasPage } from './gestionprendas.page';

const routes: Routes = [
  {
    path: '',
    component: GestionprendasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionprendasPageRoutingModule {}
