import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../shared/services/http.service';
import { EndPoints } from '../../../shared/services/end-points.enum';
import { IFSCCODE, USERACCOUNTS, ACCOUNTSEARCH, IFSCCODERESPONSE, SuccessResponse } from '../../../models/app.models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-delete-payee',
  templateUrl: './add-edit-delete-payee.component.html',
  styleUrls: ['./add-edit-delete-payee.component.css'],
  providers: [MessageService]
})
export class AddEditDeletePayeeComponent implements OnInit {
  addpayee: FormGroup;
  data;
  pageName: string;
  payeeDetails;
  IFSCdetails: IFSCCODERESPONSE;
  accountNumber: number;
  userName: string;
  accountType: string;
  accountId: number;
  phoneNumber: number;
  editId: number;
  deletePayeemsg;
  addeditresponse;
  accountSummaryList: USERACCOUNTS;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.accountNumber = JSON.parse(sessionStorage.getItem('user')).accountNumber;
    this.userName = JSON.parse(sessionStorage.getItem('user')).userName;
    this.accountType = JSON.parse(sessionStorage.getItem('user')).accountType;
    this.accountId = JSON.parse(sessionStorage.getItem('user')).accountId;
    this.phoneNumber = JSON.parse(sessionStorage.getItem('user')).phoneNumber;
    this.route.params.subscribe(res => {
      this.pageName = res.action;
      if (this.pageName === 'edit') {
        this.route.queryParams.subscribe(res => {
          this.editId = res.id;
          this.getSinglepayee();
          // this.getSinglepayee(this.currentPayeeId);
        });
      }
      // this.getSinglepayee(this.currentPayeeId);
    });

    this.addpayee = new FormGroup({
      payee_nick_name: new FormControl(null, [Validators.required]),
      payee_accno: new FormControl(null, [Validators.required, this.validateNumber]),
      payee_confirm_accno: new FormControl(null, [Validators.required, this.validateNumber]),
      ifcs_code: new FormControl(null, [Validators.required]),
      isFavorite: new FormControl(false, [])
    });


  }




  /* Get IFSC Deatils */
  getIFSCDetails(ifsccode) {
    const endpoint = `${EndPoints.IFSCCODESEARCH}/${this.addpayee.value.ifcs_code}`;
    this.http.payeereadData(endpoint).subscribe(
      (res: IFSCCODERESPONSE) => {
        this.IFSCdetails = res;
      });
  }
  /* Add Payeedlist */
  addPayee() {
    this.data = {
      accountNumber: this.addpayee.value.payee_accno,
      customerId: this.phoneNumber,
      ifscCode: this.addpayee.value.ifcs_code,
      isFavorite: false,
      nickName: this.addpayee.value.payee_nick_name
    };
    if (this.pageName === 'edit') {
      const endpoint = `${EndPoints.BENEFICIARYLIST}/${this.editId}`;
      this.http.payeeupdateData(endpoint, this.data).subscribe((res: SuccessResponse) => {
        const response: SuccessResponse = res;
        if (response.statusCode === 400 || response.statusCode === 404) {
          this.addeditresponse = response;
        } else {
          this.addpayee.reset();
          this.router.navigate(['/payee/list']);
        }
      });
    } else {
      const endpoint = `${EndPoints.BENEFICIARYLIST}`;
      this.http.payeecreateData(endpoint, this.data).subscribe((res: SuccessResponse) => {
        const response = res;
        if (response.statusCode === 400 || response.statusCode === 404) {
          this.addeditresponse = response;
        } else {
          this.addpayee.reset();
          this.router.navigate(['/payee/list']);
        }

      });
    }


  }

  /* Get single payee list */

  getSinglepayee() {
    const endpoint = `${EndPoints.BENEFICIARYLIST}/${this.editId}`;
    this.http.payeereadData(endpoint).subscribe(res => {
      this.payeeDetails = res;
      this.addpayee.patchValue({
        payee_accno: this.payeeDetails.payee.accountNumber,
        payee_confirm_accno: this.payeeDetails.payee.accountNumber,
        ifcs_code: this.payeeDetails.payee.ifscCode,
        isFavorite: false,
        payee_nick_name: this.payeeDetails.payee.nickName
      });
    });
  }

  /* Validate Numbers */
  validateNumber(c: FormControl) {
    const numberExp: RegExp = /^[0-9]*$/;
    console.dir(c);
    return numberExp.test(c.value) ? null : {
      validateNumber: {
        valid: false
      }
    };

  }

  /* reset form */
  resetform(param) {
    if (param === 'add') {
      this.addpayee.reset();
    } else {
      this.addpayee.patchValue({
        payee_accno: this.payeeDetails.payee.accountNumber,
        payee_confirm_accno: this.payeeDetails.payee.accountNumber,
        ifcs_code: this.payeeDetails.payee.ifscCode,
        isFavorite: this.payeeDetails.payee.isFavorite,
        payee_nick_name: this.payeeDetails.payee.nickName
      });
    }

  }

  /* delete payee list */
  deletePayee() {
    const endpoint = `${EndPoints.BENEFICIARYLIST}/${this.editId}`;
    this.http.payeedelteData(endpoint).subscribe(res => {
      this.deletePayeemsg = res;
    });

  }


  /* delete confirm payee list */
  showConfirm() {

    this.messageService.clear();
    this.messageService.add({
      key: 'c', sticky: true,
      severity: 'warn',
      summary: 'Are you sure want to delete?',
      detail: 'Confirm to proceed'
    });
  }
  /* confirm delete payee list */
  onConfirm() {
    this.deletePayee();
    this.messageService.clear('c');
  }
  /* reject Delete */
  onReject() {
    this.messageService.clear('c');
  }

  /* filter the account based on user enter */
  filterAccount(event) {
    const endpoint = `${EndPoints.PAYEELIST}/search/${event}`;
    this.http.readData(endpoint).subscribe(
      (res: ACCOUNTSEARCH) => {
        this.accountSummaryList = res.userAccounts;
      }
    );
  }


}


