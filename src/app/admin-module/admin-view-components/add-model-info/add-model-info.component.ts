import { ModelInfoService } from './../../services/model-info/model-info.service';
import { AlgorithmService } from './../../services/algorithm/algorithm.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { response, GetAlgorithm } from 'src/interfaces/interfaces';
import {
  NgxSpinnerService
} from 'ngx-spinner';

@Component({
  selector: 'app-add-model-info',
  templateUrl: './add-model-info.component.html',
  styleUrls: ['./add-model-info.component.css']
})
export class AddModelInfoComponent implements OnInit {

  constructor(private fb: FormBuilder , private algorithmService :AlgorithmService , 
    private modelInfoService:ModelInfoService,private spinner: NgxSpinnerService) {}
  features: FormArray;
  submitted: boolean = false;
  algos: any[] ;
  dataFileText: String = "Please select your data file"
  modelFileText: String = "Please select your model file"
  dataFileSelected:File;
  modelFileSelected:File;
  ngOnInit() {
    this.algorithmService.getAlgorithm()
    .subscribe((results:response<GetAlgorithm[]>)=>{
      this.algos = results.result.map((result,index)=> Object.assign(result, {index: index+1}));
    })
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
    features: this.fb.array([this.createItem()])
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
  //on form submit
  onSubmit() {
    this.submitted = true;
    console.log(this.modelInfoForm)
    if(!this.modelInfoForm.invalid){
      this.spinner.show();
      let formData = new FormData();
      formData.append('dataFile',this.dataFileSelected,this.dataFileSelected.name);
      formData.append('modelFile',this.modelFileSelected,this.modelFileSelected.name);
      formData.append('algorithmId',this.algos.find(algorithm=> algorithm.index == this.algorithm.value)._id);
      formData.append('features',JSON.stringify(this.featureList.value.map(feature=>feature.feature)));
      
      this.modelInfoService.AddModelInfo(formData)
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

}
