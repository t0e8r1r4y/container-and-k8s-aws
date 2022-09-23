## AWS Lamdba

#### 정의

- 아마존 웹 서비스에서 제공하는 서버리스 컴퓨팅 서비스
- 애플리케이션을 실행하기 위한 별도의 서버 셋업 없이 곧바로 코드를 실행해주는 서비스 의미
- 고정 비용은 없고 사용 시간에 대해서만 비용이 발생한다.
- 람다는 기본적으로 이벤트 드라이븐 방식으로 동작함
- API 게이트웨이와 엘라스틱 로드 밸런서의 HTTP 요청을 처리할 수 있으며, S3 객체, 다이나모 DB, 키네시스 등에서 발생하는 이벤트를 트리거로 실행하는 것도 가능
- AWS 람다는 컨테이너 지원을 하지 않음

#### 특징

- 컴퓨팅 자원은 128MB와 3.008MB 사이에서 64MB 단위로 결정 할 수 있음
- 1,792MB 메모리를 할당한 경우 1vCPU와 같다고 한다.

#### 동작원리

![Untitled](https://user-images.githubusercontent.com/91730236/191992740-00b6e3da-2750-42fb-b460-73aa27034e1e.png)


- Event Source: 함수가 실행될 조건이자 이벤트 소스 (HTTP 요청, 메시징, Cron 등)
- Function: 작업할 내용
    1. Handler 함수: 호출 시 실행되는 함수
    2. Event 객체: 함수가 호출된 이벤트 정보를 담고 있는 객체
    3. Context 객체: 해당 함수의 컨텍스트 정보(실행 관련 정보)를 담고 있는 객체
- Service: 작업 결과를 처리(DB 저장, 다른 서비스로 전달, 메시징, 출력 등)

#### 람다의 동작환경

- 람다 서비스에서 API 엔드포인트를 통해서 실제 프로세스가 동작하는 환경에 함수를 실행하는 것
    
    ![Untitled 1](https://user-images.githubusercontent.com/91730236/191992997-29e28ffe-79a3-4739-8050-d9d24f323ca1.png)
    
- 람다 실행 환경 수명 주기
    
    ![Untitled 2](https://user-images.githubusercontent.com/91730236/191993101-48f1c42c-891c-4f9d-b349-111bd8fa42d3.png)
    
    - init
        - Extension Init
        - Runtime init
        - Function init
    - Invoke
    - Shutdown
    
    ![Untitled 3](https://user-images.githubusercontent.com/91730236/191993201-5b05b502-513a-4dc4-9cfb-917a924a736c.png)
    

---
#### 관련 정보
| TITLE | LINK | SUMMERY | 
| ------ | ------ | ------ |
| 람다 이벤트 소스 매핑 | [AWS 공식 자료][AWSLAMDA_OFFICIAL_LINK] | AWS에서 제공하는 공식 자료입니다. |



#### 적용 사례
| TITLE | LINK | SUMMERY | 
| ------ | ------ | ------ |
| 당근마켓 | [DANGGUN_LINK] | 이미지 썸네일 생성 개발 후기 |
| 로켓펀치 | [ROCKET_LINK] | 300원에 200만뷰 소화하기 |


---
**Thanks!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [AWSLAMDA_OFFICIAL_LINK]: <https://velog.io/@coalery/nest-injection-how](https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/invocation-eventsourcemapping.html>
   [DANGGUN_LINK]: <https://medium.com/daangn/aws-lambda%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%83%9D%EC%84%B1-%EA%B0%9C%EB%B0%9C-%ED%9B%84%EA%B8%B0-acc278d49980>
   [ROCKET_LINK]: <https://blog.rocketpunch.com/2017/07/02/2-million-pv-with-300-krw/>
