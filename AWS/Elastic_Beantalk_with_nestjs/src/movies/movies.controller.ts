import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // 전체 조회
  @Get()
  findAll(): Movie[] {
    return this.moviesService.findAll();
  }

  // 하나만 조회
  @Get(':id')
  findOne(@Param('id') movieId: number): Movie {
    return this.moviesService.findOne(movieId);
  }
  // 영화 생성
  @Post()
  create(@Body() movieDtata: CreateMovieDto) {
    return this.moviesService.create(movieDtata);
  }
  // 삭제
  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.remove(movieId);
  }
  // path
  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }

}
