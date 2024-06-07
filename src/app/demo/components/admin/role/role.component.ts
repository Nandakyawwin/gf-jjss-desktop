import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableService } from 'primeng/table';
import { StService } from 'src/app/demo/service/st.service';

@Component({
  selector: 'app-role',
  providers: [MessageService,TableService],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {

  selectedProduct: any;

  first: any = 0;

  userName: any;

  disabled: boolean = false;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  formGroup: any;

  selectedRole: any;

  submitted: boolean = false;
  
  addOrUpdate: boolean = false;

  rows = 10;

  Users: any;

  Roles: any;

  name: any;

  phone: any;

  role: any;

  user_id: any;

  email: any;

  password: any;

  constructor(private http: StService,private msgService: MessageService) { }
  


  ngOnInit(): void {
    this.http.allUser().subscribe(
      (response: any) => {
        let Users = response.data;
        this.Users = Users.reverse();
      },
      (error: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(error.name), detail: 'Internet Server Error' })
      }
    )

    this.http.allRole().subscribe(
      (res: any) => {
        this.Roles = res.data;
      },
      (error: any) => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(error.name), detail: 'Internet Server Error' })
      }
    )
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
    this.phone = '';
    this.selectedRole = '';
    this.password = '';
    this.userName = '';
    this.user_id = '';
  }
  
  saveProduct() {

    this.disabled = true;
    this.submitted = true;

    let obj = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.selectedRole.roleName,
      phone: this.phone
    };

    this.http.saveUser(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'User Create Successfully' });
          this.name = '';
          this.email = '';
          this.phone = '';
          this.selectedRole = '';
          this.password = '';
          this.productDialog = false;
          this.submitted = false;
          this.disabled = false;

          this.http.allUser().subscribe(
            (response: any) => {
              let Users = response.data;
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
    console.log(event)
    console.log(this.selectedRole)
    this.productDialog = true;
    this.addOrUpdate = true;
    this.name = event.data.name;
    this.email = event.data.email;
    this.selectedRole = this.Roles.find(role => role.roleName === event.data.role);
    this.phone = event.data.phone;
    this.userName = event.data.userName;
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
      phone: this.phone,
      role: this.selectedRole.roleName,
      userName: this.userName,
      user_id: this.user_id
    };

    this.http.updateUser(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'User Update Successfully' });

          this.name = '';
          this.email = '';
          this.phone = '';
          this.selectedRole = '';
          this.user_id = '';
          this.password = '';
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.http.allUser().subscribe(
            (res: any) => {
              if (res.con) {
                let Users = res.data;
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
    let obj = {
      user_id: this.user_id
    }
    this.http.deleteUser(obj).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'User Delete Successfully' });
          this.deleteProductDialog = false;
          this.name = '';
          this.email = '';
          this.phone = '';
          this.selectedRole = '';
          this.user_id = '';
          this.password = '';
          this.productDialog = false;
          this.submitted = false;
          this.addOrUpdate = false;
          this.http.allUser().subscribe(
            (res: any) => {
              if (res.con) {
                let Users = res.data;
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