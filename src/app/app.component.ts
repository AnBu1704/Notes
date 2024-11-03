import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { NotesService, INote } from './services/notes.service';
import { FormsModule } from '@angular/forms';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      FormsModule,
      ListComponent,
      EditNoteComponent
    ]
})
export class AppComponent {  
  selectedNote: INote = { // Initialize the selected note
    id: 0,      
    name: '',
    text: '',
    icon: '',
    updated: new Date(1, 1, 1900),
    backgroundCol: ''
  }

  changedIcon: string = '' // Variable to store the changed icon

  constructor(private notesService: NotesService) {} // Inject the NotesService
  
  // Method to receive the selected note ID from an event
  receiveSelectedId($event: number) {
    this.notesService.notes.forEach(element => {
      if (element.id == $event) {
        this.selectedNote = element
      }
    });
  }

  // Method to handle icon change event
  iconChange($event: string) {
    this.selectedNote = {
      id: this.selectedNote.id,
      name: this.selectedNote.name,
      text: this.selectedNote.text,
      icon: $event,
      updated: this.selectedNote.updated,
      backgroundCol: this.selectedNote.backgroundCol,
    }
  }
}