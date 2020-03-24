import { DataService } from './../../services/data/data.service';
import {
  GetDomain,
  response
} from 'src/interfaces/interfaces';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  DomainService
} from 'src/app/user-module/services/domain/domain.service';
import {
  QuestionService
} from 'src/app/user-module/services/question/question.service';
import {
  NgxSpinnerService
} from 'ngx-spinner';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor( private domainService: DomainService, private dataService:DataService,
    private questionService: QuestionService, private spinner: NgxSpinnerService) {}

  domains: GetDomain[];
  questions: any[];
  home: any[];
  userData : any[];
  dataFileId:String="Click to select feature mapping";

  ngOnInit() {
    this.domainService.getDomain().subscribe((results: response < GetDomain[] > ) => {
      this.domains = results.result.map((result, index) => Object.assign(result, {
        index: index + 1
      }));
    })
    
    this.questionService.getQuestion().subscribe((results: response < any[] > ) => {
      this.questions = results.result;
      this.home = this.domains.map(domain => {
        return {
          _id: domain._id,
          _name: domain._name,
          questions: this.questions.filter((question) =>
            question._domain._id == domain._id
          )
        }
      })
    })  
    this.dataService.getUserData().subscribe((results: response < any[] > ) => {
      this.userData = results.result;
      for(let i=0 ; i< this.home.length ;i++){
        for(let j=0 ; j<this.home[i]['questions'].length ; j++){
            this.home[i].questions[j]['userData']=this.userData.filter(data=>data._questionId===this.home[i].questions[j]._id)
        }
      }
    })
  }
  uploadData() {
    this.spinner.show();
      let  question = this.userData.find(data=>data._id===this.dataFileId);
      question = {'path':question.path,'questionId':question._questionId};
      this.questionService.getResults(question)
      .subscribe((result:any)=>{
            const blob = new Blob([result], { type: 'text/csv;charset=utf-8;' });
            var pom = document.createElement('a');
            var url = URL.createObjectURL(blob);
            pom.href = url;
            pom.setAttribute('download', 'foo.csv');
            pom.click();
            pom.remove();
            console.log('success');
            this.spinner.hide();
      },
      (error:response<String>)=>{
        this.spinner.hide();
        console.log(error);
      });
  }
  setData(data){
    console.log(data);
  }
}
