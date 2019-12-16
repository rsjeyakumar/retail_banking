import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FundTransferComponent } from './fund-transfer.component';

describe('FundTransferComponent', () => {
  let component: FundTransferComponent;
  let fixture: ComponentFixture<FundTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundTransferComponent],
      imports: [SharedModule, HttpClientTestingModule]
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
    fixture = TestBed.createComponent(FundTransferComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
