import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  constructor() { 
  }
  private data: File = null;
  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    this.data = files.item(0);
}

}
