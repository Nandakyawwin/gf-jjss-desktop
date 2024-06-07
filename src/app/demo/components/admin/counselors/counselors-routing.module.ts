import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounselorsComponent } from './counselors.component';

const routes: Routes = [{ path: '', component: CounselorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounselorsRoutingModule { }
