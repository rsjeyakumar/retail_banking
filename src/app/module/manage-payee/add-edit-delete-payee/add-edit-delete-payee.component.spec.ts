import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeletePayeeComponent } from './add-edit-delete-payee.component';
import { SharedModule } from './../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
describe('AddEditDeletePayeeComponent', () => {
  let component: AddEditDeletePayeeComponent;
  let fixture: ComponentFixture<AddEditDeletePayeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditDeletePayeeComponent],
      imports: [SharedModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDeletePayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
