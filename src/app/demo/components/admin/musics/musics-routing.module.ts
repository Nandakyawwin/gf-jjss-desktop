import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicsComponent } from './musics.component';

const routes: Routes = [{ path: '', component: MusicsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicsRoutingModule { }
