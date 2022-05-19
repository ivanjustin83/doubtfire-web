import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { taskService, groupService, gradeService } from 'src/app/ajs-upgraded-providers';

@Component({
  selector: 'project-tasks-list',
  templateUrl: './project-tasks-list.component.html',
  styleUrls: ['./project-tasks-list.component.scss'],
})
export class ProjectTasksListComponent implements OnInit {
  @Input() unit: any;
  @Input() project: any;

  @Output() private onSelect = new EventEmitter<any>();

  public taskDefinition: any;
  constructor(
    @Inject(taskService) public ts: any,
    @Inject(groupService) private grounds: any,
    @Inject(gradeService) private grades: any
  ) {}

  ngOnInit() {
    this.taskDefinition = this.ts.taskDefinitionFn(this.unit);
  }

  get statusText(): string {
   return this.ts.statusText;
  }

  get hideGroupSetName(): boolean {
    return this.unit.group_sets.length === 0;
  }

  public groupSetName(id): string {
    return this.grounds.groupSetName(id, this.unit);
  }

  public statusClass(status) {
    return this.ts.statusClass(status);
  }

  public onClickItem(data) {
    this.onSelect.emit(data);
  }

  public taskText(task) {
    let result = task.definition.abbreviation;
    if (task.definition.is_graded) {
      if (task.grade != null) {
        result += " (" + this.grades.gradeAcronyms[task.grade] + ")";
      } else {
        result += " (?)";
      }
    }
    if (task.definition.max_quality_pts > 0) {
      if (task.quality_pts != null) {
        result += " (" + task.quality_pts + "/" + task.definition.max_quality_pts + ")";
      } else {
        result += " (?/" + task.definition.max_quality_pts + ")";
      }
    }
    return result;
  };

}
