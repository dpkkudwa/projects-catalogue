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
  constructor(
    public service: ProjectService,
    public dialogRef: MatDialogRef<ProjectComponent>,
    public projectsService: ProjectsService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  // On submit of the project form.
  onSubmit() {
      if (this.service.projectForm.value.type === 'add') { // If the submitted form is a new insertion.
        this.projectsService.insertProject(this.service.projectForm.value);
        this.notificationService.success(':: Submitted successfully');
        this.dialogRef.close();
      }
      else { // If the submitted form is to update the project.
        this.projectsService.updateProject(this.service.projectForm.getRawValue());
        this.service.projectForm.reset();
        this.service.initializeFormGroup();
        this.notificationService.success('Project Name Submitted successfully');
        this.dialogRef.close();
      }
  }

  onClose() {
    this.dialogRef.close();
  }


}
