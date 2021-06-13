import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUploadComponent } from './organization-upload.component';

describe('OrganizationUploadComponent', () => {
  let component: OrganizationUploadComponent;
  let fixture: ComponentFixture<OrganizationUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
