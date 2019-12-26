import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {
  constructor(private fb : FormBuilder) { 
  }
  @Output() fileSelected = new EventEmitter<File>();
  uploadDataForm:FormGroup = this.fb.group({
    data: [null,Validators.compose([Validators.required])],
  });
  selectFileText:string = "Choose data file first";
  ngOnInit() {
  }
  handleFileInput(file: File) {
    if(file){
      this.fileSelected.emit(file);
      this.selectFileText=file[0].name;
    }
  }
}
