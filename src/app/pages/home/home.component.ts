import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$ = this.authService.currentUser$;
  today = new Date();

  flightForm: FormGroup = new FormGroup({
    airline: new FormControl('', [Validators.required]),
    arrivalDate: new FormControl('', [Validators.required]),
    arrivalTime: new FormControl('', [Validators.required]),
    flightNumber: new FormControl('', [Validators.required]),
    numOfGuests: new FormControl(0, [Validators.required, Validators.min(1)]),
    comments: new FormControl('')
  });

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    private http: HttpClient
  ) {}

  get airline() {
    return this.flightForm.get('airline');
  }

  get arrivalDate() {
    return this.flightForm.get('arrivalDate');
  }

  get arrivalTime() {
    return this.flightForm.get('arrivalTime');
  }

  get flightNumber() {
    return this.flightForm.get('flightNumber');
  }

  get numOfGuests() {
    return this.flightForm.get('numOfGuests');
  }

  get comments() {
    return this.flightForm.get('comments');
  }

  ngOnInit(): void { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  onSubmit() {
    if (!this.flightForm.valid) return;

    const payload = this.flightForm.value;
      const headers = new HttpHeaders({
        'token': environment.backendUrlToken,
        'candidate': 'Adrian Estevez'
      });

    this.http.post(environment.backendUrl, payload, { headers })
      .pipe(      
        this.toast.observe({
          loading: 'Booking...',
          success: 'Flight booked successfully!',
          error: 'Failed to book the flight!'
        })
      )
      .subscribe(() => {
        //refresh the page
        this.router.navigate(['/home']);
      });
  }
}
