import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { CardListService } from '../../card-list/card-list.service';
import { CardBase } from '../../card-base/card-base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CardComments } from '../../card-comments/card-comments';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-card-details-content',
  templateUrl: './card-details-content.component.html',
  styleUrls: ['./card-details-content.component.css']
})
export class CardDetailsContentComponent implements OnInit {

  cardId: number
  card: CardBase[] = []
  formComment: FormGroup
  commentsObservable: Observable<CardComments[]>
  
  constructor(
    private _activateRouter: ActivatedRoute,
    private _cardListService: CardListService,
    private _localtion: Location,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() { 
    
   this.cardId = this._activateRouter.snapshot.params.cardId

   this._cardListService
    .findCardById(this.cardId)
    .subscribe( res => this.card = res)

    this.formComment = this._formBuilder.group({
      comments: [
        '',
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ]
    })

    this.commentsObservable = this._cardListService.getComments(this.cardId)
  }

  backToPage(e: Event) {

    e.preventDefault()
    this._localtion.back()
  }

  sendComment(e: Event) {

    e.preventDefault()
    
    let comment = this.formComment.get('comments').value as string
    
    this.commentsObservable = this._cardListService
      .addComments(this.cardId, comment)
      .pipe(switchMap( () => this._cardListService.getComments(this.cardId) ))
      .pipe(tap( () => {
        
        this.formComment.reset()
        alert('Comentário realizado com sucesso :)')
      }))
  }

}
