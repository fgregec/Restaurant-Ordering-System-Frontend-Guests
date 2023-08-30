import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest!: FormGroup;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private http: HttpClient) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name')?.value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          this.callApi(result.token.id);
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  callApi(token: string): void {
    const apiUrl = 'http://localhost:5078/api/payment/charge'; // Change to your API URL

    const payload = {
      token: token, // Send the token ID
      amount: 2000 // Example: $20 in cents
    };

    this.http.post(apiUrl, payload).subscribe(
      (response) => {
        console.log(response); // Handle successful API response
      },
      (error) => {
        console.log(error); // Handle API error
      }
    );
  }

}
