import { Component } from '@angular/core';
import { MessageService } from "primeng/api";
import { StService } from "../../../service/st.service";
import { TableService } from "primeng/table";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-musics',
  providers: [MessageService, TableService],
  templateUrl: './musics.component.html',
  styleUrl: './musics.component.scss'
})
export class MusicsComponent {

  imageData: any;

  loading = false;

  title: any;

  datas: any;

  imageChangedEvent: any = '';

  imagedbChangedEvent: any = '';

  imageVdChangedEvent: any = '';

  imageDatabg: any;

  imageDataVd: any;

  first: any = 0;

  uploader: any;

  job: any;

  description: any;

  Duration: any;

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

  constructor(private http: StService, private msgService: MessageService, private router: Router) {
  }


  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      this.datas = new FormGroup({
        name: new FormControl('', Validators.compose([Validators.minLength(70)])),
        photo: new FormControl(
          '',
          Validators.compose([Validators.minLength(70)])
        ),
        duration: new FormControl(
          '',
          Validators.compose([Validators.minLength(70)])
        ),
        'music': new FormControl('', Validators.compose([
          Validators.minLength(70)
        ])),
        'video': new FormControl('', Validators.compose([
          Validators.minLength(70)
        ])),
        uploader: new FormControl(
          '',
          Validators.compose([Validators.minLength(70)])
        ),
      });

      this.http.allMusic().subscribe(
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
    this.loading = false;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.loading = false;
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
    this.http.deleteMusic(this.user_id).subscribe(
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
          this.http.allMusic().subscribe(
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

  onFileSelectedbg(event: any) {
    const file: File = event.target.files[0];
    this.imagedbChangedEvent = event;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageDatabg = reader.result;
    };
  }

  onFileSelectedVd(event: any) {
    const file: File = event.target.files[0];
    if (!file) {
      // Handle the case where no file is selected
      console.log('No file selected.');
      return;
    }

    this.imageVdChangedEvent = event;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageDataVd = reader.result;
    };
  }


  startLogin(datas: any) {
    this.loading = true;
    const formData: any = new FormData();

    if (this.imageData && this.imageChangedEvent) {
      let file = this.dataURLtoFile(
        this.imageData,
        this.imageChangedEvent.target.files[0].name
      );
      formData.append('photo', file, file.name);
    }

    if (this.imageDatabg && this.imagedbChangedEvent) {
      let filebg = this.dataURLtoFile(
        this.imageDatabg,
        this.imagedbChangedEvent.target.files[0].name
      );
      formData.append('music', filebg, filebg.name);
    }

    if (this.imageDataVd && this.imageVdChangedEvent) {
      let fileVd = this.dataURLtoFile(
        this.imageDataVd,
        this.imageVdChangedEvent.target.files[0].name
      );
      formData.append('video', fileVd, fileVd.name);
    }
    formData.append('name', datas.name);
    formData.append('duration', datas.duration);
    formData.append('uploader', datas.uploader);

    this.http.saveMusic(formData).subscribe(
      (result: any) => {
        if (result.con) {
          this.loading = false;
          this.productDialog = false;
          this.http.allMusic().subscribe(
            (response: any) => {
              let Users = response.msg;
              this.Users = Users.reverse();
              this.msgService.add({
                key: 'tst',
                severity: 'success',
                summary: 'Music Upload Status',
                detail: 'Upload Successfully!'
              })
            },
            (error: any) => {
              this.msgService.add({
                key: 'tst',
                severity: 'error',
                summary: JSON.stringify(error.name),
                detail: 'Internet Server Error'
              });
              this.loading = false;
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

