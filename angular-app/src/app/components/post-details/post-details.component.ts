import { AfterViewInit, Component, ElementRef, Renderer2, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Post } from '../../models/post';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClipboardCopyButtonDirective } from '../../directives/clipboard-copy-button.directive';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ThemeService } from '../../services/theme.service';
import { FooterComponent } from '../footer/footer.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { BlogInfo } from '../../models/blog-info';

@Component({
	selector: "app-post-details",
	standalone: true,
	imports: [
		SidenavComponent,
		FooterComponent,
		RouterLink,
		AsyncPipe,
		DatePipe,
		ClipboardCopyButtonDirective,
	],
	templateUrl: "./post-details.component.html",
	styleUrl: "./post-details.component.scss",
})
export class PostDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
	sidenavOpen: boolean = false;
	blogURL!: string;
	blogInfo!: BlogInfo;
	blogName: string = "";
	post$!: Observable<Post>;
  modifiedPost!: Post;
	themeService: ThemeService = inject(ThemeService);
	route: ActivatedRoute = inject(ActivatedRoute);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
	private blogService = inject(BlogService);
	private querySubscription?: Subscription;

  // private el = inject(ElementRef);
  private renderer = inject(Renderer2);

	@Input({ required: true }) slug!: string;

	ngOnInit(): void {
		this.blogURL = this.blogService.getBlogURL();
		this.querySubscription = this.blogService
			.getBlogInfo(this.blogURL)
			.subscribe((data) => {
				this.blogInfo = data;
				this.blogName = this.blogInfo.title;
			});
		this.post$ = this.blogService.getSinglePost(this.blogURL, this.slug);
	}

	toggleTheme(): void {
		this.themeService.updateTheme();
	}

	toggleSidenav() {
		this.sidenavOpen = !this.sidenavOpen;
	}

  ngAfterViewInit() {
    this.post$.subscribe((post) => {
      // Log the post data to the console
      console.log('Post data:', post.content);

      // Extract the HTML content from post
      let htmlContent = post.content.html;

      // Create a temporary div to parse the HTML
      let tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;

      // Try to access the element here using querySelector
      let embedWrapperDiv = tempDiv.querySelector('.embed-wrapper');

      if (embedWrapperDiv) {
        console.log('Element found:', embedWrapperDiv);

        // Set the inner HTML using Renderer
        this.renderer.setProperty(embedWrapperDiv, 'innerHTML', '<p>Your new HTML content</p>');

        // Clone the post object to make modifications
        this.modifiedPost = { ...post };

        // Assign the modified HTML content to the cloned post object
        this.modifiedPost.content = { ...post.content, html: tempDiv.innerHTML.toString() };

        // Now you can use the modifiedPost object as needed
      } else {
        console.error('Element not found');
      }
    });
  }


  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

	ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
	}
}
