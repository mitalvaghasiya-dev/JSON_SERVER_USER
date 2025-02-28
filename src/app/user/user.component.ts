import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from './user.model';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-user',
  imports: [FormsModule, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  editMode = false;
  tabChange: boolean = false;
  userList: any[] = [];
  cityList: string[] = ["Lahore", "Multan", "Karachi", "Sialkot", "Faisalabad"];
  departmentList: string[] = ["IT", "HR", "Accounts", "Sales", "Management"];
   searchText = '';
  
  userData: User = {
    department: "",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    doj: "",
    city: "",
    salary: 0,
    address: "",
    status: false,
  }

  private userService = inject(UserService);
  private tosterSevice = inject(ToastrService);


  ngOnInit(): void {
    this.resetData();
    this.getUserList();
  }
  resetData() {
    this.userData = {
      department: "",
      name: "",
      mobile: "",
      email: "",
      gender: "",
      doj: "",
      city: "",
      salary: 0,
      address: "",
      status: false,
    }
  }

  tabChangeTable() {
    this.tabChange = !this.tabChange;
  }

  getUserList() {
    this.userService.getUsers().subscribe((res: any) => {
      this.userList = res;
    })
  }

    filteredUserList() {
    if (!this.searchText) {
      return this.userList;
    }
    return this.userList.filter(user =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }
  
  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.userService.updateUser(this.userData).subscribe((res) => {
        console.log(res);
        this.getUserList();
        this.editMode = false;
        form.reset();
        this.tabChangeTable();
        this.tosterSevice.success('User Updated Successfully', 'Success');
      })

    } else {
      this.userService.addUser(this.userData).subscribe((res) => {
        this.getUserList();
        form.reset();
        this.tabChangeTable();
        this.tosterSevice.success('User Added Successfully', 'Success');

      });
    }

  }

  onDelete(id: any) {
    const isConfirm = confirm('Are you sure you want to delete this record?');
    if (isConfirm) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.tosterSevice.success('User Deleted Successfully', 'Success');
        this.getUserList();
      })
    }
  }

  onEdit(item: any) {
    console.log(item);
    this.userData = { ...item };
    this.editMode = true;
    this.tabChangeTable();
  }
}
