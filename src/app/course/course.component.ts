import { Lesson } from './../model/lesson';
import { CoursesService } from './../services/courses.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public course: Course;
  public lessons: Lesson[];

  public loading: boolean = false;
  public lastPageLoaded: number = 0;

  public displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {

  }

  ngOnInit() {
    this.course = this.route.snapshot.data["course"];
    console.log("course", this.course);

    this.loading = true;
    this.coursesService.findLessons(this.course.id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(lessons => {
        this.lessons = lessons;
      })

  }

  public loadMore(): void {
    this.lastPageLoaded++;
    this.loading = true;
    this.coursesService.findLessons(this.course.id, "asc", this.lastPageLoaded)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(lessons => {
        this.lessons = this.lessons.concat(lessons);
      }

      )

  }

}
