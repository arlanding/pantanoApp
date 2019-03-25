import { Component, OnInit, ViewChild } from '@angular/core';
import { CentralService } from '../core/services/central.service';
import _ from 'lodash';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';

export interface CategoriesInterface {
  id: number,
  value: string,
  description: string,
  keywords: string[],
  icon: string
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss']
})

export class QuestionsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;

  private originalQuestions = [];
  private currentQuestionsByCategory = {};
  public filters = [];
  public currentQuestions = [];
  public questionsInScroller = []
  public currentFilterToAdd = '';
  public loading: boolean;
  public model: any = {};
  public categoryActive: CategoriesInterface;
  public mobile = false;

  private currentListMin;
  private currentLisMax;

  // TODO: get categories from BE
  public categories: CategoriesInterface[] = [
    { id: 0, value: 'all', description: 'Todas', keywords: [], icon: 'apps' },
    { id: 1, value: 'dates', description: 'Fechas', keywords: ['año', 'mes', 'dia', 'fecha'], icon: 'calendar' },
    { id: 2, value: 'meassures', description: 'Medidas', keywords: ['metro', 'metros', 'londitud', 'profundidad'], icon: 'options' },
    { id: 3, value: 'characters', description: 'Personajes', keywords: ['actor', 'cantante', 'autor', 'rock'], icon: 'people' },
    { id: 4, value: 'mundi', description: 'Mundi', keywords: ['pais', 'capital', 'barrio', 'continente'], icon: 'globe' }
  ]

  constructor(public coreService: CentralService) {
  }

  ngOnInit() {
    this.loading = true;
    // Set all as default category
    this.categoryActive = this.categories[0];
    this.coreService.getQuestions().subscribe(data => {
      this.originalQuestions = data.questions;
      this.categoryActive = this.categories[0];
      this.currentQuestionsByCategory = this.originalQuestions;
      this.renderData();
    })
  }


  loadData(event?) {
    this.currentListMin = this.currentLisMax;
    this.currentLisMax = this.currentListMin + 10;
    const questionToAdd = this.currentQuestions.slice(this.currentListMin, this.currentLisMax);
    _.each(questionToAdd, newQt => {
      this.questionsInScroller.push(newQt);
    });
    if (event) {
      event.target.complete();
    }
  }

  renderData() {
    this.content.scrollToTop();
    this.loading = true;
    this.resetListNumbers();
    const filteredQuestions = this.filter();
    this.currentQuestions = [];
    _.each(filteredQuestions, question => this.currentQuestions.push(question))
    this.loadData();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  private resetListNumbers() {
    this.questionsInScroller = [];
    this.currentListMin;
    this.currentLisMax = 0;
  }

  addFilter() {
    this.filters = [];
    this.filters.push(this.currentFilterToAdd);
    this.renderData();
  }

  submitForm() {
    if (this.model.newFilter === '') { return this.clearFilters(); }
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
    this.loading = true;
    this.categoryActive = category;
    if (category.value === 'all') {
      this.currentQuestionsByCategory = this.originalQuestions;
    } else {
      this.currentQuestionsByCategory = this.filterByCategory(category);
    }
    this.clearFilters();
    this.renderData();
  }

  resetCategoryFilter() {
    this.loading = true;
    this.currentQuestionsByCategory = this.originalQuestions;
    this.categoryActive = this.categories[0];
  }

  clearFilters() {
    this.loading = true;
    this.currentFilterToAdd = '';
    this.model.newFilter = '';
    this.filters = [];
    this.renderData();
  }

  formatSearch(search): string {
    return search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  private filter() {
    return _.filter(this.currentQuestionsByCategory, row => {
      return _.every(this.filters, filter => {
        if (this.checkIfSearchIsId(filter)) {
          return +row.number === +filter;
        } else {
          const search = this.formatSearch(filter);
          return new RegExp("\\b" + search + "\\b").test(row.quest_for_search);
        }
      });
    });
  }

  private checkIfSearchIsId(value): boolean {
    var reg = /^\d+$/;
    return reg.test(value);
  }

  private filterByCategory(category) {
    return _.filter(this.originalQuestions, (question) => {
      return question.category.indexOf(category.value) > -1;
    })
  }


}
