import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeService {
  readonly baseUrl = 'https://localhost:5001';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private router: Router) { }

  getEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(
      this.baseUrl + '/evaluation', this.httpOptions
    );
  }

  addEmployee(employee: Employee){
    return this.httpClient.post(this.baseUrl+"/evaluation", employee).subscribe();
  }

  editEmployee(employee: Employee){
    return this.httpClient.put(this.baseUrl+"/evaluation?id="+employee.id, employee).subscribe();
  }

  deleteEmployee(id: string){
    return this.httpClient.delete(this.baseUrl+"/evaluation/"+id);
  }
}
