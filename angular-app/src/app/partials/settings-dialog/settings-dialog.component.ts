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
  newBlogURL: string = '';
  modalService: ModalService = inject(ModalService);
  blogService: BlogService = inject(BlogService);

  ngOnInit(): void {
    this.blogService.setBlogURL(this.newBlogURL);
  }

  onInputChange(): void {
    this.blogService.setBlogURL(this.newBlogURL);
    this.modalService.showSettingsDialog = false;
    console.log(this.blogService.getBlogURL())
    this.blogService.getBlogInfo();
  }
}
