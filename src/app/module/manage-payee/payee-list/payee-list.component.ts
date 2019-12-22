import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../../shared/services/http.service';
import { EndPoints } from '../../../shared/services/end-points.enum';
import { MessageService } from 'primeng/api';
import { LISTPAYEE, LISTPAYEERESPONSE } from '../../../models/app.models';

@Component({
  selector: 'app-payee-list',
  templateUrl: './payee-list.component.html',
  styleUrls: ['./payee-list.component.css'],
  providers: [MessageService]
})
export class PayeeListComponent implements OnInit {
  payeeList;
  accountNumber: number;
  userName: string;
  accountType: string;
  accountId: number;
  phoneNumber: number;
  currentId: number;
  constructor(private router: Router, private http: HttpService, private messageService: MessageService) { }

  ngOnInit() {
    /* user Details */
    this.accountNumber = JSON.parse(sessionStorage.getItem('user')).accountNumber;
    this.userName = JSON.parse(sessionStorage.getItem('user')).userName;
    this.accountType = JSON.parse(sessionStorage.getItem('user')).accountType;
    this.accountId = JSON.parse(sessionStorage.getItem('user')).accountId;
    this.phoneNumber = JSON.parse(sessionStorage.getItem('user')).phoneNumber;
    this.listPayee();
  }

  /* List payee list */
  listPayee() {
    const endpoint = `${EndPoints.BENEFICIARYLIST}/${this.phoneNumber}/payees`;
    this.http.payeereadData(endpoint).subscribe(res => {
      this.payeeList = res;
    });
  }

  /* delete payee list */
  deletePayee(id: number) {
    const endpoint = `${EndPoints.BENEFICIARYLIST}/${id}`;
    this.http.payeedelteData(endpoint).subscribe(res => {
      this.listPayee();
    });

  }

  /* edit payee list */
  editPayee(editpayee: number) {
    this.router.navigate(['/payee/manage', 'edit'], { queryParams: { id: editpayee } });
  }

  /* delete confirm payee list */
  showConfirm(currentid) {
    this.currentId = currentid;
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
    this.deletePayee(this.currentId);
    this.messageService.clear('c');
  }
  /* reject Delete */
  onReject() {
    this.messageService.clear('c');
  }

}
