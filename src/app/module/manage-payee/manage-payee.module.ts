import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ManagePayeeRoutingModule } from './manage-payee-routing.module';
import { PayeeListComponent } from './payee-list/payee-list.component';
import { AddEditDeletePayeeComponent } from './add-edit-delete-payee/add-edit-delete-payee.component';


@NgModule({
  declarations: [PayeeListComponent, AddEditDeletePayeeComponent],
  imports: [
    CommonModule,
    ManagePayeeRoutingModule, SharedModule
  ]
})
export class ManagePayeeModule { }
