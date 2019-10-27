import {Component} from '@angular/core';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {BooksService} from './books/books.service';

@Component({

  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']

})

export class AppComponent {

  constructor(private formBuilder: FormBuilder, private booksService: BooksService,
              private router: Router) {

  }

  title = 'AngularBooksPWA';

  searchForm: FormGroup;

  offline: boolean;

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });

    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }

  onSearch() {

    if (!this.searchForm.valid) {
      return;
    }

    this.router.navigate(['search'], {queryParams: {query: this.searchForm.get('search').value}});

  }

  onNetworkStatusChange() {
    this.offline = !navigator.onLine;
    console.log('offline ' + this.offline);
  }

}
