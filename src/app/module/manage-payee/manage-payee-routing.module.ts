import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayeeListComponent } from './payee-list/payee-list.component';
import { AddEditDeletePayeeComponent } from './add-edit-delete-payee/add-edit-delete-payee.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list', pathMatch: 'full'
  },
  {
    path: 'list',
    component: PayeeListComponent
  },
  {
    path: 'manage/:action',
    component: AddEditDeletePayeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePayeeRoutingModule { }
