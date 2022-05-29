import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RickMorty,
  Character,
  Episode,
} from 'src/app/models/rickandmorty.interface';
import { CharactersService } from 'src/app/services/characters.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  character: any = {};
  episodes: any = [];
  episodesids: any = [];
  episodesList: any = [];
  panelOpenState = false;
  displayedColumns: string[] = ['episode', 'name', 'air_date' ];

  dataSource!: MatTableDataSource<Episode>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.episodesList = new Array<Episode>();
  }

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Identifier --> ', identifier);

    if (identifier) {
      this.charactersService
        .getCharacterById(identifier)
        .subscribe((character: Character) => {
          if (!character) {
            return this.router.navigateByUrl('/');
          }

          this.character = character;
          this.episodes = character.episode;

          this.episodesids = this.episodes.map((x: string) => {
            const y = x.match(/\d+/);
            let z;
            if (y) {
              console.log(y[0]);
              z = +y[0];
            }
            return z;
          });

          //   this.episodes = character.episode.map((x) => {
          //     console.log( x.match(/\d+/));
          //     return x.match(/\d+/);
          //   });

          //.match(/\d+/)[0])
          //console.log('Character --> ', character);
          //console.log('Episodes --> ', this.episodesids);
          // this.episodesids.push('0');
          // console.log('EpisodesStr --> ',this.episodesids.toString());
          // console.log('EpisodId --> ', this.episodes[0].match(/\d+/)[0]);
          this.charactersService
            .getEpisodes('[' + this.episodesids.toString() + ']')
            .subscribe((episodes) => {
              this.episodesList = episodes;

              this.dataSource = new MatTableDataSource<Episode>(
                this.episodesList
              );
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });

          return '';
        });
    }
  }
}
