import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CD } from '../models/cd.model';
import { CdsService } from '../services/cds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-cd',
  templateUrl: './new-cd.component.html',
  styleUrl: './new-cd.component.scss'
})
export class NewCDComponent implements OnInit {
  formulaire!: FormGroup;
  currentCD!: CD;
  thumbRegex: RegExp = new RegExp('https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)$');
  champsForm: [string, string, string][] = [
    ["title", "text", "Titre"],
    ["author", "text", "Auteur"],
    ["thumbnail", "text", "Miniature"],
    ["dateDeSortie", "date", "Date de sortie"],
    ["quantite", "number", "Quantité"],
    ["price", "number", "Prix (€)"],
  ];

  constructor(
    private formBuilder: FormBuilder,
    private cdService: CdsService,
    private router: Router) 
  { }

  ngOnInit(): void {
    this.formulaire = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(6)]],
      author: [null, [Validators.required, Validators.minLength(6)]],
      thumbnail: [null, [Validators.required, Validators.pattern(this.thumbRegex)]],
      dateDeSortie: [null, [Validators.required, Validators.min(0)]],
      quantite: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
    },
    {
      updateOn: 'blur'
    });

    this.formulaire.valueChanges.subscribe((formValue) => {
      this.currentCD = {
        id: 0,
        title: formValue.title,
        author: formValue.author,
        thumbnail: formValue.thumbnail,
        dateDeSortie: formValue.dateDeSortie,
        quantite: formValue.quantite,
        price: formValue.price,
        onsale: false
      };
    });
  }

  submit(): void {
    // Création de l'objet CD venant du formulaire.
    let cd: CD = {
      id: 0,
      title: this.formulaire.get('title')?.value,
      author: this.formulaire.get('author')?.value,
      thumbnail: this.formulaire.get('thumbnail')?.value,
      dateDeSortie: this.formulaire.get('dateDeSortie')?.value,
      quantite: this.formulaire.get('quantite')?.value,
      price: this.formulaire.get('price')?.value,
      onsale: false
    };

    // Envoi du CD à l'API.
    this.cdService.addCD(cd).subscribe({
      next: (cd) => {
        this.router.navigateByUrl("/catalog");
      },
      error: (err) => {
        console.error("Erreur lors de l'envoi du CD: ", err);
        alert("Une erreur est survenue lors de l'envoi du CD.");
      }
    });
  }

}
