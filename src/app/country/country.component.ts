import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.css']
})
export class CountryComponent {
    @Input() countryDegree: {country:string, degree:number};
    
    constructor() { }
}
