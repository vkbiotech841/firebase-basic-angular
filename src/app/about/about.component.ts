import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';


import 'firebase/firestore';

import { AngularFirestore } from '@angular/fire/firestore';
import { COURSES, findLessonsForCourse } from './db-data';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {

    constructor(private db: AngularFirestore) {
    }

    async uploadData() {
        const coursesCollection = this.db.collection('courses');
        const courses = await this.db.collection('courses').get();
        for (let course of Object.values(COURSES)) {
            const newCourse = this.removeId(course);
            const courseRef = await coursesCollection.add(newCourse);
            const lessons = await courseRef.collection('lessons');
            const courseLessons = findLessonsForCourse(course['id']);
            console.log(`Uploading course ${course['description']}`);
            for (const lesson of courseLessons) {
                const newLesson = this.removeId(lesson);
                delete newLesson.courseId;
                await lessons.add(newLesson);
            }
        }
    }

    removeId(data: any) {
        const newData: any = { ...data };
        delete newData.id;
        return newData;
    }


    //////////////////// Get Method ///////////////////////

    // get() is a short lives value, it emits only at once and then gets completed.

    // Get document data
    public onReadDoc(): void {
        this.db.doc("/courses/9AmtHQZkYxOxx9lAzFHW")
            .get()
            .subscribe(snap => {

                console.log("id", snap.id);
                console.log("data", snap.data());
            })
    }

    // Get collection data
    public onReadCourseCollection(): void {
        this.db.collection("courses")
            .get()
            .subscribe(snaps => {

                snaps.forEach(snap => {
                    console.log("id", snap.id);
                    console.log("data", snap.data());
                })

            })
    }

    // Get sub-collection data
    public onReadLessonCollection(): void {
        this.db.collection("/courses/AtdUZzfLTFpxeu9ju3Pp/lessons")
            .get()
            .subscribe(snaps => {

                snaps.forEach(snap => {
                    console.log("id", snap.id);
                    console.log("data", snap.data());
                })

            })

    }

    // Get collection by complex query (filtering)
    // provide second argument to the collection as a function
    // Cloud Firestore creates the indexes defined by your automatic index settings for each field you add, enabling most simple queries (ascending, descending, arrays) by default. 

    // Single params query

    public onReadFilterCollection(): void {
        this.db.collection(
            "/courses/AtdUZzfLTFpxeu9ju3Pp/lessons",
            ref => ref.where("seqNo", "==", 1)
        )
            .get()
            .subscribe(snaps => {

                snaps.forEach(snap => {
                    console.log("id", snap.id);
                    console.log("data", snap.data());
                })

            })

    }

    // Single params + range

    public onReadFilterRangeCollection(): void {
        this.db.collection(
            "/courses/AtdUZzfLTFpxeu9ju3Pp/lessons",
            ref => ref.where("seqNo", "<=", 5).orderBy("seqNo")
        )
            .get()
            .subscribe(snaps => {

                snaps.forEach(snap => {
                    console.log("id", snap.id);
                    console.log("data", snap.data());
                })

            })

    }


    // multi params 
    // Probelm:
    // firebase creates an index for every field in a document. Firebase performs query based on these indexes. while multi  field query, this creates a problem. Hence, combine query field does not work because firebase does not have combined query field index.
    // solution: 
    // For complex query, we need to add index manually by login to the firebase console page => clound firestore =>  look for the indexes tab => composite.



    // collection group queries

    public onReadCollectionGroup(): void {
        this.db.collectionGroup("lessons",
            ref => ref.where("seqNo", "==", 1))
            .get()
            .subscribe(snaps => {

                snaps.forEach(snap => {
                    console.log("id", snap.id);
                    console.log("data", snap.data());
                })

            })
    }

    // initially this will give an index error. Click on the link in the console, it will take you to the firebase and will create an index. Save the composite index.
    // Run this method again.


    //////////////////// Snapshot Method ///////////////////////
    // Long lived observables. then always received emited values once initiated.
    // They only gets stops observing the values,when we unsubscribe or stop the application.
    // Uses: When you want data along with id (a complete snapshort).

    //  Get method give the current version of the data but does not keep observing the data changes. Means doesn't updates.
    // Snapshot changes method to get the realtime data changes values. Since, Any changes in the database gets reflected in-real time in the application.

    // Snapshort method : For Document
    public onReadDocBySnapshortMethod(): void {
        this.db.doc("/courses/9AmtHQZkYxOxx9lAzFHW")
            .snapshotChanges()
            .subscribe(snap => {

                console.log("id", snap.payload.id);
                console.log("data", snap.payload.data());
            })
    }

    // First click on the button to start the observation process then next step.

    // now go to the firebase cloud firestore, change the data of the document manually, check the console, any change in the field data will be reflected in the console in-realtime.


    // Snapshort method : For Collection

    public onReadCourseCollectionBySnapShortMethod(): void {
        this.db.collection("courses")
            .snapshotChanges()
            .subscribe(snaps => {

                snaps.forEach(snap => {
                    console.log("id", snap.payload.doc.id);
                    console.log("data", snap.payload.doc.data());
                })

            })
    }


    //////////////////// valueChanges Method ///////////////////////

    // Long lived observables. then always received emited values once initiated.
    // They only gets stops observing the values,when we unsubscribe or stop the application.
    // Uses: When we need on the data not the id (not a complete snapshort).

    // valueChanges method : For Document
    // Here, since we know the document id, hence, it gives the entire document its self. 
    public onReadDocByValueChangesMethod(): void {
        this.db.doc("/courses/9AmtHQZkYxOxx9lAzFHW")
            .valueChanges()
            .subscribe(Course => {
                console.log("Course", Course);
            })
    }



}
















