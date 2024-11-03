import { Component, Inject, ChangeDetectionStrategy, model } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

interface IIcon {
  iconId: string;
  iconName: string;
}

@Component({
  selector: 'icon-selection',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent,
    MatIconModule, 
    MatTooltipModule
  ],
  templateUrl: './icon-selection.component.html',
  styleUrl: './icon-selection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSelectionComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right']; // Tooltip position options
  position = new FormControl(this.positionOptions[0]); // Default tooltip position

  icons: IIcon[] = [ // List of icons
    {iconId: '', iconName: 'No Icon'},
    {iconId: 'shopping_cart', iconName: 'Shopping Cart'},
    {iconId: 'credit_card', iconName: 'Credit Card'},
    {iconId: 'directions_car', iconName: 'Car'},
    {iconId: 'directions_bike', iconName: 'Bike'},
    {iconId: 'directions_bus', iconName: 'Bus'},
    {iconId: 'location_on', iconName: 'Location On'},
  ]

  selection: string = '' // Variable to store the selected icon

  constructor(public dialogRef: MatDialogRef<IconSelectionComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}

  // Method to choose an icon
  chooseIcon(icon: string): void {
    this.selection = icon
  }

  // Method to handle cancel click
  onCancelClick(): void {
    this.dialogRef.close();
  }

  // Method to handle select click
  onSelectClick(): void {
    this.dialogRef.close(this.selection);
  }
}
