import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageSummaryComponent } from './mortgage-summary.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('MortgageSummaryComponent', () => {
  let component: MortgageSummaryComponent;
  let fixture: ComponentFixture<MortgageSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MortgageSummaryComponent],
      imports: [HttpClientTestingModule]
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
    fixture = TestBed.createComponent(MortgageSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
