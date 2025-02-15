import { DataService } from './../../services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { QuestionService } from '../../services/question/question.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { response } from 'src/interfaces/interfaces';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-submit-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {
  constructor(private fb : FormBuilder,private questionService: QuestionService, private spinner: NgxSpinnerService,
    private datService:DataService) { 
  }
  questions:any[];
  dataFile:File;
  fileColumns: string[] = [];
  selectFileText: string = "Choose data file";
  features: FormArray;
  originalFeatures: string[]=null;
  questionId:string;
  alert = new Subject < string > ();
  alertMessage:String = '';
  alertType:String='success';
  
  uploadDataForm:FormGroup = this.fb.group({
    dataFile: [null,Validators.compose([Validators.required])],
    question: ['',Validators.compose([Validators.required])],
    features: this.fb.array([])
  });
  
  ngOnInit() {
    this.questionService.getQuestion()
    .subscribe((results: response < any[] > )=>{
      this.questions = results.result.map((result,index)=> Object.assign(result, {index: index+1}));
    })
    this.initAlert();
    this.features=this.uploadDataForm.get('features') as FormArray
  }
  createItem(): FormGroup {
    return this.fb.group({
      feature: ['', Validators.compose([Validators.required])],
    });
  }
  handleFileInput(file: File) {
    if(file){
      this.dataFile=file[0];
      this.selectFileText=file[0].name;
      this.getColumns();
      while (this.features.length !== 0) {
        this.features.removeAt(0)
      }
    }
    else{
      this.fileColumns=null;
    }
  }
  getColumns() {
    const file: File = this.dataFile;
    const reader: FileReader = new FileReader();
    reader.readAsText(file, 'ISO-8859-1');
    reader.onload = (e) => {
      const res = reader.result as string; // This variable contains your file as text
      const lines = res.split('\n'); // Splits you file into lines
      this.fileColumns = lines[0].split(',');
    };
  }
  addFeature() {
    for (let i = 0; i < this.originalFeatures.length; i++) {
      this.features = this.uploadDataForm.get('features') as FormArray;
      this.features.push(this.createItem());
    }
  }
  getFeatures(){
    if(this.features.length>0){
      this.questionId=this.uploadDataForm.get('question').value;
      let question = this.questions.find(question=>question._id===this.questionId)
      this.originalFeatures=question._modelInfo._features;
      return;
    }
    if(this.uploadDataForm.get('question').value ){
      this.questionId=this.uploadDataForm.get('question').value;
      let question = this.questions.find(question=>question._id===this.questionId)
      this.originalFeatures=question._modelInfo._features;
      this.addFeature();
    }
    else{
      this.originalFeatures=null
    }
  }
  onSubmit(){
    console.log(this.uploadDataForm)
    if(!this.uploadDataForm.invalid){
      this.spinner.show();
      let formData = new FormData();
      formData.append('dataFile',this.dataFile,this.selectFileText);
      formData.append('questionId', this.questionId);
      formData.append('featureMapping',JSON.stringify(this.createFeatureMappings()));
      
      this.datService.uploadTestFile(formData)
      .subscribe((result: response < String > ) => {
        this.spinner.hide();
        this.successAlert();
      },
      (error: response < String > ) => {
        this.spinner.hide();
        this.dangerAlert();
      });
    }
    
  }
  createFeatureMappings(){
    let temp={};
    let selectedFeatures = this.uploadDataForm.get('features').value;
    for(let i=0 ; i<this.originalFeatures.length ; i++){
      temp[selectedFeatures[i].feature]=this.originalFeatures[i];
    }
    return temp;
  }
  initAlert() {
    this.alert.subscribe(message => this.alertMessage = message);
    this.alert.pipe(
      debounceTime(4000)
    ).subscribe(() => this.alertMessage = '');
  }
  successAlert() {
    this.alertType='success';
    this.alert.next('Model Info Successfully added');
  }
  dangerAlert() {
    this.alertType='danger';
    this.alert.next('There was an error while performing this action');
  }
}
