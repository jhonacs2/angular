import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../../models/post';
import { AsyncPipe } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { PageInfo } from '../../models/blog-info';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [RouterLink, AsyncPipe, InfiniteScrollDirective],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss',
})
export class SeriesComponent implements OnInit {
  blogURL!: string;
  blogService: BlogService = inject(BlogService);
  paginationInfo: PageInfo = { hasNextPage: true, endCursor: '' };
  postsInSeries: Post[] = [];
  isHiddenLoadMore: boolean = false;
  isActiveInfiniteScroll: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  slug: string = '';

  private router = inject(Router);

  ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.getPostsInSeries();
    });
  }

  navigateToPost(slug: string) {
    this.router.navigate(['/post', slug]);
  }

  loadMorePosts():void {
    if (!this.paginationInfo.hasNextPage) return;
    this.isHiddenLoadMore = true;
    this.blogService.getPosts(10, this.paginationInfo.endCursor).pipe(
    ).subscribe(newPosts => {
      this.isActiveInfiniteScroll = true;
      this.paginationInfo = newPosts.pagination;
      this.postsInSeries = this.postsInSeries.concat(newPosts.posts);
    });
  }

  private getPostsInSeries():void{
    this.blogService.getPostsInSeries(this.blogURL, this.slug).subscribe(blogInfo => {
      this.paginationInfo = blogInfo.pagination;
      this.postsInSeries = blogInfo.posts;
    })
  }
}
