import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'users',  data: { breadcrumb: 'Button' }, loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'roles',  data: { breadcrumb: 'Button' },loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
  { path: 'admins',  data: { breadcrumb: 'Button' }, loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule) },
  { path: 'counselors',  data: { breadcrumb: 'Button' }, loadChildren: () => import('./counselors/counselors.module').then(m => m.CounselorsModule) },
  { path: 'volunteers',   data: { breadcrumb: 'Button' },loadChildren: () => import('./volunteers/volunteers.module').then(m => m.VolunteersModule) },
  { path: 'surveys',   data: { breadcrumb: 'Button' },loadChildren: () => import('./surveys/surveys.module').then(m => m.SurveysModule) },
  { path: 'musics',  data: { breadcrumb: 'Button' }, loadChildren: () => import('./musics/musics.module').then(m => m.MusicsModule) },
  { path: 'events',  data: { breadcrumb: 'Button' }, loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
  { path: 'profile', data: { breadcrumb: 'Button' }, loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
