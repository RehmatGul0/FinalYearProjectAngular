import { UploadDataComponent } from './../upload-data/upload-data.component';
import { Component, OnInit , ViewChild } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }
  isFileSelected : boolean;
  uploadDataClicked:boolean;
  ngOnInit() {
    this.uploadDataClicked=false;
    this.isFileSelected=false;
  }
  fileSelected(isFileSelected:boolean) {
    this.uploadDataClicked=true;
    this.isFileSelected=isFileSelected;
  }
  uploadData(){
    this.uploadDataClicked=true;
    if(this.isFileSelected)
      alert("success");
  }
}
