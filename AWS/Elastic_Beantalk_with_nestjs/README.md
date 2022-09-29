<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript와 TypeORM dependency가 추가된 간단한 예제입니다. 해당 프로젝트를 Elastic BeansTalk에 배포하는 구성입니다. git repo에 저장된 코드를 codepipeline을 통해 배포합니다. 해당 레포지 토리 내용을 사용한다면 아래와 같이 진행하여 주세요.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## 해당 프로젝트를 사용하지 않을 때
- nestjs 프로젝트 생성
- typeORM 의존성 추가
- 본인이 사용할 DB 드라이버 추가 ( 해당 드라이버가 추가되어 있지않으면 RDS에 접속이 불가능 함 )

## Elastic Beanstalk 실행
```
아래 내용은 22.09.29 기준으로 작성한 내용입니다. 시간이 지나면 AWS console이나 화면이 바뀔 수 있습니다.
```

- AWS 로그인 후 EB를 시작합니다.
![EB시작하기](https://user-images.githubusercontent.com/91730236/192983785-af7c52e7-875b-492a-99e0-06987c75fc5d.png)

- 본인이 원하는 웹 앱의 이름을 입력합니다.
![EB이름생성](https://user-images.githubusercontent.com/91730236/192983907-86ffe093-292c-40bf-8fa7-03459c5b44d5.png)

- 애플리케이션을 구동시킬 플랫폼 환경을 설정합니다. nestjs는 node 기반이므로 Node js 환경으로 설정합니다. Code Pipeline으로 배포할 예정이므로 애플리케이션 코드에서 `샘플 애플리케이션` 으로 선택하여 진행합니다.
![EB 애플리케이션 생성](https://user-images.githubusercontent.com/91730236/192983932-eb4c8966-3c4e-42b4-b860-108446c2533c.png)

- 아래 설정들은 어플리케이션 생성 이후에도 가능하며 생성 전 `추가 옵션 구성`에서도 가능합니다. 저는 생성 전 설정을 진행하는 예제입니다.
- 사전 설정으로 들어오면 소프트웨어 설정에서 편집을 누릅니다. 
![EB 소프트웨어에서 포트 설정 1](https://user-images.githubusercontent.com/91730236/192983957-832b4ae7-388d-4df8-8d21-f17e1e7a4282.png)

- 프록시 서버로 저는 nginx를 사용하였습니다.
![EB 소프트웨어에서 포트 설정 2](https://user-images.githubusercontent.com/91730236/192983922-551c75e8-da6b-4e7f-a305-cad177528c5a.png)

- 저는 React와 충돌을 피하기위해서 nestjs 어플리케이션 포트를 4000으로 맞춰두었습니다. 맞춰둔 설정을 입력합니다.
![EB 소프트웨어에서 포트 설정 3](https://user-images.githubusercontent.com/91730236/192983889-5e96877b-83ae-4608-b921-947a59b11f1f.png)


- 다음 데이터 베이스를 설정합니다. 함께 설정하면 VPC 보안그룹에 해당 Elastic Beanstalk와 연결되는 네트워크가 자동 생성되는 편리함이 있습니다.  
![EB 소프트웨어에서 DB 설정 1](https://user-images.githubusercontent.com/91730236/192983898-5804fc6f-b6d1-4dd4-a801-429503828511.png)

- 데이터베이스 정보를 입력합니다.
![스크린샷 2022-09-29 오후 5 29 10](https://user-images.githubusercontent.com/91730236/192983917-8ff87198-60a2-4328-8a97-45207b28d737.png)

- 삭제 정책과 관련해서 저는 해당 환경이 종료되면 삭제되도록 하였습니다. ( 테스트인데... 모든건 비용이요 )
![스크린샷 2022-09-29 오후 5 29 36](https://user-images.githubusercontent.com/91730236/192983941-e36d287f-049c-495e-a487-896e272e7922.png)


- 생성을 누르면 아래 생성화면이 뜹니다.
![생성중](https://user-images.githubusercontent.com/91730236/192983904-d575329d-556c-43e9-94f0-bc2ffa5bc6df.png)

- 최종 생성이 완료된 모습입니다.
![스크린샷 2022-09-29 오후 5 39 39](https://user-images.githubusercontent.com/91730236/192983927-def99709-c2ea-4d7b-9737-163e2ec2009b.png)

<br/>

## NestJS app에서 접속 관련 설정
- 프로젝트에서 `app.module.ts` 파일에서 생성한 RDS 관련 정보를 DB Connection 값에 매칭시켜 입력합니다. 아래와 같이 설정을하면 Elastic Beanstalk에서 설정 정보를 아래 환경 변수로 제공합니다. [관련 내용 공식 문서 링크](https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/create-deploy-nodejs.rds.html)

```
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.RDS_HOSTNAME,
      port: +process.env.RDS_PORT,
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      ...(중략)...
    }),
```

- 구동될 어플리케이션 포트 번호도 세팅합니다. `main.ts`에서 포트번호를 아래와 같이 설정합니다.
```
async function bootstrap() {
  ...(중략)
  const port = process.env.PORT;
  await app.listen(port);
}
```

<br/>

## CodePipeline과 git 연동 ( git에 push하면 배포하도록 )
- codepipeline 생성 시작
![파이프라인 생성](https://user-images.githubusercontent.com/91730236/192990617-87f3279d-79db-48c2-9c4e-674af9c8c12d.png)

- 파이프라인 설정 선택  
![파이프라인 설정 선택](https://user-images.githubusercontent.com/91730236/192990926-87b409be-8f9f-4a81-b252-f4c2e448ac72.png)

- 소스를 추가합니다. 중간 부분에 github 연결을 진행하면 됩니다.
![깃헙 연결](https://user-images.githubusercontent.com/91730236/192991089-43823108-655d-4d21-a56d-90cc00151ac5.png)

- 빌드 스테이지는 젠킨스나 별도의 빌드 도구를 사용하지 않으면 스킵합니다.
![빌드 스테이지 추가](https://user-images.githubusercontent.com/91730236/192991558-3b6aa6a3-0331-420b-8d89-cbf97cfa8069.png)

- 배포 작업 공급자는 Elastic BeansTalk로 설정합니다. 이후 검토 후 배포를 진행합니다.
![스크린샷 2022-09-29 오후 6 12 52](https://user-images.githubusercontent.com/91730236/192991789-03068e17-2ce3-4093-bc3e-c28375f1c631.png)

<br/>

## 어플리케이션 배포 결과 확인
- 본인의 controller 혹은 resolver에 접속하기 위해서 환경에서 어플리케이션 링크로 접속
- 실행 결과가 기대한 바와 같이 뜨면 정상

<br/>

## 최종 DB 커넥션 결과 확인
- Elastic Beanstalk에서 RDS 정보를 확인합니다.
- 해당 RDS 정보로 들어가서 VPC에서 보안그룹을 들어가고, 보안그룹에서 인바운드 설정에서 내 local PC에서 접속할 수 있는 포트를 하나 뚫어주기
- 로컬에서 DBMS 접속 툴을 사용해서 접속한 결과 Entity가 테이블로 정상 생성 된 결과를 확인 할 수 있음
![설정 결과](https://user-images.githubusercontent.com/91730236/192983952-c58137f6-535e-4ec6-8130-cb8432503b60.png)



---
수차례 반복 시도하면서 작성한 글이라, 혹시 빠진과정이나 생략 된 부분 중 궁금한 사항이 있다면 issue에 남겨주세요.
