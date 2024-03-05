import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { BlogService } from "../../services/blog.service";
import { AsyncPipe, KeyValuePipe } from "@angular/common";
import { BlogInfo, BlogLinks } from "../../models/blog-info";
import { RouterLink } from "@angular/router";
import { SeriesList } from "../../models/post";
import { FollowDialogComponent } from "../../partials/follow-dialog/follow-dialog.component";
import { ModalService } from "../../services/modal.service";
import { IconService } from "../../services/icon.service";
import { SvgIconComponent } from "../../partials/svg-icon/svg-icon.component";
import { SettingsDialogComponent } from "../../partials/settings-dialog/settings-dialog.component";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [KeyValuePipe, AsyncPipe, RouterLink, FollowDialogComponent, SvgIconComponent, SettingsDialogComponent],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
	blogInfo!: BlogInfo;
	blogName: string = "";
	// start with default image to prevent 404 when returning from post-details page
	blogImage: string = "/assets/images/anguhashblog-logo.jpg";
	blogSocialLinks!: BlogLinks;
	seriesList!: SeriesList[];
	themeService: ThemeService = inject(ThemeService);
	blogService: BlogService = inject(BlogService);
	modalService: ModalService = inject(ModalService);
  iconService: IconService = inject(IconService);
	private querySubscription?: Subscription;

	ngOnInit(): void {
		this.querySubscription = this.blogService
			.getBlogInfo()
			.subscribe((data) => {
				this.blogInfo = data;
				this.blogName = this.blogInfo.title;
				this.blogImage =
					this.blogInfo.isTeam && this.blogInfo.favicon
						? (this.blogImage = this.blogInfo.favicon)
						: "/assets/images/anguhashblog-logo.jpg";
				if (!this.blogInfo.isTeam) {
					this.blogService.getAuthorInfo().subscribe((data) => {
						this.blogImage = data.profilePicture
							? data.profilePicture
							: "/assets/images/anguhashblog-logo.jpg";
					});
				}
				const { __typename, ...links } = data.links;
				this.blogSocialLinks = links;
			});
		this.querySubscription = this.blogService
			.getSeriesList()
			.subscribe((data) => {
				this.seriesList = data;
			});
	}

	toggleTheme(): void {
		this.themeService.updateTheme();
	}

  getIcon(key: string) {
    return this.iconService.getIcon(key);
  }

	ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
	}
}
