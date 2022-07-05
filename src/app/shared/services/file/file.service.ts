import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  download(mediaType: string, file: string, name: string): void {
    const linkSource = `data:${mediaType};base64,${file}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = name;
    downloadLink.click();
  }
}
