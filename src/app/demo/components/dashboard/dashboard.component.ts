import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { StService } from '../../service/st.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService]
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    htmlContent: SafeHtml;

    rawHtml: string;

    products!: Product[];

    Music: any = 0;

    Users: any = 0;

    Roles: any = 0;

    Event: any = 0;

    Counselor: any = 0;

    Admin: any = 0;

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(private productService: ProductService, private sanitizer: DomSanitizer, public layoutService: LayoutService, private ST: StService, private msg: MessageService, private router: Router) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initChart();
            });
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.rawHtml);
    }

    ngOnInit() {

        let role = localStorage.getItem('role');
        if (role === "admin") {

            this.ST.allUser().subscribe(
                (res: any) => {
                    this.Users = res.msg.length;
                },
                (error: any) => {
                    this.msg.add({ key: 'tst', severity: 'error', summary: JSON.stringify(error.name), detail: 'Internet Server Error' })
                }
            );
            this.ST.allMusic().subscribe(
                (res: any) => {
                    this.Music = res.msg.length;
                }
            )

            this.ST.allCounselor().subscribe(
                (res: any) => {
                    this.Counselor = res.msg.length;
                }
            )

            this.ST.allEvent().subscribe(
                (res: any) => {
                    this.Event = res.msg.length;
                }
            )

            this.ST.allAdmin().subscribe(
                (res: any) => {
                    this.Admin = res.msg.length;
                }
            )

            this.initChart();
            this.productService.getProductsSmall().then(data => this.products = data);

            this.items = [
                { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                { label: 'Remove', icon: 'pi pi-fw pi-minus' }
            ];
        } else if (role == undefined || role == null) {
            this.router.navigateByUrl('/auth/login');
        }
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    dd() {
        console.log(this.rawHtml);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
