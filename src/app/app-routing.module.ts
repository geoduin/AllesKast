import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "Home", component: HomeComponent},
  {path: "AboutUs", component: AboutMeComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
