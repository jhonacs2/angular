import { Component, OnInit, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { BlogService } from '../../services/blog.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss'
})
export class SettingsDialogComponent implements OnInit {
  blogURL: string = 'hashnode.anguhashblog.com';
  newBlogURL: string = '';
  blogURLChanged: boolean = false;
  modalService: ModalService = inject(ModalService);
  blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
    if (this.blogURL === "hashnode.anguhashblog.com") {
      this.blogURLChanged = false;
    } else {
      this.blogURLChanged = true;
    }
  }

  changeBlogURL(): void {
    this.blogService.setBlogURL(this.newBlogURL);
    this.blogURL = this.blogService.getBlogURL();
    if (this.blogURL === "hashnode.anguhashblog.com") {
      this.blogURLChanged = false;
    } else {
      this.blogURLChanged = true;
    }
  }

  resetBlogURL(): void {
    this.blogService.resetBlogURL();
    this.blogURL = this.blogService.getBlogURL();
    this.blogURLChanged = false;
  }
}
