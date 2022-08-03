import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

}


////////// Cloud Firestore ////////
// Firestore is a no sequeal database with two core notation with "collection" and "documents".
// Schema less: means each document in a collection can have different data structure. Hence not bound to specific interface.
// Firestore is a schema less therefore, we can add or remove a data to the single document without applying same changes to the entire database. This feature saves lot of time as compared to schema database (sequal).