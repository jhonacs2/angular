import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { Post } from '../../models/post';
import { PageInfo } from '../../models/blog-info';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterLink, AsyncPipe, InfiniteScrollDirective, SlicePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  blogURL!: string;
  posts!: Post[];
  blogService: BlogService = inject(BlogService);
  paginationInfo: PageInfo = { hasNextPage: true, endCursor: '' };
  isHiddenLoadMore: boolean = true;
  isActiveInfiniteScroll: boolean = false;

  private router = inject(Router);

  ngOnInit() {
    this.blogURL = this.blogService.getBlogURL();
    this.loadPosts();
  }

  navigateToPost(slug: string) {
    this.router.navigate(['/post', slug]);
  }

  private loadPosts(): void {
    this.blogService.getPosts(this.blogURL, this.paginationInfo.endCursor).subscribe(blogPaginationInfo => {
      this.paginationInfo = blogPaginationInfo.pagination;
      this.isHiddenLoadMore = !blogPaginationInfo.pagination.hasNextPage;
      this.posts = blogPaginationInfo.posts;
    });
  }

  loadMorePosts(): void {
    if (!this.paginationInfo.hasNextPage) return;
    this.isHiddenLoadMore = true;
    this.blogService.getPosts(this.blogURL, this.paginationInfo.endCursor).pipe(
    ).subscribe(newPosts => {
      this.isActiveInfiniteScroll = true;
      this.paginationInfo = newPosts.pagination;
      this.posts = this.posts.concat(newPosts.posts);
    });
  }
}
