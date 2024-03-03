import { Component, Input, OnInit, inject } from '@angular/core';
import { IconService } from '../../services/icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent implements OnInit {
  @Input() icon!: string;
  svgContent!: string;
  trustedSvgContent!: SafeHtml;
  iconService: IconService = inject(IconService);
  sanitizer: DomSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.iconService.getIcon(this.icon).subscribe(svgContent => {
      this.trustedSvgContent = this.sanitizer.bypassSecurityTrustHtml(svgContent);
    });
  }

  ngOnChange(): void {
    this.iconService.getIcon(this.icon).subscribe(svgContent => {
      this.trustedSvgContent = this.sanitizer.bypassSecurityTrustHtml(svgContent);
    });
  }
}
