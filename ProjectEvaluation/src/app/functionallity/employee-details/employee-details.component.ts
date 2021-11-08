import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript'
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId: string = '';
  isEdit: boolean = true;

  employeeForm!: FormGroup;

  public get nameControl() {
    return this.employeeForm.get('name');
  }

  public get functionControl() {
    return this.employeeForm.get('function');
  }

  public get phoneNumberControl() {
    return this.employeeForm.get('phoneNumber');
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.employeeId = params['employeeId'];
      if (this.employeeId) {
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
    });
    if (this.isEdit) {
      this.employeeService
        .getEmployees()
        .pipe(
          map((employees) => employees.filter((employee) => employee.id === this.employeeId)[0])
        )
        .subscribe((newEmployee) => this.setupEmployeeDetails(newEmployee));
    }else{
      this.setupEmployeeDetails({
        id:Guid.create().toString(),
        name: '',
        function: '',
        phoneNumber:''
      })
    }
  }

  add() {
    const employee: Employee = {
      id: this.employeeForm.get('id')?.value,
      name: this.employeeForm.get('name')?.value,
      function: this.employeeForm.get('function')?.value,
      phoneNumber: this.employeeForm.get('phoneNumber')?.value
    }
    if(this.isEdit){
      this.employeeService.editEmployee(employee);
    }else{
      this.employeeService.addEmployee(employee);
    }
  }

  setupEmployeeDetails(employee: Employee) {
    this.employeeForm = this.formBuilder.group({
      id: employee.id,
      name: [employee.name, Validators.required],
      function: [employee.function, Validators.required],
      phoneNumber: [employee.phoneNumber, Validators.required]
    });
  }
}
