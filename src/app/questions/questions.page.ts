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
  private currentQuestions = [];
  private currentListMin: number;
  private currentLisMax: number;
  public filters: string[] = [];
  public questionsInScroller = []
  public loading: boolean;
  public model: any = {};
  public categoryActive: CategoriesInterface;

  // TODO: get categories from BE
  public categories: CategoriesInterface[] = [
    { id: 0, value: 'all', description: 'Todas', keywords: [], icon: 'apps' },
    { id: 1, value: 'dates', description: 'Fechas', keywords: ['año', 'mes', 'dia', 'fecha'], icon: 'calendar' },
    { id: 2, value: 'meassures', description: 'Medidas', keywords: ['metro', 'metros', 'londitud', 'profundidad'], icon: 'options' },
    { id: 3, value: 'characters', description: 'Personajes', keywords: ['actor', 'cantante', 'autor', 'rock'], icon: 'people' },
    { id: 4, value: 'mundi', description: 'Mundi', keywords: ['pais', 'capital', 'barrio', 'continente'], icon: 'globe' }
  ]

  constructor(public coreService: CentralService) {}

  ngOnInit() {
    // Set all as default category
    this.categoryActive = this.categories[0];
    this.coreService.getQuestions().subscribe(data => {
      this.originalQuestions = data.questions;
      this.categoryActive = this.categories[0];
      this.currentQuestionsByCategory = this.originalQuestions;
      this.renderData();
    })
  }

  // Public function used by virtualScroll && this.renderData()
  loadData(event?) {
    this.currentListMin = this.currentLisMax;
    this.currentLisMax = this.currentListMin + 10;
    const questionToAdd = this.currentQuestions.slice(this.currentListMin, this.currentLisMax);
    _.each(questionToAdd, newQt => {
      this.questionsInScroller.push(newQt);
    });
    if (event) {
      event.target.complete();
    } else {
      setTimeout(() => {
        this.hideLoader();
      }, 1000);
    }
  }

  // Public function used by searchbox
  public submitForm() {
    // If send an empty filter and we have applied ones, clear filters and render
    if (this.model.newFilter === '' && this.filters.length > 0) {
      this.clearFilters();
      this.renderData();
    } else if(this.model.newFilter !== '') {
      // Else: if we receive a new filter, add it and render
      this.addFilter(this.model.newFilter);
      this.renderData();
    }
  }

  // Public function used by tabs when filter by category
  public categoryFilter(category) {
    // Set new category active
    this.categoryActive = category;
    // Get questions filtered by new category
    this.currentQuestionsByCategory = this.filterByCategory(category);
    // Clear filters applied by user by searchbox
    this.clearFilters();
    // Render data in template
    this.renderData();
  }

  // Prepare data to print in templae
  private renderData() {
    // Show loader
    this.toggleLoader();
    this.content.scrollToTop();
    this.resetVirtualScroll();
    // Get the questions filtered by applied 
    const filteredQuestions = this.filter();
    this.currentQuestions = [];
    _.each(filteredQuestions, question => this.currentQuestions.push(question))
    this.loadData();
  }

  private clearFilters() {
    // Reset the string in the template input binded whit this.model.newFilter
    this.model.newFilter = '';
    // Remove applied filters
    this.filters = [];
  }

  private filter() {
    return _.filter(this.currentQuestionsByCategory, row => {
      return _.every(this.filters, filter => {
        if (this.checkIfSearchIsId(filter)) {
          return +row.number === +filter;
        } else {
          const search = this.formatSearch(filter);
          return new RegExp("\\b" + search + "\\b").test(row.question_for_search);
        }
      });
    });
  }

  private checkIfSearchIsId(value): boolean {
    var reg = /^\d+$/;
    return reg.test(value);
  }

  private filterByCategory(category): CategoriesInterface[] {
    let questionsFilteredByCategory;
    // If category is 'all' return all the original questions
    if (category.value === 'all') {
      questionsFilteredByCategory = this.originalQuestions;
    } else {
      // Every question has a category property, so filter them getting only the ones that has the received category by parameter
      questionsFilteredByCategory = _.filter(this.originalQuestions, (question) => {
        return question.categories.indexOf(category.value) > -1;
      })
    }
    return questionsFilteredByCategory;
  }

  private formatSearch(search): string {
    // Reduce an eliminate special characters unifying searchs
    return search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  private resetVirtualScroll() {
    // Reset current question in scroller showing only ten, setting the fi
    this.questionsInScroller = [];
    this.currentListMin;
    this.currentLisMax = 0;
  }

  private toggleLoader() {
    this.loading = !this.loading;
  }
  
  private hideLoader() {
    this.loading = false;
  }

  private addFilter(currentFilterToAdd) {
    // Reset current filters
    this.filters = [];
    // Add new one
    this.filters.push(currentFilterToAdd);
  }

}
