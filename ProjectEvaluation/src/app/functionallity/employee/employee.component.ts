import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.filteredEmployees = employees;
    })
  }

  ascending(){
    this.filteredEmployees = this.filteredEmployees.sort((a,b) => a.name.localeCompare(b.name));
  }

  descending(){
    this.filteredEmployees = this.filteredEmployees.sort((a,b) => b.name.localeCompare(a.name));
  }

  deleteEmployee(id: string){
    this.employeeService.deleteEmployee(id).subscribe((response) => {
      this.employees = this.employees.filter((employee) => employee.id !== id);
      this.filteredEmployees = [...this.employees];
    });
  }

  editEmployee(employee: any){
    this.router.navigate(['/employee-details'], {
      queryParams: {employeeId: employee.id}
    })
  }

  newEmployeePage(): void {
    this.router.navigate(['/employee-details']);
  }

}
