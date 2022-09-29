import { Injectable, NotFoundException } from '@nestjs/common';
import { TryCatch } from '../try-catch.decorator';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  // 데이터베이스 없이 임시로 배열에 저장 -> 프로세스 시작시 메모리에 배열로 저장
  private movies: Movie[] = [
    { id : 1, title : "수리남", year : 2022, genres : ["범죄, 약물"] },
    { id : 2, title : "강철부대", year : 2022, genres : ["군대, 존잼"] },
  ];

  
  // 전체를 조회함
  findAll(): Movie[] {
    return this.movies;
  }
  // id를 기준으로 하나만 조회함
  @TryCatch(`Movie with ID not found.`)
  findOne(id: number): Movie {
    const movie = this.movies.find(movie=>movie.id === id);
    if(!movie) {
      throw new NotFoundException('test'); // 여기서 에러를 던져주어야 TryCatch에서 조건이 성립함.
      // throw new Error('error test');
    }
    return movie;
  }

  // 위 배열에 항목 추가
  @TryCatch(`값을 추가 할 수 없습니다.`)
  create(createMovieDto: CreateMovieDto) : Boolean {
    let dataLen = this.movies.length;

    const result = this.movies.push({
      id: this.movies.length + 1,
      ...createMovieDto,
    });

    if(dataLen + 1 === result ) {
      throw new Error('null 값을 추가합니다.');
    }

    return true;
  }

  // 데이터 업데이트
  update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = this.findOne(id);
    this.remove(id);
    this.movies.push({...movie, ...updateMovieDto});
  }

  // 하나 원소 삭제
  remove(id: number) {
    this.findOne(id);
    this.movies = this.movies.filter(movie=>movie.id !== id);
  }
}
