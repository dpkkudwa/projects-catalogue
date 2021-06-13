import { Component, OnInit, ViewChild } from '@angular/core';

// Material UI Components.
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

// Project Component.
import { ProjectComponent } from '../project/project.component';

// Project Upload Component.
import { ProjectUploadComponent } from '../project-upload/project-upload.component';
import { OrganizationUploadComponent } from '../organization-upload/organization-upload.component';

// Custom Shared Services.
import { NotificationService } from '../../shared/notification.service';
import { ProjectsService } from '../../shared/projects.service';
import { ProjectService } from '../../shared/project.service';
import { OrganizationService } from '../../shared/organization.service';

// Project and Organization Structure.
import { Project } from './project';
import { Organization } from './organization';
import { OrganizationComponent } from '../organization/organization.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  isAddMode = false;
  displayedColumns: string[] = ['project_id', 'organization_id', 'user_id','project_name', 'created_at', 'actions'];
  dataSource = new MatTableDataSource<Project>();
  products?: Project[];
  loading = false;
  organizations?: Organization[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public projectsService: ProjectsService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    public projectService: ProjectService,
    public organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchData();
    this.fetchOrganizations();
  }

  onProjectFileUpload():any {
    this.projectService.initialUploadFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ProjectUploadComponent, dialogConfig).afterClosed().subscribe(result => {
      this.fetchData()
    });
  }

  onOrganizationFileUpload():any {
    this.projectService.initialUploadFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(OrganizationUploadComponent, dialogConfig).afterClosed().subscribe(result => {
      this.fetchOrganizations()
    });
  }

  onProjectInsert() : void {
    this.isAddMode = true;
    this.projectService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(ProjectComponent, dialogConfig).afterClosed().subscribe(result => {
      this.fetchData()
    });
  }

  onOrganizationInsert(): void {
    this.organizationService.initialOrganizationFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(OrganizationComponent, dialogConfig).afterClosed().subscribe(result => {
      this.fetchOrganizations()
    });
  }


  /*
   * Event Projects By Organization.
   * event - The target value.
  */
  onEdit(row:any) {
    this.projectService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(ProjectComponent, dialogConfig).afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /*
    * Filtering Projects By Organization.
    * event - The target value.
  */
  onDelete(event: any) {
    if(confirm('Are you sure to delete this record ?')){
      this.loading = true;
      this.projectsService.deleteProject(event.project_id).subscribe(
        () => {
          this.fetchData();
        }
      );
      this.notificationService.warn('! Deleted successfully');
    }
  }

  /*
   * Filtering Projects By Organization.
   * event - The target value.
  */
  onOrganizationFilter(event: any) {
    this.loading = true; // Show the loader.

    // Rest API to get the projects by organization.
    this.projectsService.getProductsByOrganization(event.value).subscribe(
      data => {
        this.setupDataSource(data);
      }
    )
  }

  setupDataSource(data: any) {
    if (data) {
      this.loading = false;
    }
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    console.log('here');
    this.projectsService.getProducts().subscribe(
      data => {
        this.setupDataSource(data)
      }
    );
  }

  fetchOrganizations() {
    this.projectsService.getOrganizations().subscribe(
      data => {
        this.organizations = data;
      }
    )
  }

}
