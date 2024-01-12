import {Component, OnInit} from '@angular/core';
import {CategoryResponse, ServiceRequest} from "../../model/service.model";
import {CategoryService} from "../../services/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../../services/service.service";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  public categories !: Array<CategoryResponse>;
  public createServiceForm !: FormGroup;
  public image !: File;

  public constructor(
    private categoryService: CategoryService,
    private serviceService : ServiceService,
    private formBuilder: FormBuilder,
    private stateService : StateService
  ) {
  }

  ngOnInit() {
    this.getAllCategories();
    this.createServiceForm = this.formBuilder.group(
      {
        name: this.formBuilder.control(null, [Validators.required]),
        shortDescription: this.formBuilder.control(null, [Validators.required]),
        longDescription: this.formBuilder.control(null, [Validators.required]),
        contactEmail: this.formBuilder.control(null, [Validators.required]),
        contactPhone: this.formBuilder.control(null, [Validators.required]),
        categoryId: this.formBuilder.control(null, [Validators.required]),
        image: this.formBuilder.control(null, [Validators.required])
      }
    );
  }

  public getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      {
        next: (data) => {
          this.categories = data
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  selectFile(event: any) {
    this.image = event.target.files.item(0);
  }

  public handleCreateService() : void{
    let service : ServiceRequest = this.createServiceForm.value;
    service.businessAccountId = +this.stateService.authState.id;
    this.serviceService.createService(service, this.image).subscribe(
      {
        next : (data) => {
          console.log(data);
        },
        error : (error) => {
          console.log(error);
        }
      }
    );
  }

}
