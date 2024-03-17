import { Routes } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostsComponent } from './components/posts/posts.component';
import { SeriesComponent } from './components/series/series.component';

export const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'series/:slug',
    component: SeriesComponent
  },
  {
    path: ':postSlug',
    component: PostDetailsComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
