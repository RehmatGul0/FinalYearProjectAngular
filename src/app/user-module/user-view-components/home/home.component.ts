import {
  GetDomain,
  response
} from 'src/interfaces/interfaces';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
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
  constructor(private router: Router, private domainService: DomainService,
    private questionService: QuestionService, private spinner: NgxSpinnerService) {}
  isFileSelected: boolean;
  uploadDataClicked: boolean;
  testDataFile: File
  domains: GetDomain[];
  questions: any[];
  home: any[];
  ngOnInit() {
    this.uploadDataClicked = false;
    this.isFileSelected = false;
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
            question._domainId == domain._id
          )
        }
      })
    })
  }
  fileSelected(file: FileList) {
    this.testDataFile = file.item(0);
    this.uploadDataClicked = true;
    this.isFileSelected = true;
    if (file) {
      let formData = new FormData();
      formData.append('dataFile', this.testDataFile, this.testDataFile.name);
      this.spinner.show();
      this.questionService.uploadTestFile(formData)
        .subscribe((result) => {
            this.spinner.hide();
            console.log('success');
          },
          (error) => {
            this.spinner.hide();
            console.log(error);
          });
    }
  }
  uploadData() {
    this.uploadDataClicked = true;
    if (this.isFileSelected) {
      this.spinner.show();
      this.questionService.getResults()
        .subscribe((result: any) => {
            this.spinner.hide();
            const blob = new Blob([result], { type: 'text/csv;charset=utf-8;' });
            var pom = document.createElement('a');
            var url = URL.createObjectURL(blob);
            pom.href = url;
            pom.setAttribute('download', 'foo.csv');
            pom.click();
            pom.remove();
            console.log('success');
          },
          (error: any) => {
            this.spinner.hide();
            console.log(error);
          });
    }
  }
}
