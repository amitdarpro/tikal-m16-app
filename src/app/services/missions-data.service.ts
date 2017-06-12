export class MissionsDataService {
    missions = [
        {
            agent: '007', country: 'Brazil',
            address: 'Avenida Vieira Souto 168 Ipanema, Rio de Janeiro',
            date: 'Dec 17, 1995, 9:45:17 PM'
        },
        {
            agent: '005', country: 'Poland',
            address: 'Rynek Glowny 12, Krakow',
            date: 'Apr 5, 2011, 5:05:12 PM'
        },
        {
            agent: '007', country: 'Morocco',
            address: '27 Derb Lferrane, Marrakech',
            date: 'Jan 1, 2001, 12:00:00 AM'
        },
        {
            agent: '005', country: 'Brazil',
            address: 'Rua Roberto Simonsen 122, Sao Paulo',
            date: 'May 5, 1986, 8:40:23 AM'
        },
        {
            agent: '011', country: 'Poland',
            address: 'swietego Tomasza 35, Krakow',
            date: 'Sep 7, 1997, 7:12:53 PM'
        },
        {
            agent: '003', country: 'Morocco',
            address: 'Rue Al-Aidi Ali Al-Maaroufi, Casablanca',
            date: 'Aug 29, 2012, 10:17:05 AM'
        },
        {
            agent: '008', country: 'Brazil',
            address: 'Rua tamoana 418, tefe',
            date: 'Nov 10, 2005, 1:25:13 PM'
        },
        {
            agent: '013', country: 'Poland',
            address: 'Zlota 9, Lublin',
            date: 'Oct 17, 2002, 10:52:19 AM'
        },
        {
            agent: '002', country: 'Morocco',
            address: 'Riad Sultan 19, Tangier',
            date: 'Jan 1, 2017, 5:00:00 PM'
        },
        {
            agent: '009', country: 'Morocco',
            address: 'atlas marina beach, agadir',
            date: 'Dec 1, 2016, 9:21:21 PM'
        },

        {
            agent: '031', country: 'Israel',
            address: 'Nablus',
            date: 'Jan 3, 2017, 3:10:10 PM'
        },
        {
            agent: '012', country: 'Israel',
            address: 'Dubnov, Jerusalem',
            date: 'Dec 1, 2001, 6:00:00 AM'
        },
        {
            agent: '078', country: 'Israel',
            address: 'Yehuda HaMaccabi 13, Tel Aviv-Yafo',
            date: 'Feb 2, 2014, 5:20:00 PM'
        }                 
    ];

    isolatedAgents: string[] = [];
    notIsolatedAgents: string[] = [];
    countriesDegree: {country: string, degree: number}[] = [];
    highestDegree: number = 0;
    
    constructor() {
        this.rateCountryIsolationDegree();
    }

    rateCountryIsolationDegree() {
        this.sortAgentsByIsolation();
        this.buildCountriesArray();
        this.sortCountriesByDegree();
    } //end_fnc

    sortAgentsByIsolation(): void {
        for (let i = 0; i < this.missions.length; i++) {
            let agent = this.missions[i].agent;
            let index_isolate = this.isolatedAgents.indexOf(agent);
            let index_notIsolate = this.notIsolatedAgents.indexOf(agent);
            if (index_isolate === -1 && index_notIsolate === -1) {
                this.isolatedAgents.push(agent);
            } else if (index_isolate !== -1) {
                this.isolatedAgents.splice(index_isolate, 1);
                this.notIsolatedAgents.push(agent);
            }
        }
    } //end_fnc

    buildCountriesArray(): void {
        for (let i = 0; i < this.missions.length; i++) {
            let country = this.missions[i].country;
            let agent = this.missions[i].agent;
            
            // create an object of countriesDegree if missing
            let index = this.countriesDegree.map((o) => o.country).indexOf(country);
            if (index === -1) {
                // push
                let len = this.countriesDegree.push({country: country, degree: 0});
                index = len - 1;
            }

            // update degree if needed
            if (this.isolatedAgents.indexOf(agent) !== -1) {
                this.countriesDegree[index].degree++;
                // update the highest degree
                if (this.countriesDegree[index].degree > this.highestDegree) {
                    this.highestDegree = this.countriesDegree[index].degree;
                }
            }
        }
    } //end_fnc

    sortCountriesByDegree(): void {
        this.countriesDegree.sort((a, b) => {
            var degreeA = a.degree;
            var degreeB = b.degree;
            return degreeB > degreeA ? 1 : -1;
        });  
    } //end_fnc

    /////////////////////////////////////////////////////////////

    getCountriesDegree(viewtType: string): {country: string, degree: number}[] {
        if (viewtType === "highest-rated") {
            return this.getHighestCountriesDegree();
        } else if (viewtType === "all-rated") {
            return this.countriesDegree;
        }
    } //end_fnc

    getHighestCountriesDegree(): {country: string, degree: number}[] {
        let topCountriesDegree: {country: string, degree: number}[] = [];
        let index = 0;
        while (this.countriesDegree[index].degree === this.highestDegree) {
            topCountriesDegree.push(this.countriesDegree[index]);
            index++;
        }
        return topCountriesDegree;
    } //end_fnc

    /////////////////////////////////////////////////////////////

    getSortedMissionsByDate(order: string): {agent: string, country: string, address: string, date: string}[] {
        let _order = order || "ascending";
        return this.missions.sort((a, b) => {
            var dateA = new Date(a.date).getTime();
            var dateB = new Date(b.date).getTime();
            if (_order === "ascending") {
                return dateA > dateB ? 1 : -1;
            }
            else {
                return dateB > dateA ? 1 : -1;
            }
        });
    }
}