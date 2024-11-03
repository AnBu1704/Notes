import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, inject, model, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { INote, NotesService } from '../../services/notes.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconSelectionComponent } from '../icon-selection/icon-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'edit-note',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    IconSelectionComponent,
    NgIf
  ],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditNoteComponent implements OnChanges {
  @Input() selectedNote: any // Input property to get the selected note
  @Output() changeIcon = new EventEmitter<string>() // Output event emitter for icon change
  @Input() changedIcon: any // Input property for changed icon

  formGroup: FormGroup = new FormGroup({
    nameFormControl: new FormControl(''),
    textFormControl: new FormControl('')
  })

  readonly dialog = inject(MatDialog); // Inject MatDialog service

  editedNote: boolean = false // Flag to track if the note has been edited
  
  id: number = -1
  name: string = ''
  text: string = ''
  icon: string = ''

  constructor(private notesService: NotesService) {} // Inject the NotesService

  ngOnChanges(changes: SimpleChanges): void {
    this.id = changes['selectedNote'].currentValue.id
    this.name = changes['selectedNote'].currentValue.name
    this.text = changes['selectedNote'].currentValue.text
    this.icon = changes['selectedNote'].currentValue.icon

    this.editedNote = false // Reset the edited note flag
  }

  onNoteChange(): void {
    this.editedNote = true // Set the edited note flag

    this.name = this.formGroup.controls['nameFormControl'].value
    this.text = this.formGroup.controls['textFormControl'].value
  }

  openIconSelectionDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(IconSelectionComponent, {
      data: { icon: this.selectedNote.icon },
      width: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.editedNote = true // Set the edited note flag
        this.changeIcon.emit(result) // Emit the change icon event
      }
    });
  }

  saveNote(): void {
    if (this.editedNote == true) {
      for (let index = 0; index < this.notesService.notes.length; index++) {
        if (this.notesService.notes[index].id == this.id) {
          this.notesService.notes[index].name = this.name
          this.notesService.notes[index].text = this.text
          this.notesService.notes[index].icon = this.icon
          this.notesService.notes[index].updated = new Date(Date.now())
        }
      }
    }

    this.notesService.notes.sort((a, b) => b.updated.getTime() - a.updated.getTime()) // Sort notes by updated date
    this.editedNote = false // Reset the edited note flag
  }
}