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
  blogURL: string = "hashnode.anguhashblog.com";

  constructor(private apollo: Apollo) { }

  getBlogURL(): string {
    return this.blogURL;
  }

  setBlogURL(newBlogURL: string): void {
    this.blogURL = newBlogURL;
  }

  getBlogInfo(host: string): Observable<BlogInfo> {
    return this.apollo
    .watchQuery<any>({
      query: GET_BLOG_INFO,
      variables: { host: host },
    })
    .valueChanges.pipe(map(({ data }) => data.publication));
  }

  getAuthorInfo(host: string): Observable<Author> {
    return this.apollo
    .watchQuery<any>({
      query: GET_AUTHOR_INFO,
      variables: { host: host },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.author));
  }

  getPosts(host: string): Observable<Post[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_POSTS,
      variables: { host: host },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.posts.edges.map((edge: { node: any; }) => edge.node)));
  }

  getSeriesList(host: string): Observable<SeriesList[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_SERIES_LIST,
      variables: { host: host },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.seriesList.edges.map((edge: { node: any; }) => edge.node)));
  }

  getPostsInSeries(host: string, slug: string ): Observable<Post[]> {
    return this.apollo
    .watchQuery<any>({
      query: GET_POSTS_IN_SERIES,
      variables: {
        host: host,
        slug: slug
      },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.series.posts.edges.map((edge: { node: any; }) => edge.node)));
  }


  getSinglePost(host: string, slug: string ): Observable<Post>{
    return this.apollo
    .watchQuery<any>({
      query: GET_SINGLE_POST,
      variables: {
        host: host,
        slug: slug
      },
    })
    .valueChanges.pipe(map(({ data }) => data.publication.post));
  }
}
