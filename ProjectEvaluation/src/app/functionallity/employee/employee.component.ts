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

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    })
  }

  deleteEmployee(id: string){
    this.employeeService.deleteEmployee(id).subscribe();
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
