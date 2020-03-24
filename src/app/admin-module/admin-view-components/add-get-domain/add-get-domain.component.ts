import { GetDomain, response, AddDomain } from 'src/interfaces/interfaces';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { DomainService } from '../../services/domain/domain.service';
import {
  NgxSpinnerService
} from 'ngx-spinner';

@Component({
  selector: 'app-add-get-domain',
  templateUrl: './add-get-domain.component.html',
  styleUrls: ['./add-get-domain.component.css']
})
export class AddGetDomainComponent implements OnInit {
  rowData : any [] ;
  submitted:Boolean=false;
  constructor(private fb: FormBuilder , private domainService :DomainService,private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.domainService.getDomain()
    .subscribe((results:response<GetDomain[]>)=>{
      this.rowData = results.result.map((result,index)=> Object.assign(result, {index: index+1}));
    })
  }
  domainForm: FormGroup = this.fb.group({
    domainName: ['', Validators.compose([Validators.required])]
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
  
  get domainName() {
    return this.domainForm.get('domainName');
  }

  onSubmit(){
    this.submitted=true;
    if(!this.domainForm.invalid){
      this.spinner.show();
      let domain:AddDomain = {domainName:this.domainName.value};
      this.domainService.addDomain(domain)
      .subscribe((result:response<String>)=>{
        this.spinner.hide();
        window.location.reload();
        console.log('success');
      },
      (error:response<String>)=>{
        this.spinner.hide();
        console.log(error);
      });
    }
  }
  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

}
