import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableService } from 'primeng/table';
import { StService } from 'src/app/demo/service/st.service';

@Component({
  selector: 'app-surveys',
  providers: [MessageService, TableService],
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss'
})
export class SurveysComponent {

  first: any = 0;

  userName: any;

  message: any;

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

  constructor(private http: StService, private msgService: MessageService, private router: Router) { }



  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      this.http.allSurvey().subscribe(
        (response: any) => {
          let Users = response.data;
          let newAry: any = [];
          Users.forEach((item: any) => {
            this.http.Uid(item.u_id).subscribe(
              (resp: any) => {
                let user = resp.msg.name;
                this.http.Cid(item.c_id).subscribe(
                  (respo: any) => {
                    let counselor = respo.msg.name;
                    newAry.push(
                      {
                        _id: item._id,
                        type: item.type,
                        c_id: counselor,
                        c_status: item.c_status,
                        date: item.date,
                        since: item.since,
                        createAt: item.createAt,
                        updateAt: item.updateAt,
                        book_id: item.book_id,
                        user_id: item.u_id,
                        __v: item.__v,
                        u_id: user,
                        u_status: item.u_status
                      }
                    )
                    this.Users = newAry;

                  }
                )
              }
            )
          })
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

  openDialog(u_id, date) {
    this.message = [];
    this.productDialog = true;
    this.http.question(date, u_id).subscribe(
      (response: any) => {
        console.log(response);
        if (response.con) {
          this.message = response.msg;
        }
      }
    )
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  onRowSelect(event: any) {
  };

  deleteProduct(obj: any) {
    this.deleteProductDialog = true;
    this.user_id = obj;
  }

  confirmDelete(id) {
    this.http.deleteBooking(id).subscribe(
      (res: any) => {
        if (res.con) {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Survey Delete Successfully' });
          this.deleteProductDialog = false;
          this.http.allSurvey().subscribe(
            (response: any) => {
              let Users = response.data;
              let newAry: any = [];
              Users.forEach((item: any) => {
                this.http.Uid(item.u_id).subscribe(
                  (resp: any) => {
                    let user = resp.msg.name;
                    this.http.Cid(item.c_id).subscribe(
                      (respo: any) => {
                        let counselor = respo.msg.name;
                        newAry.push(
                          {
                            _id: item._id,
                            type: item.type,
                            c_id: counselor,
                            c_status: item.c_status,
                            date: item.date,
                            since: item.since,
                            createAt: item.createAt,
                            updateAt: item.updateAt,
                            book_id: item.book_id,
                            user_id: item.u_id,
                            __v: item.__v,
                            u_id: user,
                            u_status: item.u_status
                          }
                        )
                        this.Users = newAry;
                      }
                    )
                  }
                )
              })
            },
            (error: any) => {
              this.msgService.add({ key: 'tst', severity: 'error', summary: JSON.stringify(error.name), detail: 'Internet Server Error' })
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
