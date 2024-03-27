import { Component, OnInit } from '@angular/core';
import { CD } from '../models/cd.model';
import { CdsService } from '../services/cds.service';

@Component({
  selector: 'app-list-cd',
  templateUrl: './list-cd.component.html',
  styleUrl: './list-cd.component.scss'
})
export class ListCDComponent implements OnInit {
  listcd! : CD[];

  constructor (private cdsService: CdsService) { }

  ngOnInit(): void {
    this.cdsService.getAllCDs().subscribe((cds) => { this.listcd = cds; });
  }
}
