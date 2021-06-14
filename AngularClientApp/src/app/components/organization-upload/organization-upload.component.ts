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

  /*
   * Helps the upload of the file.
   * event: Upload event.
   */
  onFileChange(event:any) {
    this.fileList = event.target.files;
  }

  // Tracks th submit of the form.
  onSubmit(): void {
    let file = this.fileList[0];
    // Set a new FormData object.
    let formData = new FormData();

    // Add the uploaded form to the FormData object.
    formData.append('file', file);

    // Call importOrganization() to send the file to NodeJs for adding to Db.
    this.projectsService.importOrganization(formData);

    // Reset the form.
    this.service.uploadForm.reset();

    // Notify the user of the upload.
    this.notificationService.success('Organization CSV Imported successfully');

    // Close the dialog box.
    this.dialogRef.close();
  }

  // Tracks the close of the dialog box.
  onClose() {
    this.dialogRef.close();
  }

}
