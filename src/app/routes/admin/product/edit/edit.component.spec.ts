import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductEditComponent } from './edit.component';

describe('AdminProductEditComponent', () => {
  let component: AdminProductEditComponent;
  let fixture: ComponentFixture<AdminProductEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProductEditComponent]
    });
    fixture = TestBed.createComponent(AdminProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
