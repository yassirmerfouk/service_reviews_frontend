import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../services/service.service";
import {CategoryResponse, ServiceResponse} from "../../model/service.model";
import {CategoryService} from "../../services/category.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  public services !: Array<ServiceResponse>;
  public categories !: Array<CategoryResponse>;
  public filterForm !: FormGroup;

  public constructor(
    private serviceService: ServiceService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAllCategories();
    this.getAllServices();
    this.filterForm = this.formBuilder.group(
      {
        category: this.formBuilder.control("null")
      }
    );
  }

  private getAllServices() {
    this.serviceService.getAllServices().subscribe(
      {
        next: (data) => {
          this.services = data
        },
        error: (error) => {
          console.log(error);
        }
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

  public handleFilter(): void {
    if (this.filterForm.value.category == "null")
      this.getAllServices();
    else {
      let categoryId: number = this.filterForm.value.category;
      this.serviceService.getServicesByCategory(categoryId).subscribe(
        {
          next: (data) => {
            this.services = data
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
    }
  }


  public handleToService(serviceId: number): void {
    this.router.navigateByUrl("/service/" + serviceId);
  }
}
