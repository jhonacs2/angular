import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class IconService {
  http: HttpClient = inject(HttpClient);

  private iconCache = new Map<string, string>();

  getIcon(key: string): Observable<string> {
    const path = `assets/icons/${key.toLowerCase()}.svg`;

    if (this.iconCache.has(path)) {
      return of(this.iconCache.get(path) || '');
    }

    return this.http.get(path, { responseType: 'text' })
      .pipe(
        map(svgContent => {
          this.iconCache.set(path, svgContent);
          return svgContent;
        }),
        catchError(error => {
          console.error(`Error loading SVG file: ${error}`);
          return of('');
        })
      );
  }
}
