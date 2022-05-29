import { Component, ViewChild, OnInit } from '@angular/core';
import { take } from 'rxjs';
// import { ActivatedRoute, Router } from '@angular/router';
import { RickMorty, Character } from 'src/app/models/rickandmorty.interface';
import { CharactersService } from 'src/app/services/characters.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];

  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<Character>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private charactersService: CharactersService
  ) {
    this.characters = new Array<Character>();
  }

  //   ngOnInit(): void {
  //     this.charactersService.getAllCharacters().subscribe((results) => {
  //       console.log(results);
  //       if (results) {
  //         // console.log(results[0].results);
  //         // this.characters = results[0].results;
  //       }
  //     });
  //   }

  ngOnInit(): void {
    this.charactersService
      .getAllCharacters()
      .pipe(take(1))
      .subscribe((res: any) => {
        this.characters = res.results;
        //console.log('##ABEL## >> AppComponent >>  res', res.results);

        this.dataSource = new MatTableDataSource<Character>(this.characters);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showCharacter(id: number) {
    //console.log(id);
    this.router.navigateByUrl('/character/' + id);
  }
}
