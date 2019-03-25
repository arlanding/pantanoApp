import { Component, OnInit, ViewChild } from '@angular/core';
import { CentralService } from '../core/services/central.service';
import _ from 'lodash';
import { IonInfiniteScroll } from '@ionic/angular';

export interface CategoriesInterface {
  id: number,
  value: string,
  description: string,
  keywords: string[]
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss']
})

export class QuestionsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


  private originalQuestions = [];
  private currentQuestionsByCategory = {};
  public filters = [];
  public currentQuestions = [];
  public currentFilterToAdd = '';
  public loading: boolean;
  public model: any = {};
  public categoryActive: CategoriesInterface;
  public mobile = false;

  private currentListMin = 0;
  private currentLisMax = 10;

  // TODO: get categories from BE
  public categories: CategoriesInterface[] = [
    { id: 0, value: 'all', description: 'Todas', keywords: [] },
    { id: 1, value: 'dates', description: 'Fechas', keywords: ['año', 'mes', 'dia', 'fecha'] },
    { id: 2, value: 'meassures', description: 'Medidas', keywords: ['metro', 'metros', 'londitud', 'profundidad'] },
    { id: 3, value: 'characters', description: 'Personajes', keywords: ['actor', 'cantante', 'autor', 'rock'] },
    { id: 4, value: 'mundi', description: 'Mundi', keywords: [ 'pais', 'capital', 'barrio', 'continente'] }
  ]

  constructor(public coreService: CentralService) { 
  }

  ngOnInit() {
    this.loading = true;
    // Set all as default category
    this.categoryActive = this.categories[0];
    this.coreService.getQuestions().subscribe(data => {      
      this.originalQuestions = data.questions;
      this.currentQuestionsByCategory = this.originalQuestions.slice(this.currentListMin, this.currentLisMax);
      this.renderData();
    })
  }


  loadData(event) {
    this.currentListMin = this.currentLisMax;
    this.currentLisMax = this.currentListMin + 10;
    const questionToAdd = this.originalQuestions.slice(this.currentListMin, this.currentLisMax);
    _.each(questionToAdd, newQt => {
      this.currentQuestions.push(newQt);
    });
    event.target.complete();
  }

  renderData() {
    this.loading = true;
    const filteredQuestions = this.filter();
    this.currentQuestions = [];
    _.each(filteredQuestions, question => this.currentQuestions.push(question))
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  addFilter() {
    this.loading = true;
    if(this.checkIfSearchIsId(this.currentFilterToAdd)){
      this.resetCategoryFilter();
      this.clearFilters();
    }else{
      this.filters = _.filter(this.filters, filter => {
        return !this.checkIfSearchIsId(filter);
      })
    }
    this.filters.push(this.currentFilterToAdd);
    this.currentFilterToAdd = '';
    this.model.newFilter = '';
    this.renderData();
  }

  submitForm() {
    this.currentFilterToAdd = this.model.newFilter;
    this.addFilter();
  }

  removeFilter(filter) {
    this.loading = true;
    var index = this.filters.indexOf(filter);
    if (index !== -1) {
      this.filters.splice(index, 1);
    }
    this.renderData();
  }

  categoryFilter(category) {
    this.categoryActive = category;
    if (category.value === 'all') {
      this.currentQuestionsByCategory = this.originalQuestions;
    }else{
      this.currentQuestionsByCategory = this.filterByCategory(category);
    }
    this.clearFilters();
    this.renderData();
  }

  resetCategoryFilter(){
    this.loading = true;
    this.currentQuestionsByCategory = this.originalQuestions;
    this.categoryActive = this.categories[0];
  }

  clearFilters() {
    this.loading = true;
    this.filters = [];
    this.renderData();
  }

  formatSearch(search): string{
    return search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  private filter() {
    return _.filter(this.currentQuestionsByCategory, row => {
        return _.every(this.filters, filter => {
          if(this.checkIfSearchIsId(filter)){
            return +row.number === +filter;
          }else{
            const search = this.formatSearch(filter);
            return new RegExp("\\b" + search + "\\b").test(row.quest_for_search);
          }
        });
    });
  }

  private checkIfSearchIsId(value): boolean{
    var reg = /^\d+$/;
    return reg.test(value);
  }

  private filterByCategory(category){
    return _.filter(this.originalQuestions, (question) => {
      return question.category.indexOf(category.value) > -1;
    })
  }


}
