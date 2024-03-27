import { Component, Input, OnInit } from '@angular/core';
import { CD } from '../models/cd.model';
import { CdsService } from '../services/cds.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrl: './cd.component.scss'
})
export class CdComponent implements OnInit {
  @Input() Cd!: CD;
  leCd!: CD;
  idCd!: string;
  
  constructor(private cdService: CdsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idCd = this.route.snapshot.params['id'];
    if (this.idCd !== undefined) {
      this.cdService.getCDById(+this.idCd).subscribe(cd => { this.leCd = cd; });
    } else {
      this.leCd = this.Cd;
    }
  }

  onAddCD() {
    this.leCd.quantite++;
  }
}
