import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { DetailComicComponent } from './features/detail-comic/detail-comic.component';
import { HomeComponent } from './features/home/home.component';
import { NormalComicsListComponent } from './features/normal-comics-list/normal-comics-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "Home", component: HomeComponent, children:[
    {path: "Story/:id", component: DetailComicComponent}
  ]},
  {path: "StoryList", component: NormalComicsListComponent},
  {path: "Story/:id", component: DetailComicComponent},
  {path: "AboutUs", component: AboutMeComponent},
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
