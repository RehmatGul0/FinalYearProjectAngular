import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  constructor(private fb : FormBuilder) { 
  }
  uploadDataForm:FormGroup = this.fb.group({
    data: [null,Validators.compose([Validators.required])],
    sscMarks: ['',Validators.compose([Validators.required])],
    hscMarks: ['',Validators.compose([Validators.required])],
  });
  ngOnInit() {
  }
  handleFileInput(files: File) {
    
  }
}
