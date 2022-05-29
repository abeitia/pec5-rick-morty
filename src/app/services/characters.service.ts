import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RickMorty, Character, Episode} from '../models/rickandmorty.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }


  getAllCharacters(): Observable<RickMorty[]> {
    return this.http.get<RickMorty[]>('https://rickandmortyapi.com/api/character');
  }

 getCharacterById(id: string): Observable<Character> {
    return this.http.get<Character>('https://rickandmortyapi.com/api/character/' + id );
  }

 getEpisodes(ids: string): Observable<Episode[]> {
    return this.http.get<Episode[]>('https://rickandmortyapi.com/api/episode/' + ids );
  }


}
