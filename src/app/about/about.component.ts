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
    // provide second argument to the collection

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



}
















