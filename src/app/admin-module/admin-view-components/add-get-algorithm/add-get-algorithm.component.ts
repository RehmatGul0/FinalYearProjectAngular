import {
  GetAlgorithm,
  response,
  AddAlgorithm
} from 'src/interfaces/interfaces';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import {
  AlgorithmService
} from '../../services/algorithm/algorithm.service';
import {
  NgxSpinnerService
} from 'ngx-spinner';

@Component({
  selector: 'app-add-get-algorithm',
  templateUrl: './add-get-algorithm.component.html',
  styleUrls: ['./add-get-algorithm.component.css']
})
export class AddGetAlgorithmComponent implements OnInit {
  rowData: any[];
  submitted: Boolean = false;
  constructor(private fb: FormBuilder, private algorithmService: AlgorithmService,private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.algorithmService.getAlgorithm()
      .subscribe((results: response < GetAlgorithm[] > ) => {
        this.rowData = results.result.map((result, index) => Object.assign(result, {
          index: index + 1
        }));
      })
  }
  algorithmForm: FormGroup = this.fb.group({
    algorithmName: ['', Validators.compose([Validators.required])]
  });
  columnDefs = [{
      headerName: 'ID',
      field: 'index'
    },
    {
      headerName: 'Name',
      field: '_name'
    },
  ];
  get algorithmName() {
    return this.algorithmForm.get('algorithmName');
  }
  onSubmit() {
    this.submitted = true;
    if (!this.algorithmForm.invalid) {
      this.spinner.show();
      let algorithm: AddAlgorithm = {
        algorithmName: this.algorithmName.value
      };
      this.algorithmService.addAlgorithm(algorithm)
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
  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

}
