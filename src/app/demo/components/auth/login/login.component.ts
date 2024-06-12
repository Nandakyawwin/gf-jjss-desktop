import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StService } from 'src/app/demo/service/st.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    valCheck: string[] = ['remember'];

    password: any;

    email: any;

    constructor(public layoutService: LayoutService,private router: Router,private  http: StService,private msgService: MessageService) { }

    ngOnInit(): void {
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('user_id');
    }

    login() {
        console.log('eee')
        let obj = {
            email: this.email,
            password: this.password
        };
        this.http.loginAdmin(obj).subscribe(
            (res: any) => {
                if (res.con) {
                    this.msgService.add({ key: 'tst', severity: 'success', summary: JSON.stringify(res.msg), detail: 'Login Successful' });
                    localStorage.setItem('role', res.name.role);
                    localStorage.setItem('email', res.name.email);
                    localStorage.setItem('name', res.name.name);
                    localStorage.setItem('user_id', res.name.user_id);
                    if (res.name.role == 'admin') {
                        this.router.navigateByUrl('/');
                    }
                } else {
                    this.msgService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Login Error' })
                }
            },
            (err: any) => {
                console.log(err);
            }
        )
    }
}
