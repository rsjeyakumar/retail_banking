import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './landing/landing.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { UserTransactionComponent } from './user-transaction/user-transaction.component';
import { SharedModule } from '../../shared/shared.module';
import { MortgageSummaryComponent } from './user-transaction/mortgage-summary/mortgage-summary.component';

@NgModule({
  declarations: [LandingComponent, FundTransferComponent, UserTransactionComponent, MortgageSummaryComponent],
  imports: [
    CommonModule,
    HomeRoutingModule, SharedModule
  ]
})
export class HomeModule { }
