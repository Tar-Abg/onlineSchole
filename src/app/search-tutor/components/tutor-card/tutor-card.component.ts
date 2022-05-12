import {Component, Input, OnInit} from '@angular/core';
import {SearchResultForTutor} from "../../models/search.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tutor-card',
  templateUrl: './tutor-card.component.html',
  styleUrls: ['./tutor-card.component.scss']
})
export class TutorCardComponent implements OnInit {
  @Input() isStudentPage = false;
  @Input() set tutor(value: SearchResultForTutor) {
    this._tutor = value;
    this.originalContent = this._tutor.profileHeadline;
    this._tutor.profileHeadline = this.formatContent(this._tutor.profileHeadline);
  };
  @Input() completeWords: boolean;
  isContentToggled: boolean;
  originalContent: string;
  _tutor: SearchResultForTutor;
  limit = 160;

  get tutor(): SearchResultForTutor {
    return this._tutor;
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleContent() {
    this._tutor.profileHeadline = this.formatContent(this._tutor.profileHeadline);
  }

  formatContent(content: string) {
    if (!this.isContentToggled) {
      if (content?.length > this.limit) {
        this.isContentToggled = true;
        return `${content.substr(0, this.limit)}...`;
      } else  {
        return content;
      }
    } else {
      this.isContentToggled = false;
      return this.originalContent;
    }
  }

  navigate(id: number): void{
    this.router.navigate([`tutorView`, id]);
  }

}
