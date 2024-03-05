import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import { Observable, map } from 'rxjs';
import { GET_AUTHOR_INFO, GET_BLOG_INFO, GET_POSTS, GET_POSTS_IN_SERIES, GET_SERIES_LIST, GET_SINGLE_POST } from '../graphql.operations';
import { Author, Post, SeriesList } from '../models/post';
import { BlogInfo } from '../models/blog-info';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogURL: string = "hashnode.anguhashblog.com";

  constructor(private apollo: Apollo) { }

  getBlogURL(): string {
    return this.blogURL;
  }

  setBlogURL(newBlogURL: string): void {
    this.blogURL = newBlogURL;
  }

  getBlogInfo(): Observable<BlogInfo> {
    return this.apollo
    .watchQuery<any>({
      query: GET_BLOG_INFO,
      variables: { host: this.blogURL },
    })
    .valueChanges.pipe(map(({ data }) => data.publication));
  }

  getAuthorInfo(): Observable<Author> {
    return this.apollo
    .watchQuery<any>({
      query: GET_AUTHOR_INFO,
    })
    .valueChanges.pipe(map(({ data }) => data.publication.author));
  }

  getPosts(): Observable<Post[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_POSTS,
    })
    .valueChanges.pipe(map(({ data }) => data.publication.posts.edges.map((edge: { node: any; }) => edge.node)));
  }

  getSeriesList(): Observable<SeriesList[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_SERIES_LIST,
    })
    .valueChanges.pipe(map(({ data }) => data.publication.seriesList.edges.map((edge: { node: any; }) => edge.node)));
  }

  getPostsInSeries(slug: string): Observable<Post[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_POSTS_IN_SERIES,
      variables: {
        slug: slug,
      },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.series.posts.edges.map((edge: { node: any; }) => edge.node)));
  }


  getSinglePost(slug: string): Observable<Post>{
    return this.apollo
    .watchQuery<any>({
      query: GET_SINGLE_POST,
      variables: {
        slug: slug,
      },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.post));
  }
}
