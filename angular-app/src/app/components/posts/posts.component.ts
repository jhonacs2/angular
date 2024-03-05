import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Post } from '../../models/post';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  blogURL!: string;
  posts$!: Observable<Post[]>;
  blogService: BlogService = inject(BlogService);
  private router = inject(Router);

  ngOnInit() {
    this.blogURL = this.blogService.getBlogURL();
    this.posts$ = this.blogService.getPosts(this.blogURL);
  }

  navigateToPost(slug: string) {
    this.router.navigate(['/post', slug]);
  }
}
