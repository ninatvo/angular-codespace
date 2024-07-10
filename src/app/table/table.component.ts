import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  users: any[] = [
    { id: 1, name: 'John Doe', email: 'doe.john@example.com' },
    { id: 2, name: 'Daniel Smith', email: 'smith.daniel@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'johnson.mike@example.com' }
  ];

  searchTerm: string = '';
  sortedColumn: string = '';
  isAscending: boolean = true;

  ngOnInit() {
    this.sort('id'); // Default sorting by ID
  }

  sort(column: string) {
    if (column === this.sortedColumn) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedColumn = column;
      this.isAscending = true;
    }

    this.users.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return this.isAscending ? aValue - bValue : bValue - aValue;
      }
    });

    get filteredUsers(): User[] {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
