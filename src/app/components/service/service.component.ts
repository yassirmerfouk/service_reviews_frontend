import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../services/service.service";
import {ServiceResponse} from "../../model/service.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{

  public service !: ServiceResponse;
  private serviceId !: number;

  public constructor(
    private serviceService : ServiceService,
    private route : ActivatedRoute
  ) {
  }
  ngOnInit() {
    this.serviceId = this.route.snapshot.params["id"];
    this.getService(this.serviceId);
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
}
