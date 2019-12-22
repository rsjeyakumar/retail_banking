import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { HttpService } from './../../shared/services/http.service';
import { EndPoints } from './../../shared/services/end-points.enum';
import { USERACCOUNTS, ACCOUNTSEARCH, MARTAGEACCOUNTRESPONSE } from '../../models/app.models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  display = false;

  searchAccount: FormGroup;
  createMortgageForm: FormGroup;
  accountSummaryList: USERACCOUNTS;
  accountSummary;
  mortageResponse;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.searchAccount = new FormGroup({
      accountNumber: new FormControl()
    });
    this.createMortgageForm = new FormGroup({
      propertyValue: new FormControl(null)
    });
  }
  showDialog(params) {
    this.display = true;
    this.accountSummary = params;
  }


  /* filter the account based on user enter */
  filterAccount(event) {
    const endpoint = `${EndPoints.PAYEELIST}/search/${event}`;
    this.http.readData(endpoint).subscribe(
      (res: ACCOUNTSEARCH) => {
        this.accountSummaryList = res.userAccounts;
        console.log(res.userAccounts);
      }
    );
  }

  /* filter the account based on user enter */
  createMortgageAcc(params) {
    const obj = {
      userId: this.accountSummary.userId,
      accountType: 'Mortgage',
      propertyValue: Number(this.createMortgageForm.value.propertyValue)
    };
    const endpoint = `${EndPoints.MORTGAGEACCOUNTS}`;
    this.http.createData(endpoint, obj).subscribe(
      (res: MARTAGEACCOUNTRESPONSE) => {
        if (res.statusCode === 200) {
          this.mortageResponse = res;
        }
      }
    );
  }
}
