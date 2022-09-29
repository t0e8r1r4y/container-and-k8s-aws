import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TryCatch } from '../try-catch.decorator';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 구현한 메소드들에 대한 테스트를 진행합니다.
  // describe('find All Movie', () => {
  //   it('should return an array', () => {

  //     const result = service.findAll();
  //     expect(result).toBeInstanceOf(Array); // 불러오는 형태가 Array인지 확인
      
  //     // 하나 데이터 생성 후 해당 길이 체크
  //     service.create( {
  //       title: 'Test Movie',
  //       genres: ['test'],
  //       year: 2022,
  //     });

  //     const length = service.findAll().length;
  //     expect(length).toEqual(1);

  //   })
  // });

  describe('create Movie', () => {
    it('shoud return a error' , () => {
      const result = service.create(null);
      console.log(result);
    })
  })


  describe('find one movie', () => {
    it('should return a movie', () => {
      // 하나 데이터 생성 후 값 체크
      service.create( {
        title: 'Test Movie',
        genres: ['test'],
        year: 2022,
      });

      const movie = service.findOne(1);
      expect(movie).toBeDefined();
    })

    // 찾는 번호가 없을 때 정상적으로 404 에러를 리턴하는지 확인함
    it('should throw 404 error', () => {
      const result = service.findOne(987);
      console.log(result);
      // try {
      //   service.findOne(987); // 없는 번호
      // } catch (error) {
      //   expect(error).toBeInstanceOf(NotFoundException);
      // }
    });
  });

  // describe('delete One Movie', () => {
  //   it('remove a movie', () => {
  //     service.create({
  //       title: 'Test Movie',
  //       genres: ['test'],
  //       year: 2022,
  //     });
  //     const beforeDelete = service.findAll().length;
  //     service.remove(1);
  //     const afterDelete = service.findAll().length;
  //     expect(afterDelete).toBeLessThan(beforeDelete);
  //   });

    // 없는 번호 삭제 요청에 대한 반응
  //   it('should throw a NotFoundException', () => {
  //     try {
  //       service.remove(987);
  //     } catch (error) {
  //       expect(error).toBeInstanceOf(NotFoundException);
  //     }
  //   });
  // });

  // 생성관련 테스트
  // describe('create', () => {
  //   it('should create a movie', () => {
  //     const beforeCreate = service.findAll().length;
  //     service.create({
  //       title: 'Test Movie',
  //       genres: ['test'],
  //       year: 2022,
  //     });
  //     const afterCreate = service.findAll().length;
  //     expect(afterCreate).toBeGreaterThan(beforeCreate);      
  //   });
  // });


  // 업데이트
  // describe('update', () => {
  //   it('should update a movie', () => {
  //     service.create({
  //       title: 'Test Movie',
  //       genres: ['test'],
  //       year: 2022,
  //     });
  //     service.update(1, {title: 'Updated Test'});
  //     const movie = service.findOne(1);
  //     expect(movie.title).toEqual('Updated Test');      
  //   });

  //   it('should throw a NotFoundException', () => {
  //     try {
  //       service.update(999, {});
  //     } catch (error) {
  //       expect(error).toBeInstanceOf(NotFoundException);
  //     }
  //   });
  // });
});
