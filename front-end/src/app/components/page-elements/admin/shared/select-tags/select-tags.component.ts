import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TagService } from '../../../../../services/tag.service';
import { orderBy } from 'lodash';
import { MessageService, FilterService, PrimeNGConfig } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ITag } from '../../../../../interfaces/tag.interface';

@Component({
  selector: 'wbp-select-tags',
  standalone: true,
  imports: [CommonModule, BadgeModule],
  templateUrl: './select-tags.component.html',
  styleUrl: './select-tags.component.scss',
})
export class SelectTagsComponent {
  @Input() selectedTags: string[] = []; // tagids
  @Input() editMode: boolean = false;

  @Output() selectedTagIds: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  getTags$!: Observable<ITag[]>;
  endsubs$: Subject<any> = new Subject();

  tagsLookup: { [key: string]: ITag } = {};
  tagsLookupById: { [key: string]: ITag } = {};

  filteredTags: string[] = [];

  sortTagsBy: string = 'count';

  badgeValue: any = {};
  badgeSeverity: any = {};

  @ViewChild('tagInput', { static: false })
  tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('newTag', { static: false }) newTag!: ElementRef<HTMLInputElement>;

  private tagService = inject(TagService);
  private messageService = inject(MessageService);
  private filterService = inject(FilterService);

  constructor(private primengConfig: PrimeNGConfig) {
    this.getTags$ = this._getTags();

    this.getTags$.subscribe((tags: Array<ITag>) => {
      //console.log('*** tags:', tags);
      // Set the tags
      this._refreshTagVars(tags);
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }

  private _getTags() {
    return this.tagService.getAllTags().pipe(takeUntil(this.endsubs$));
  }

  private _refreshTagVars(tags: Array<ITag>): void {
    this.filteredTags = [];
    tags.forEach((tag: ITag) => {
      this.tagsLookup[tag.tag] = tag;
      this.tagsLookupById[tag._id] = tag;
      this.filteredTags.push(tag._id);
    });

    // Set the badge settings
    this._setBadgeSettings();

    this._sortTags();
  }

  tagSortMethod(sortBy: string) {
    this.sortTagsBy = sortBy;
    this._sortTags();
  }

  private _sortTags(): void {
    let selectedTags: ITag[] = [];
    this.selectedTags.forEach((id: string) => {
      selectedTags.push(this.tagsLookupById[id]);
    });
    this.selectedTags = [];

    let filteredTags: ITag[] = [];
    this.filteredTags.forEach((id: string) => {
      filteredTags.push(this.tagsLookupById[id]);
    });
    this.filteredTags = [];
    if (this.sortTagsBy === 'tag') {
      selectedTags = orderBy(selectedTags, ['tag'], ['asc']);
      filteredTags = orderBy(filteredTags, ['tag'], ['asc']);
    } else {
      selectedTags = orderBy(selectedTags, ['count', 'tag'], ['desc', 'asc']);
      filteredTags = orderBy(filteredTags, ['count', 'tag'], ['desc', 'asc']);
    }

    selectedTags.forEach((tag: ITag) => {
      this.selectedTags.push(tag._id);
    });
    filteredTags.forEach((tag: ITag) => {
      this.filteredTags.push(tag._id);
    });
  }

  private _setBadgeSettings() {
    for (let tag in this.tagsLookup) {
      if (
        this.tagsLookup[tag] !== undefined &&
        (this.tagsLookup[tag]['count'] !== undefined || null)
      ) {
        const tagCount = this.tagsLookup[tag]['count'] || 0;
        this.badgeValue[tag] = this.tagsLookup[tag].count;
        if (tagCount > 30) {
          this.badgeSeverity[tag] = 'danger';
        } else if (tagCount > 20) {
          this.badgeSeverity[tag] = 'warning';
        } else if (tagCount > 10) {
          this.badgeSeverity[tag] = 'info';
        } else {
          this.badgeSeverity[tag] = 'success';
        }
      }
    }
  }

  selectTag(selectedTagId: string) {
    // Remove Selected Tag from the filteredTags
    this.filteredTags = this.filteredTags.filter(
      (tagId: string) => tagId !== selectedTagId
    );

    // Increment the count of the selected tag
    this.tagsLookupById[selectedTagId].count += 1;

    // Add Selected Tag to the selectedTags
    this.selectedTags.push(selectedTagId);

    this._setBadgeSettings();

    this._sortTags();

    // Emit Selected Tag
    this.selectedTagIds.emit(this.selectedTags);
  }

  deSelectTag(deSelectedTagId: string) {
    const currentlySelectedTags = [...this.selectedTags];

    // Remove Selected Tag from the selectedTags
    // filter out the selected tag
    this.selectedTags = currentlySelectedTags.filter(
      (tagId: string) => tagId !== deSelectedTagId
    );

    this._setBadgeSettings();

    // Add DeSelected Tag back into the filteredTags
    this.filteredTags.push(deSelectedTagId);

    // Order the filtered and selected tags
    this._sortTags();

    // Emit DeSelected Tag
    this.selectedTagIds.emit(this.selectedTags);
  }

  addNewTag(event: any) {
    const { value } = event;
    this.tagService.addTag(value).subscribe((tag: any) => {
      if (tag.status !== null && tag.status !== '200') {
        this.messageService.add({
          severity: 'error',
          summary: 'Tag Exists',
          detail: `Tag ${value} exists already!`,
        });
      } else {
        const resultTag: ITag = {
          tag: value,
          _id: tag._id,
          id: tag.id,
          count: tag.count,
          createdAt: tag.createdAt,
          updatedAt: tag.updatedAt,
        };

        this.tagsLookup[value] = resultTag;

        this.selectTag(value);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Tag added successfully!',
        });
      }

      // Clear new tag field
      this.newTag.nativeElement.value = '';
    });
  }

  ngOnDestroy() {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }
}
