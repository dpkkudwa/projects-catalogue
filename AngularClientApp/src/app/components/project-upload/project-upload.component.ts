import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../shared/project.service';
import { ProjectsService } from '../../shared/projects.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-project-upload',
  templateUrl: './project-upload.component.html',
  styleUrls: ['./project-upload.component.css']
})
export class ProjectUploadComponent implements OnInit {
  fileList!: FileList;

  constructor(public service: ProjectService,
    public dialogRef: MatDialogRef<ProjectUploadComponent>,
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

  // On submit of the form.
  onSubmit(): void {
    let file = this.fileList[0];

    // Set a new FormData object.
    let formData = new FormData();

    // Append the file to the Form data.
    formData.append('file', file);

    // Send the formdata to be added into the database.
    this.projectsService.importProject(formData);

    // Reset the form.
    this.service.uploadForm.reset();

    // Notify the user of the success.
    this.notificationService.success('Project CSV Imported successfully');

    // Close the dialog box.
    this.dialogRef.close();
  }

  // On close of the form.
  onClose() {
    this.dialogRef.close();
  }

}
