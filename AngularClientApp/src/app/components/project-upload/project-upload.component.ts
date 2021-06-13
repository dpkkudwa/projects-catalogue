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

  onFileChange(event:any) {
    this.fileList = event.target.files;
  }

  onSubmit(): void {
    let file = this.fileList[0];
    let formData = new FormData();
    formData.append('file', file);
    this.projectsService.importProject(formData);
    this.service.uploadForm.reset();
    this.service.initialUploadFormGroup();
    this.notificationService.success('Project CSV Imported successfully');
    this.dialogRef.close();
  }

  onClose() {
    console.log('close');
    this.dialogRef.close();
  }

}
