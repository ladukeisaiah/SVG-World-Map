import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world.component.html',
  styleUrl: './world.component.css'
})
export class WorldComponent {
  countryData: any = {};


  constructor(private http: HttpClient) {}

  countrySelect(event: any) {
    const countryIdentifier = event.target.getAttribute('id');
    this.getCountryData(countryIdentifier);
  }

  getCountryData(countryCode: string) {
    this.http.get<any[]>(`http://api.worldbank.org/V2/country/${countryCode}?format=json`)
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data && data.length > 1 && data[1].length > 0) {
            this.countryData = data[1][0];
          }
        },
        error: (error) => {
          console.error('There was an error fetching the data:', error);
        }
      });
  }
}
