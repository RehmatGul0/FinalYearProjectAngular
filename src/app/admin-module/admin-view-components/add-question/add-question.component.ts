import { GetDomain, response, AddQuestion } from 'src/interfaces/interfaces';
import { QuestionService } from './../../services/question/question.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomainService } from '../../services/domain/domain.service';
import { ModelInfoService } from '../../services/model-info/model-info.service';
import {
  NgxSpinnerService
} from 'ngx-spinner';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  submitted: boolean = false;
  domains: any[] ;
  models: any[] ;
  dataFileText: String = "Please select your answer file"
  fileSelected:File;
  constructor(private fb: FormBuilder , private domainService :DomainService ,private spinner: NgxSpinnerService,
    private modelInfoService : ModelInfoService , private questionService : QuestionService) { }
  ngOnInit() {
    this.domainService.getDomain()
    .subscribe((results:response<GetDomain[]>)=>{
      this.domains = results.result.map((result,index)=> Object.assign(result, {index: index+1}));
    })
    this.modelInfoService.getModelInfo()
    .subscribe((results:response<GetDomain[]>)=>{
      this.models = results.result.map((result,index)=> Object.assign(result, {index: index+1}));
    })
  }
  questionForm: FormGroup = this.fb.group({
    question: ['', Validators.compose([Validators.required])],
    answerFile: ['', Validators.compose([Validators.required])],
    domain: ['', Validators.compose([Validators.required])],
    modelInfo: ['', Validators.compose([Validators.required])]
  });
  get question(){
    return this.questionForm.get('question');
  }
  get answerFile(){
    return this.questionForm.get('answerFile');
  }
  get domainId(){
    return this.questionForm.get('domain');
  }
  get modelInfoId(){
    return this.questionForm.get('modelInfo');
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.questionForm.invalid)
    if(!this.questionForm.invalid){
      this.spinner.show();
      let formData = new FormData();
      formData.append('answerFile',this.fileSelected,this.fileSelected.name);
      formData.append('question',this.question.value);
      formData.append('domainId',this.domains.find(domain=> domain.index == this.domainId.value)._id);
      formData.append('modelInfoId',this.models.find(modelInfo=> modelInfo.index == this.modelInfoId.value)._id);
      this.questionService.AddQuestion(formData)
      .subscribe((result: response < String > ) => {
        this.spinner.hide();
        console.log('success');
      },
      (error: response < String > ) => {
        this.spinner.hide();
        console.log(error);
      });
    }
  }
  handleFileInput(file: FileList) {
    if (file ) {
      this.fileSelected = file.item(0)
      this.dataFileText = file.item(0).name;
    }
  }

}
