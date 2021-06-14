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

  // On submit of the orgnaization form.
  onSubmit() {
    // Call the insertOrganization() to insert the form data into the Organization collection.
    this.projectsService.insertOrganization(this.service.organizationForm.value);

    // Notify user of the successful insertion.
    this.notificationService.success('Organization inserted successfully');

    // Close the dialog box.
    this.dialogRef.close();
  }

  // On clicking the close button.
  onClose() {
    this.dialogRef.close();
  }


}
