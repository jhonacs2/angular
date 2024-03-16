import { Component, OnInit, inject } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { ModalService } from "../../services/modal.service";
import { from, timer } from "rxjs";

@Component({
	selector: "app-share-dialog",
	standalone: true,
	imports: [],
	templateUrl: "./share-dialog.component.html",
	styleUrl: "./share-dialog.component.scss",
})
export class ShareDialogComponent implements OnInit {
	currentUrl: string = "";
	modalService: ModalService = inject(ModalService);
	blogService: BlogService = inject(BlogService);

	ngOnInit(): void {
    this.currentUrl = window.location.href;
	}

  copyPostURL(): void {
		from (
			navigator.clipboard.writeText(this.currentUrl)
		).subscribe({
			next: () => {
        const buttonElement = document.querySelector(".copy-btn") as HTMLButtonElement;
				buttonElement.textContent = "Post Link Copied ✅";
				timer(1500).subscribe(() => (buttonElement.textContent = "Copy Post Link"));
			},
			error: (err: any) => console.error('Failed to copy: ', err),
		});
	}
}
