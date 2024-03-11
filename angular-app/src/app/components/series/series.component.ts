import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { PageInfo, Post } from '../../models/post';
import { BlogService } from '../../services/blog.service';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [RouterLink, AsyncPipe, InfiniteScrollDirective, SlicePipe],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss',
})
export class SeriesComponent implements OnInit {
  blogURL!: string;
  blogService: BlogService = inject(BlogService);
  paginationInfo: PageInfo = { hasNextPage: true, endCursor: '' };
  postsInSeries: Post[] = [];
  isHiddenLoadMore: boolean = true;
  isActiveInfiniteScroll: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  slugSeries: string = '';

  ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
    this.route.params.subscribe(params => {
      this.slugSeries = params['slugSeries'];
      this.loadPostsInSeries();
    });
  }

  private loadPostsInSeries():void{
    this.blogService.getPostsInSeries(this.blogURL, this.slugSeries).subscribe(blogInfo => {
      this.paginationInfo = blogInfo.pagination;
      this.isHiddenLoadMore = !blogInfo.pagination.hasNextPage;
      this.postsInSeries = blogInfo.posts;
    })
  }

  loadMorePostsFromSeries():void {
    if (!this.paginationInfo.hasNextPage) return;
    this.isHiddenLoadMore = true;
    this.blogService.getPostsInSeries(this.blogURL, this.slugSeries, this.paginationInfo.endCursor).pipe(
    ).subscribe(newPosts => {
      this.isActiveInfiniteScroll = true;
      this.paginationInfo = newPosts.pagination;
      this.postsInSeries = this.postsInSeries.concat(newPosts.posts);
    });
  }
}
