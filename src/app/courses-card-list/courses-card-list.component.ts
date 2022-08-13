import { CoursesService } from './../services/courses.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    @Output()
    courseEdited = new EventEmitter();

    @Output()
    courseDeleted = new EventEmitter<Course>();

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private coursesService: CoursesService
    ) {
    }

    ngOnInit() {

    }

    public editCourse(course: Course): void {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = "400px";

        dialogConfig.data = course;

        this.dialog.open(EditCourseDialogComponent, dialogConfig)
            .afterClosed()
            .subscribe(val => {
                if (val) {
                    this.courseEdited.emit();
                }
            });

    }

    public onDeleteCourse(course: Course): void {
        this.coursesService.deleteCourseAndLessons(course.id)
            .pipe(
                tap(() => {
                    console.log("Deleted Course", course);
                    this.courseDeleted.emit(course);
                }),
                catchError(err => {
                    console.log("error", err);
                    alert("Could not delete course");
                    return throwError(err);
                })
            )
            .subscribe()
    }

    // Note: Deleting is doc in collection delete that documents but does not delete any nested collection. 
    // Sometimes, it is necessay to delete nested collection along with document. In this case, deleting a course should also delete its nested lession collects. but it is not happening.
    // Atomic transactions / Batch writes: In order to remove a document along with its collection, atomic trasactions are required.

}









