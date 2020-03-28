import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility.service';
import { UrlConstants } from 'src/app/core/common/url.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _utilityService:UtilityService) { }

  ngOnInit(): void {
    this._utilityService.navigate(UrlConstants.SHOP);
  }

}
