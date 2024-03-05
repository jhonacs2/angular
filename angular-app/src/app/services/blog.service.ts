import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import {
  GET_AUTHOR_INFO,
  GET_BLOG_INFO,
  GET_POSTS,
  GET_POSTS_IN_SERIES,
  GET_SERIES_LIST,
  GET_SINGLE_POST
} from '../graphql.operations';
import { Author, Post, SeriesList } from '../models/post';
import { BlogInfo, BlogPaginationInfo } from '../models/blog-info';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private apollo: Apollo) { }

  getBlogInfo(): Observable<BlogInfo> {
    return this.apollo
    .watchQuery<any>({
      query: GET_BLOG_INFO,
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

  getPosts(first: number = 10, after: string = ''): Observable<BlogPaginationInfo> {
    return this.apollo
      .watchQuery<any>({
        query: GET_POSTS(first,after),
      })
      .valueChanges.pipe(
        map(({ data }) => {
          const { edges, pageInfo } = data.publication.posts;
          return {
            posts: edges.map((edge: { node: any; }) => edge.node),
            pagination: pageInfo
          };
        }));
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
