import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../services/service.service";
import {ServiceResponse} from "../../model/service.model";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-my-services',
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css']
})
export class MyServicesComponent implements OnInit{

  public services !: Array<ServiceResponse>;

  public constructor(
    private serviceService : ServiceService,
    private stateService : StateService
  ) {
  }
  ngOnInit() {
    this.getServicesByBusinessAccountId();
  }

  public getServicesByBusinessAccountId() : void{
    let businessAccountId : number = + this.stateService.authState.id;
    this.serviceService.getServicesByBusinessAccountId(businessAccountId).subscribe(
      {
        next : (data) => {
          this.services = data;
        },
        error : (error) => {
          console.log(error);
        }
      }
    );
  }

  public handleDeleteService(serviceId : number) : void{
    let conf = confirm("Are you sure?");
    if(conf){
      this.serviceService.deleteService(serviceId).subscribe(
        {
          next : () => {
            this.services = this.services.filter(service => service.id != serviceId);
          },
          error : (error) => {
            console.log(error);
          }
        }
      );
    }
  }
}
