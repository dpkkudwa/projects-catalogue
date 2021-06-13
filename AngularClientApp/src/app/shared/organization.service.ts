import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor() { }

  organizationForm: FormGroup = new FormGroup({
    organization_id: new FormControl('', [Validators.required]),
    organization_name: new FormControl('', [Validators.required])
  });

  initialOrganizationFormGroup() {
    this.organizationForm.setValue({
      organization_id: '',
      organization_name: ''
    });
  }
}
