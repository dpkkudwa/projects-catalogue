import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../shared/project.service';
import { ProjectsService } from '../../shared/projects.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  isAddMode = false;
  constructor(
    public service: ProjectService,
    public dialogRef: MatDialogRef<ProjectComponent>,
    public projectsService: ProjectsService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
      if (this.service.projectForm.value.type === 'add') {
        this.projectsService.insertProject(this.service.projectForm.value);
        this.notificationService.success(':: Submitted successfully');
        this.dialogRef.close();
      }
      else {
        this.projectsService.updateProject(this.service.projectForm.getRawValue());
        this.service.projectForm.reset();
        this.service.initializeFormGroup();
        this.notificationService.success('Project Name Submitted successfully');
        this.dialogRef.close();
      }
  }

  onClose() {
    console.log('close');
    this.dialogRef.close();
  }


}
