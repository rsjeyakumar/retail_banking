import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { UserTransactionComponent } from './user-transaction/user-transaction.component';
import { MortgageSummaryComponent } from './user-transaction/mortgage-summary/mortgage-summary.component';

/* Addcound summary , Fund transfer and user transaction routing module configuration */

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'fund-transfer',
    component: FundTransferComponent
  },
  {
    path: 'user-transaction',
    component: UserTransactionComponent
  },
  {
    path: 'mortage-summary',
    component: MortgageSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
