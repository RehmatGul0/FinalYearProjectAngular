import {
  ModelInfoService
} from './../../services/model-info/model-info.service';
import {
  AlgorithmService
} from './../../services/algorithm/algorithm.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  debounceTime
} from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import {
  response,
  GetAlgorithm,
  GetDomain
} from 'src/interfaces/interfaces';
import {
  NgxSpinnerService
} from 'ngx-spinner';
import {
  DomainService
} from 'src/app/user-module/services/domain/domain.service';
import {
  Subject
} from 'rxjs';

@Component({
  selector: 'app-add-model-info',
  templateUrl: './add-model-info.component.html',
  styleUrls: ['./add-model-info.component.css']
})
export class AddModelInfoComponent implements OnInit {

  constructor(private fb: FormBuilder, private algorithmService: AlgorithmService, private domainService: DomainService,
    private modelInfoService: ModelInfoService, private spinner: NgxSpinnerService) {}
  features: FormArray;
  submitted: boolean = false;
  algos: any[];
  domains: any[];
  dataFileText: String = "Please select your data file"
  modelFileText: String = "Please select your model file"
  dataFileSelected: File;
  modelFileSelected: File;
  alert = new Subject < string > ();
  alertMessage:String = '';
  alertType:String='success';
  ngOnInit() {
    this.algorithmService.getAlgorithm()
      .subscribe((results: response < GetAlgorithm[] > ) => {
        this.algos = results.result.map((result, index) => Object.assign(result, {
          index: index + 1
        }));
      })
    this.domainService.getDomain()
      .subscribe((results: response < GetDomain[] > ) => {
        this.domains = results.result.map((result, index) => Object.assign(result, {
          index: index + 1
        }));
      })
    this.initAlert();
  }
  //dynamically adding removing elements from form array
  createItem(): FormGroup {
    return this.fb.group({
      feature: ['', Validators.compose([Validators.required])],
    });
  }
  addFeature(): void {
    this.features = this.modelInfoForm.get('features') as FormArray;
    this.features.push(this.createItem());
  }
  removeFeature(): void {
    this.features = this.modelInfoForm.get('features') as FormArray;
    this.features.removeAt(this.features.length - 1);
  }
  //Form
  modelInfoForm: FormGroup = this.fb.group({
    modelFile: ['', Validators.compose([Validators.required])],
    dataFile: [null, Validators.compose([Validators.required])],
    algorithm: ['', Validators.compose([Validators.required])],
    features: this.fb.array([this.createItem()]),
    domain: ['', Validators.compose([Validators.required])],
  });

  // getters for error handling in html file
  get modelFile() {
    return this.modelInfoForm.get('modelFile');
  }
  get algorithm() {
    return this.modelInfoForm.get('algorithm');
  }
  get featureList() {
    return this.modelInfoForm.get('features');
  }
  get domainId() {
    return this.modelInfoForm.get('domain');
  }
  //on form submit
  onSubmit() {
    this.submitted = true;
    if (!this.modelInfoForm.invalid) {
      this.spinner.show();
      let formData = new FormData();
      formData.append('dataFile', this.dataFileSelected, this.dataFileSelected.name);
      formData.append('modelFile', this.modelFileSelected, this.modelFileSelected.name);
      formData.append('algorithmId', this.algos.find(algorithm => algorithm.index == this.algorithm.value)._id);
      formData.append('domain', this.domainId.value);
      formData.append('features', JSON.stringify(this.featureList.value.map(feature => feature.feature)));

      this.modelInfoService.AddModelInfo(formData)
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
  handleDataFileInput(file: FileList) {
    if (file) {
      this.dataFileSelected = file.item(0)
      this.dataFileText = file.item(0).name;
    }
  }
  handleModelFileInput(file: FileList) {
    if (file) {
      this.modelFileSelected = file.item(0)
      this.modelFileText = file.item(0).name;
    }
  }
  initAlert() {
    this.alert.subscribe(message => this.alertMessage = message);
    this.alert.pipe(
      debounceTime(4000)
    ).subscribe(() => this.alertMessage = '');
  }
  successAlert() {
    this.alertType='success';
    this.alert.next('Model training Successfull');
  }
  dangerAlert() {
    this.alertType='danger';
    this.alert.next('There was an error while performing this action');
  }

}
