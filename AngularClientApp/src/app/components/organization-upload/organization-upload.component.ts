import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../shared/project.service';
import { ProjectsService } from '../../shared/projects.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-organization-upload',
  templateUrl: './organization-upload.component.html',
  styleUrls: ['./organization-upload.component.css']
})
export class OrganizationUploadComponent implements OnInit {
  fileList!: FileList;
  constructor(public service: ProjectService,
    public dialogRef: MatDialogRef<OrganizationUploadComponent>,
    public projectsService: ProjectsService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onFileChange(event:any) {
    this.fileList = event.target.files;
  }

  onSubmit(): void {
    let file = this.fileList[0];
    let formData = new FormData();
    formData.append('file', file);
    this.projectsService.importOrganization(formData);
    this.service.uploadForm.reset();
    this.service.initialUploadFormGroup();
    this.notificationService.success('Organization CSV Imported successfully');
    this.dialogRef.close();
  }

  onClose() {
    console.log('close');
    this.dialogRef.close();
  }

}
