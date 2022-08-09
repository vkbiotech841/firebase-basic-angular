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

/////////// Running Emulators ////////

// Two things need to be run:
// (1) first npm start, then
// (2) Start Emulators

/////////////////// Emulators starts: using following commands:///////
// firebase emulators:start --only firestore

// refresh the application (all previous data will not be visible, since, emulator database is empty).
// exporting datasets from emulators is very necessary. Because once emulators stops all virtual database will be lost. Hence, we need to export the emulators data at that time and when we restart the sesson again, we need to import all the exported database so that we can resume working from the same point.

// our samples datasets are in "test-data" directory.

////////////////// Exporting emulator database by following command: /////////
// Keep app running as well as emulator.
// firebase emulators:export <collectionOrDocumentName>
// example:  firebase emulators:export sample-courses

////////////////// importing emulator by following command: /////////
// firebase emulators:start --import <collectionOrDocumentName>
// example:  firebase emulators:start  --only firestore --import sample-courses