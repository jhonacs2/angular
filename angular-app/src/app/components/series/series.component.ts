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
  slug: string = '';

  ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.loadPostsInSeries();
    });
  }

  private loadPostsInSeries():void{
    this.blogService.getPostsInSeries(this.blogURL, this.slug).subscribe(seriesPageInfo => {
      this.paginationInfo = seriesPageInfo.pagination;
      this.isHiddenLoadMore = !seriesPageInfo.pagination.hasNextPage;
      this.postsInSeries = seriesPageInfo.posts;
    })
  }

  loadMorePostsFromSeries():void {
    if (!this.paginationInfo.hasNextPage) return;
    this.isHiddenLoadMore = true;
    this.blogService.getPostsInSeries(this.blogURL, this.slug, this.paginationInfo.endCursor).pipe(
    ).subscribe(newPosts => {
      this.isActiveInfiniteScroll = true;
      this.paginationInfo = newPosts.pagination;
      this.postsInSeries = this.postsInSeries.concat(newPosts.posts);
    });
  }
}
