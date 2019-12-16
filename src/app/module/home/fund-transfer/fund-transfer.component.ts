import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { Tranaction, SuccessResponse } from '../../../models/app.models';
import { EndPoints } from '../../../shared/services/end-points.enum';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  fundTransferForm: FormGroup;
  fundTransferSpin: boolean;
  apiMessage: object;
  accountNumber: number;
  userName: string;
  accountType: string;
  accountId: number;
  payeeList: [];
  accountBalance: SuccessResponse;
  constructor(private http: HttpService) { }

  ngOnInit() {
    /* user Details */
    this.accountNumber = JSON.parse(sessionStorage.getItem('user')).accountNumber;
    this.userName = JSON.parse(sessionStorage.getItem('user')).userName;
    this.accountType = JSON.parse(sessionStorage.getItem('user')).accountType;
    this.accountId = JSON.parse(sessionStorage.getItem('user')).accountId;

    /* fund transfer form creation */
    this.fundTransferForm = new FormGroup({
      payeeAccountId: new FormControl(null, [Validators.required]),
      transferAmount: new FormControl(null, [Validators.required, this.validatePositive]),
      remarks: new FormControl(null, [Validators.required])
    });

    /* palyee list call on load */
    this.getPayeeList();
    this.getBalance();
  }

  /* Get user Account Balance */
  getBalance() {
    const endpoint = EndPoints.PAYEELIST + '/' + this.accountId + '/balances';
    this.http.readData(endpoint).subscribe(
      (res: SuccessResponse) => {
        if (res.statusCode === 200) {
          this.accountBalance = res;
        }
      }
    );

  }


  /* Fundtransfer API Submit */
  fundTransfer() {
    this.fundTransferSpin = true;
    const endpoint = EndPoints.TRANSACTION;
    const postObj: Tranaction = {
      accountId: this.accountId,
      payeeAccountId: Number(this.fundTransferForm.value.payeeAccountId),
      remarks: this.fundTransferForm.value.remarks,
      transferAmount: Number(this.fundTransferForm.value.transferAmount)
    };
    this.http.createData(endpoint, postObj).subscribe(
      (res: SuccessResponse) => {
        if (res.statusCode === 200) {
          this.fundTransferSpin = false;
          this.apiMessage = res;
          this.fundTransferForm.reset();
          this.getBalance();
        }
        if (res.statusCode === 400) {
          this.fundTransferSpin = false;
          this.apiMessage = res;
          this.fundTransferForm.reset();
        }

      }
    );
  }

  /* Get Payee list */
  getPayeeList() {
    const endpoint = EndPoints.PAYEELIST + '/' + this.accountId;
    this.http.readData(endpoint).subscribe(
      (res: []) => {
        if (res.length >= 0) {
          this.payeeList = res;
        }

      }
    );

  }
  /* Fundtransfer form reset */
  resetfundtransfer() {
    this.fundTransferForm.reset();
  }

  /* validate if interger is positive or not */
  validatePositive(c: FormControl) {
    const n = Math.floor(Number(c.value));
    return n !== Infinity && String(n) === c.value && n >= 0 ? null : {
      validatePositive: {
        valid: false
      }
    };
  }

  /* Validate Number  */
  validateNumber(c: FormControl) {
    const numberExp: RegExp = /^[0-9]*$/;
    console.dir(c);
    return numberExp.test(c.value) ? null : {
      validateNumber: {
        valid: false
      }
    };

  }

}
