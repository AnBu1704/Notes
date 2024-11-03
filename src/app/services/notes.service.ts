import { Injectable } from '@angular/core';

export interface INote {
  id: number;  
  name: string;
  text: string;
  icon: string;
  updated: Date;
  backgroundCol: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: INote[] = [ // Initial array of notes
    {
      id: 3,      
      name: 'Photos',
      text: 'Photos from the holidays',
      icon: 'image',
      updated: new Date('1/1/16'),
      backgroundCol: 'white'
    },
    {
      id: 2,      
      name: 'Recipes',
      text: '-Pizza \n1. Dough\n2. Tomato sauce\n3. Cheese',
      icon: 'restaurant',
      updated: new Date('1/17/16'),
      backgroundCol: 'white'
    },
    {
      id: 1,      
      name: 'Work',
      text: 'Work work work!!!',
      icon: 'badge',
      updated: new Date('1/28/16'),
      backgroundCol: 'white'
    },
  ];

  selectedNote: INote = { // Placeholder for the selected note
    id: -1,
    name: '',
    text: '',
    icon: '',
    updated: new Date(),
    backgroundCol: ''
  }

  constructor() { }

  // Method to get all notes
  getNotes(): INote[] {
    return this.notes
  }

  // Method to select a note by ID
  selectNote(id: number) {
    this.notes.forEach(element => {
      if (element.id == id) {
        this.selectedNote = element
      }
    });
  }
}
