import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../services/service.service";
import {ReviewRequest, ReviewResponse, ServiceResponse} from "../../model/service.model";
import {ActivatedRoute} from "@angular/router";
import {StateService} from "../../services/state.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{

  public service !: ServiceResponse;
  private serviceId !: number;
  public reviews !: Array<ReviewResponse>;
  public didReview : boolean = false;
  public reviewForm !: FormGroup;

  public constructor(
    private serviceService : ServiceService,
    private route : ActivatedRoute,
    public stateService : StateService,
    private formBuilder : FormBuilder
  ) {
  }
  ngOnInit() {
    this.serviceId = this.route.snapshot.params["id"];
    this.getService(this.serviceId);
    this.getServiceReviews(this.serviceId);
    if(this.stateService.authState.isAuthenticated && this.stateService.authState.roles.includes('PERSONNEL')){
    this.check(+this.stateService.authState.id);
    }
    this.reviewForm = this.formBuilder.group(
      {
        grade : this.formBuilder.control(5),
        comment : this.formBuilder.control(null)
      }
    );
  }

  public getService(id : number) : void {
    this.serviceService.getService(id).subscribe({
      next : (data) => {
        this.service = data;
      },
      error : (error) => {
        console.log(error);
      }
    });
  }

  public getServiceReviews(id : number) : void{
    this.serviceService.getServiceReviews(id).subscribe(
      {
        next : (data) => {
          console.log(data);
          this.reviews = data;
        },
        error : (error) => {
          console.log(error);
        }
      }
    );
  }

  public check(personnelAccountId : number) : void{
    this.serviceService.personnelAccountDidReview(personnelAccountId, this.serviceId)
      .subscribe(
        {
          next : (data) => {
            console.log(data);
            this.didReview = data;
          },
          error : (error) => {
            console.log(error);
          }
        }
      );
  }

  public handleAddReview() : void {
    let review : ReviewRequest = this.reviewForm.value;
    review.serviceId = this.serviceId;
    review.personnelAccountId = + this.stateService.authState.id;
    this.serviceService.addReview(review).subscribe(
      {
        next : () => {
          this.didReview = true;
          this.getServiceReviews(this.serviceId);
          this.getService(this.serviceId);
        },
        error : (error) => {
          console.log(error);
        }
      }
    );
  }
}
