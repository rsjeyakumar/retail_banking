import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransactionComponent } from './user-transaction.component';
import { SharedModule } from './../../../shared/shared.module';

describe('UserTransactionComponent', () => {
  let component: UserTransactionComponent;
  let fixture: ComponentFixture<UserTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserTransactionComponent],
      imports: [SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const user = {
      accountNumber: 2,
      userName: 'test',
      accountType: 'Savings',
      accountId: 43
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    fixture = TestBed.createComponent(UserTransactionComponent);
    component = fixture.componentInstance;
    component.accountNumber = 2;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.accountNumber).toBe(2);
  });
});
