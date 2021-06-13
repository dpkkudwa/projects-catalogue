import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  // Express Api.
  REST_API: string = 'http://localhost:3080';

  constructor(private httpClient: HttpClient) { }

  getProducts() : Observable<any> {
    return this.httpClient.get(`${this.REST_API}/projects`);
  }

  getOrganizations() : Observable<any> {
    return this.httpClient.get(`${this.REST_API}/organizations`);
  }

  getProductsByOrganization(organization_id: string) : Observable<any> {
    return this.httpClient.get(`${this.REST_API}/project/${organization_id}`);
  }

  deleteProject(project_id: string) : Observable<any> {
    return this.httpClient.delete(`${this.REST_API}/project/${project_id}`);
  }

  importProject(project: any) {
    this.httpClient.post(`${this.REST_API}/projects`, project).subscribe(
      (data) => {
        console.log("Projects Uploaded successufully.", data);
      }
    );
  }

  importOrganization(organization: any) {
    this.httpClient.post(`${this.REST_API}/organizations`, organization).subscribe(
      (data) => {
        console.log("Organizations Uploaded successufully.", data);
      }
    );
  }

  insertProject(project: any) {
    this.httpClient.post(`${this.REST_API}/project`, project).subscribe(
      (data) => {
        console.log("Insert project successful value", data);
      }
    );
  }

  insertOrganization(organization: any) {
    this.httpClient.post(`${this.REST_API}/organization`, organization).subscribe(
      (data) => {
        console.log("Organization inserted successfully", data);
      }
    );
  }

  updateProject(project: any) : any {
    let payload = {
      project_name: project.project_name
    };
    this.httpClient.patch(`${this.REST_API}/project/${project.project_id}`, payload).subscribe(
      (data) => {
        console.log("PATCH call successful value returned in body", data);
      }
    );
  }

}
