import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableService } from 'primeng/table';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [MessageService,TableService]
})
export class UsersComponent implements OnInit{

  first: any = 0;

  userName: any;

  disabled: boolean = false;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  formGroup: any;

  submitted: boolean = false;

  addOrUpdate: boolean = false;

  rows = 10;

  Users: any;

  Roles: any;

  name: any;

  user_id: any;

  email: any;

  password: any;

  constructor(private http: UserService,private msgService: MessageService,private router: Router) { }



  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      this.http.allUser().subscribe(
        (response: any) => {
          let Users = response.msg;
          this.Users = Users.reverse();
        },
        (error: any) => {
          this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(error.name), detail: 'Internet Server Error' })
        }
      )
    } else if (role == undefined || role == null) {
      this.router.navigateByUrl('/auth/login');
    }
  }

  showErrorViaToast() {
    this.msgService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
  }

  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
  }

  openDialog() {
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.name = '';
    this.email = '';
    this.password = '';
    this.user_id = '';
  }

  saveProduct() {

    this.disabled = true;
    this.submitted = true;

    let obj = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.http.saveUser(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'User Create Successfully' });
          this.name = '';
          this.email = '';
          this.password = '';
          this.productDialog = false;
          this.submitted = false;
          this.disabled = false;

          this.http.allUser().subscribe(
            (response: any) => {
              let Users = response.msg;
              this.Users = Users.reverse();
            },
            (error: any) => {
              this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(error.name), detail: 'Internet Server Error' })
            }
          )
        }
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
        this.disabled = false;
      }
    )
  };

  onRowSelect(event: any) {
    this.productDialog = true;
    this.addOrUpdate = true;
    this.name = event.data.name;
    this.email = event.data.email;
    this.user_id = event.data.user_id;

  };

  onRowUnselect(event: any) {
  console.log(event);
  };

  updateProduct() {

    this.submitted = true;

    let obj = {
      name: this.name,
      email: this.email,
      user_id: this.user_id
    };

    this.http.updateUser(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'User Update Successfully' });

          this.name = '';
          this.email = '';
          this.user_id = '';
          this.password = '';
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.http.allUser().subscribe(
            (res: any) => {
              if (res.con) {
                let Users = res.msg;
                this.Users = Users.reverse();
              }
            },
            (err: any) => {
              this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
            }
          )
        }
      }
    )
  }

  deleteProduct(obj: any) {
    this.deleteProductDialog = true;
    this.user_id = obj;
  }

  confirmDelete() {
    this.http.deleteUser(this.user_id).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'User Delete Successfully' });
          this.deleteProductDialog = false;
          this.name = '';
          this.email = '';
          this.user_id = '';
          this.password = '';
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.http.allUser().subscribe(
            (res: any) => {
              if (res.con) {
                let Users = res.msg;
                this.Users = Users.reverse();
              }
            },
            (err: any) => {
              this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
            }
          )
        };
      },
      (err: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(err.name), detail: 'Internet Server Error' });
      }
    )
  }
}
