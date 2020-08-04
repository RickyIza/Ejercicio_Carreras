import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera';
import { CarreraService } from 'src/app/services/carrera.service';
import { ActivatedRoute } from '@angular/router';
import { faListAlt ,faUser, faIdCard, faCalendar, faMapMarked, faGenderless, faCalendarTimes,faBookOpen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-carrera-card',
  templateUrl: './carrera-card.component.html',
  styleUrls: ['./carrera-card.component.css']
})
export class CarreraCardComponent implements OnInit {

  carrera : Carrera;
  faBookOpen=faBookOpen;
  faCalendarTimes=faCalendarTimes;
  faUser = faUser;
  faIdCard = faIdCard;
  faCalendar = faCalendar;
  faMapMarked = faMapMarked;
  faGenderless = faGenderless;
  faListAlt = faListAlt;
  
  constructor(private carreraService:CarreraService,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.carreraService.retrieve(params['id']).subscribe(
            result => this.carrera = result
          )
        }
      }
    );
  }

}
