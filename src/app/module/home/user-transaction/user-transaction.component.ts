import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../shared/services/http.service';
import { EndPoints } from '../../../shared/services/end-points.enum';
import { Tranaction } from '../../../models/app.models';

@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.css']
})
export class UserTransactionComponent implements OnInit {
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  months: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  years: string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
  montholyRespose;
  accountNumber: number;
  userName: string;
  accountType: string;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.accountNumber = JSON.parse(sessionStorage.getItem('user')).accountNumber;
    this.userName = JSON.parse(sessionStorage.getItem('user')).userName;
    this.accountType = JSON.parse(sessionStorage.getItem('user')).accountType;

  }

  /* filter data based on selected month and year */
  filterTransaction(formValue) {
    const filterobj = {
      month: +formValue.month + 1,
      year: formValue.year
    };
    const userid = JSON.parse(sessionStorage.getItem('user')).accountId;
    const endpoints = EndPoints.MONTHLYTRANSACTION + '/' + userid + '?month=' + filterobj.month + '&year=' + filterobj.year;
    this.http.readData(endpoints).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          this.montholyRespose = res;
        }
      }
    );
  }

}
