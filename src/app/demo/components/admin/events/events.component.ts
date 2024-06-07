import {Component} from '@angular/core';
import {MessageService} from "primeng/api";
import {StService} from "../../../service/st.service";
import {TableService} from "primeng/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  providers: [MessageService, TableService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

    imageData: any;
    
    title: any;

  datas: any;

  imageChangedEvent: any = '';

  first: any = 0;

  job: any;

  description: any;

  userName: any;

  disabled: boolean = false;

  phone: any;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  formGroup: any;

  submitted: boolean = false;

  addOrUpdate: boolean = false;

  rows = 10;

  Users: any;


  name: any;

  user_id: any;

  email: any;

  password: any;

  constructor(private http: StService, private msgService: MessageService,private router: Router) {
  }


  ngOnInit(): void {
      let role = localStorage.getItem('role');
      if (role == 'admin') {
          this.datas = new FormGroup({
              title: new FormControl('', Validators.compose([Validators.required])),
              uploader: new FormControl('', Validators.compose([Validators.required])),
              description: new FormControl(
                  '',
                  Validators.compose([Validators.required])
              ),
              photo: new FormControl('', Validators.compose([Validators.required])),
          });
      
          this.http.allEvent().subscribe(
              (response: any) => {
                  let Users = response.msg;
                  this.Users = Users.reverse();
              },
              (error: any) => {
                  this.msgService.add({
                      key: 'tst',
                      severity: 'error',
                      summary: JSON.stringify(error.name),
                      detail: 'Internet Server Error'
                  })
              }
          )
      } else if (role == undefined || role == null) {
        this.router.navigateByUrl('/auth/login');
      }
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

  deleteProduct(obj: any) {
      this.deleteProductDialog = true;
      this.user_id = obj;
  }

  confirmDelete() {
      this.http.deleteEvent(this.user_id).subscribe(
          (res: any) => {
              if (res.con) {
                  this.msgService.add({
                      key: 'tst',
                      severity: 'success',
                      summary: 'Success Message',
                      detail: 'Delete Successfully'
                  });
                  this.deleteProductDialog = false;
                  this.name = '';
                  this.email = '';
                  this.user_id = '';
                  this.password = '';
                  this.productDialog = false;
                  this.submitted = false;
                  this.addOrUpdate = false;
                  this.http.allEvent().subscribe(
                      (res: any) => {
                          if (res.con) {
                              let Users = res.msg;
                              this.Users = Users.reverse();
                          }
                      },
                      (err: any) => {
                          this.msgService.add({
                              key: 'tst',
                              severity: 'error',
                              summary: JSON.stringify(err.name),
                              detail: 'Internet Server Error'
                          });
                      }
                  )
              }
              ;
          },
          (err: any) => {
              this.msgService.add({
                  key: 'tst',
                  severity: 'error',
                  summary: JSON.stringify(err.name),
                  detail: 'Internet Server Error'
              });
          }
      )
  }


  dataURLtoFile(dataurl: any, filename: any) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
  
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      console.log(new File([u8arr], filename, { type: mime }));
      return new File([u8arr], filename, { type: mime });
  }
  
  onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.imageChangedEvent = event;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.imageData = reader.result;
      };
  }

  startLogin(datas: any) {
      console.log(datas)
      const formData: any = new FormData();
      let file = this.dataURLtoFile(
        this.imageData,
        this.imageChangedEvent.target.files[0].name
      );
  
      formData.append('photo', file, file.name);
      formData.append('title', datas.title);
      formData.append('uploader', datas.uploader);
      formData.append('description', datas.description);
      this.http.saveEvent(formData).subscribe(
          (result: any) => {
              if (result.con) {
                  this.productDialog = false;
          this.http.allEvent().subscribe(
              (response: any) => {
                  let Users = response.msg;
                  this.Users = Users.reverse();
              },
              (error: any) => {
                  this.msgService.add({
                      key: 'tst',
                      severity: 'error',
                      summary: JSON.stringify(error.name),
                      detail: 'Internet Server Error'
                  })
              }
          )
        }
          },
          (err: any) => {
              this.msgService.add({
                  key: 'tst',
                  severity: 'error',
                  summary: JSON.stringify(err.name),
                  detail: 'Internet Server Error'
              })
          }
      );
    }

}

