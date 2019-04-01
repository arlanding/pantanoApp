import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { GameConfig } from 'src/app/shared/interfaces/game-config';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  // TODO: create question interface and add it to GameConfig interface
  getGame(numberOfQuestionsRequired) {
    const mockupTenQuestions = [{ "number": "1", "quest": "En el lenguaje de chat, ¿cuál de estas opciones suele significar “reírse a carcajadas”?", "quest_for_search": "en el lenguaje de chat, cual de estas opciones suele significar “reirse a carcajadas”", "ans": "lol", "category": [] }, { "number": "2", "quest": "¿Qué presidente argentino dijo la frase “gobernar es fácil, lo difícil es conducir”?", "quest_for_search": "que presidente argentino dijo la frase “gobernar es facil, lo dificil es conducir”", "ans": "juan domingo perón", "category": [] }, { "number": "3", "quest": "¿Cuál es el nombre de pila del ex técnico de la selección argentina “el loco” bielsa?", "quest_for_search": "cual es el nombre de pila del ex tecnico de la seleccion argentina “el loco” bielsa", "ans": "marcelo", "category": [] }, { "number": "4", "quest": "¿A qué prócer argentino pertenece la frase “serás lo que debas ser o no serás nada”?", "quest_for_search": "a que procer argentino pertenece la frase “seras lo que debas ser o no seras nada”", "ans": "san martín", "category": [] }, { "number": "5", "quest": "¿Con qué color se asocia popularmente al periodismo sensacionalista?", "quest_for_search": "con que color se asocia popularmente al periodismo sensacionalista", "ans": "amarillo", "category": [] }, { "number": "6", "quest": "En el lenguaje de las redes sociales, ¿cuántos seguidores son “1k”?", "quest_for_search": "en el lenguaje de las redes sociales, cuantos seguidores son “1k”", "ans": "1.000", "category": [] }, { "number": "7", "quest": "¿Cuál era el nombre de pila de karadagián, el recordado luchador profesional de titanes en el ring?", "quest_for_search": "cual era el nombre de pila de karadagian, el recordado luchador profesional de titanes en el ring", "ans": "martín", "category": [] }, { "number": "8", "quest": "¿Cómo comienza la canción patria conocida como “aurora”?", "quest_for_search": "como comienza la cancion patria conocida como “aurora”", "ans": "alta en el cielo", "category": [] }, { "number": "9", "quest": "¿Cuál es el nombre del director y dramaturgo muscari?", "quest_for_search": "cual es el nombre del director y dramaturgo muscari", "ans": "josé maría", "category": [] }, { "number": "10", "quest": "En la popular canción de maría elena walsh, ¿de qué material es la tetera?", "quest_for_search": "en la popular cancion de maria elena walsh, de que material es la tetera", "ans": "porcelana", "category": [] }];
    const mockupTwoQuestions = [{ "number": "1", "quest": "En el lenguaje de chat, ¿cuál de estas opciones suele significar “reírse a carcajadas”?", "quest_for_search": "en el lenguaje de chat, cual de estas opciones suele significar “reirse a carcajadas”", "ans": "lol", "category": [] }, { "number": "1", "quest": "En el lenguaje de chat, ¿cuál de estas opciones suele significar “reírse a carcajadas”?", "quest_for_search": "en el lenguaje de chat, cual de estas opciones suele significar “reirse a carcajadas”", "ans": "lol", "category": [] }];
    return of(mockupTenQuestions);
  }

  postUserMatchData(matchData: GameConfig){
    // TODO: complete this functionality
  }
}
