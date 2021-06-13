import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../shared/projects.service';
import { NotificationService } from '../../shared/notification.service';
import { OrganizationService } from '../../shared/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  constructor( public service: OrganizationService,
    public dialogRef: MatDialogRef<OrganizationComponent>,
    public projectsService: ProjectsService,
    private notificationService: NotificationService,) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.projectsService.insertOrganization(this.service.organizationForm.value);
    this.notificationService.success('Organization inserted successfully');
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }


}
