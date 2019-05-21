import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.services';
import { BookingsService } from '../services/bookings.service';
declare var $: any;
@Component({
  selector: 'app-car-booking',
  templateUrl: './car-booking.component.html',
  styleUrls: ['./car-booking.component.css']
})
export class CarBookingComponent implements OnInit {
   id: any;
  price: any;
  carName: any;
  carYear: any;
  description: any;
  milage: any;
  fuelType: any;
  features: any;
  doorCount: any;
  seatCount: any;
  carTempImg: string;
   startDate: Date;
   endDate: Date;
  imgPath: string;
   carObj = {};
 newObj = {};

  constructor(private carsService: CarsService,
    private route: Router, private modalService: NgbModal,
    private authService: AuthenticationService,
    private booking: BookingsService, private active: ActivatedRoute) { }

 

  ngOnInit() {
    $(document).ready(function() {
      $('.datepicker').datepicker();
    });

    this.newObj = JSON.parse(localStorage.currentUser)[0];
    console.log( this.newObj);
    this.id = this.active.snapshot.params['id'];
    console.log(this.id);


    this.carsService.getCar(this.id).then(

      data =>{
        console.log('oho here comes dataaaaaaa');
        console.log(data);
        this.carObj = data;
   
        this.populateCarsDetails(this.carObj);
        console.log('ane mona wadayakda');
        console.log(this.carObj['userId']);
       }
    );
   
  }
  populateCarsDetails(carObj){
    this.price = carObj.carPrice;
    this.carName = carObj.carName;
    this.carYear = carObj.carYear;
    this.imgPath = carObj.carImagePath;    
    //method to check the
    if(!this.imgPath){
      console.log("no car image");
    
    this.imgPath = this.carTempImg
    console.log(this.imgPath);
    
    }else{
      console.log('have car image');
    }
    }
}