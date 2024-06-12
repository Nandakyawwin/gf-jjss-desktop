import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Admins & Controls',
                items: [
                    {
                        label: 'Admins', icon: 'pi pi-user',
                        routerLink: ['/admin/admins']
                    },
                    {
                        label: 'Counselors', icon: 'pi pi-user',
                        routerLink: ['/admin/counselors']
                    },
                    {
                        label: 'Volunteers', icon: 'pi pi-user',
                        routerLink: ['/admin/volunteers']
                    },
                    {
                        label: 'Users', icon: 'pi pi-user',
                        routerLink: ['/admin/users']
                    },
                ]
            },
            {
                label: 'Jue Jue\'s Safe Space',
                items: [
                    {
                        label: 'Surveys', icon: 'pi pi-server',
                        routerLink: ['/admin/surveys']
                    },
                    {
                        label: 'Musics', icon: 'pi pi-youtube',
                        routerLink: ['/admin/musics']
                    },
                    {
                        label: 'Events', icon: 'pi pi-calendar',
                        routerLink: ['/admin/events']
                    },
                ]
            },
            {
                label: 'Sessions',
                items: [
                    {
                        label: 'Logout', icon: 'pi pi-sign-out',
                        routerLink: ['/auth/login']
                    },
                ]
            }
        ];
    }
}
