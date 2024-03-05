import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Post } from '../../models/post';
import { PageInfo } from '../../models/blog-info';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;
  blogService: BlogService = inject(BlogService);
  paginationInfo: PageInfo = { hasNextPage: false, endCursor: '' };
  isHiddenLoadMore: boolean = false;

  private router = inject(Router);

  ngOnInit() {
    this.posts$ = this.blogService.getPosts().pipe(
      tap(blogInfo => this.paginationInfo = blogInfo.pagination),
      map(blogInfo => blogInfo.posts),
    );
  }

  navigateToPost(slug: string) {
    this.router.navigate(['/post', slug]);
  }

  loadMorePosts(): void {
    if (!this.paginationInfo.hasNextPage) return;
    this.isHiddenLoadMore = true;
    this.blogService.getPosts(10, this.paginationInfo.endCursor).pipe(
      tap(blogInfo => this.paginationInfo = blogInfo.pagination),
      map(blogInfo => blogInfo.posts)
    ).subscribe(newPosts => {
      this.posts$ = this.posts$.pipe(map(posts => [...posts, ...newPosts]));
    });
  }
}
