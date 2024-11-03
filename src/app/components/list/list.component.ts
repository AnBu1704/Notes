import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotesService, INote } from '../../services/notes.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'list',
  standalone: true,
  imports: [
    NgStyle,
    MatListModule, 
    MatIconModule, 
    MatDividerModule, 
    DatePipe,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  @Output() selectIdEvent = new EventEmitter<number>() // Output event emitter to pass selected ID

  notes: INote[] = [] // Array to store the notes

  constructor(private notesService: NotesService) {} // Inject the NotesService

  ngOnInit(): void {
    this.notes = this.notesService.getNotes() // Get notes on component initialization
  }
  // Method to add a new note
  addNote() {
    let maxId: number = 0

    this.notes.forEach(element => {
      if (element.id > maxId) {
        maxId = element.id
      }
    });

    this.notesService.notes.push({
      id: maxId + 1,
      name: '',
      text: '',
      icon: '',
      updated: new Date(Date.now()),
      backgroundCol: 'white'
    })

    this.notes = this.notesService.getNotes()
    this.notesService.notes.sort((a, b) => b.updated.getTime() - a.updated.getTime())
  }

  // Method to select a note by ID and update its background color
  selectNote(id: number) {
    this.notes.forEach(note => {
      if (note.id == id) {
        note.backgroundCol = 'rgba(0, 0, 0, 0.1)'
      } else {
        note.backgroundCol = 'white'
      }
    });

    this.selectIdEvent.emit(id)
  }

  
}
