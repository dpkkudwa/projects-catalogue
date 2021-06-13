import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  isAddMode = false;

  constructor() {
  }

  projectForm: FormGroup = new FormGroup({
    project_id: new FormControl(''),
    organization_id: new FormControl(''),
    user_id: new FormControl(''),
    project_name: new FormControl(''),
    type: new FormControl(''),
  });

  uploadForm: FormGroup = new FormGroup({
    file: new FormControl('', [Validators.required]),
  });

  initialUploadFormGroup() {
    this.uploadForm.setValue({
      file: '',
    });
  }

  initializeFormGroup() {
    this.projectForm.controls['project_id'].enable();
    this.projectForm.controls['organization_id'].enable();
    this.projectForm.controls['user_id'].enable();
    this.projectForm.setValue({
      project_id: '',
      organization_id: '',
      user_id: '',
      project_name: '',
      type: 'add'
    });
  }

  populateForm(project: any) {
    this.isAddMode= false;
    this.projectForm.controls['project_id'].disable();
    this.projectForm.controls['organization_id'].disable();
    this.projectForm.controls['user_id'].disable();
    project.type = 'edit';
    this.projectForm.setValue(_.omit(project, '_id', 'created_at'));
  }


}
