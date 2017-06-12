import { Component, OnInit } from '@angular/core';
import { MissionsDataService } from "app/services/missions-data.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // doneRate
    countriesDegree: {country: string, degree: number}[] = [];
    missions: {agent: string, country: string, address: string, date: string}[] = [];

    constructor(private missionsDataService: MissionsDataService) { }

    ngOnInit(): void {
        this.onShowHighest();
        this.onAscending();
    }

    onShowHighest() {
        this.countriesDegree = this.missionsDataService.getCountriesDegree("highest-rated");
    }
    
    onShowAll() {
        this.countriesDegree = this.missionsDataService.getCountriesDegree("all-rated");
    }

    onAscending() :void {
        this.missions = this.missionsDataService.getSortedMissionsByDate('ascending');
    }

    onDescending() :void {
        this.missions = this.missionsDataService.getSortedMissionsByDate('descending');
    }
}
