import { Component, OnInit, inject } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { BlogService } from "../../services/blog.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
	selector: "app-settings-dialog",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: "./settings-dialog.component.html",
	styleUrl: "./settings-dialog.component.scss",
})
export class SettingsDialogComponent implements OnInit {
	blogURL: string = "hashnode.anguhashblog.com";
	newBlogInput: string = "";
	newBlogURL: string = "";
	blogURLChanged: boolean = false;
	noBlogFound: boolean = false;
	emptyInput: boolean = false;
	invalidInput: boolean = false;
	modalService: ModalService = inject(ModalService);
	blogService: BlogService = inject(BlogService);

	ngOnInit(): void {
		this.noBlogFound = false;
		this.blogURL = this.blogService.getBlogURL();
		if (this.blogURL === "hashnode.anguhashblog.com") {
			this.blogURLChanged = false;
		} else {
			this.blogURLChanged = true;
		}
	}

	changeBlogURL(): void {
		this.noBlogFound = false;
		if (this.newBlogInput === "") {
			this.emptyInput = true;
			return;
		} else if ( this.newBlogInput !== "") {
      this.emptyInput = false;

      if (this.newBlogInput.includes("https://") || this.newBlogInput.endsWith("/")) {
        const cleanedBlogURL = this.newBlogInput.split("https://")[1];
        this.newBlogURL = cleanedBlogURL.split("/")[0];

      } else {
        this.newBlogURL = this.newBlogInput;
      }

			this.blogService.getBlogInfo(this.newBlogURL).subscribe((blogInfo) => {
				if (blogInfo === null) {
					this.noBlogFound = true;
					this.blogURLChanged = false;
					this.newBlogInput = "";
				} else {
					this.blogService.setBlogURL(this.newBlogURL);
					this.blogURL = this.blogService.getBlogURL();
          this.blogURLChanged = true;
          this.modalService.showSettingsDialog = false;
		      window.location.reload();
				}
			});
		} else if (this.blogURL === "hashnode.anguhashblog.com") {
      this.blogURLChanged = false;
    } else {
			this.noBlogFound = true;
			this.emptyInput = false;
			this.blogURLChanged = false;
      this.invalidInput = true;
			this.newBlogInput = "";
		}
	}

	resetBlogURL(): void {
		this.blogService.resetBlogURL();
		this.blogURL = this.blogService.getBlogURL();
		this.emptyInput = false;
		this.blogURLChanged = false;
		this.modalService.showSettingsDialog = false;
		window.location.reload();
	}
}
