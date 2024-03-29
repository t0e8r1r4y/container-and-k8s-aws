<h1 align="center">
  <br>
  <img src="https://www.docker.com/wp-content/uploads/2022/05/Docker_Temporary_Image_Social_Thumbnail_1200x630_v5.png"  width=1200"></a>
  <br>
  <br>
  운영환경 : 컨테이너 운영환경과 오케스트레이션 툴 사용경험
  <br>
  <br>
</h1>

## 소개
해당 레포지토리는 컨테이너 운영환경에 대해서 정리하고자 합니다. 컨테이너 운영환경과 오케스트레이션을 중점적으로 정리할 예정이며, 온프레미스 환경에서는 k8s를 중심으로, 클라우드 환경에서는 AWS 프로덕션을 위주로 정리하며 사용해보고자 합니다. 현재 목표는 MSA 파일럿 프로젝트와 연관지어 운영환경을 k8s로 띄워보고자 합니다.

  
## 목차

1. **[기술이해](#1-기술이해)**
1. **[Docker 사용하기](#2-docker-사용하기)**
1. **[k8s 사용하기](#3-k8s-사용하기)**
1. **[AWS 사용하기](#4-aws-사용하기)**



---
## 1. 기술이해


#### Why we use the Container?
    아래 논문을 읽고 주관적인 생각을 정리하면 아래와 같습니다.
    1. 경량화 : 최소한의 리소스로 어플리케이션에 운영에 필요한 환경을 구성한다.
    2. 리소스의 고립 : 리소스를 부분 부분적으로 필요한 만큼 쪼개 사용하고 리소스를 고립시키고 전체를 효율화 한다.
    3. 성능 향상 : 위 두가지를 통해 속도의 최적화와 공간의 최적화에 도달한다.
    4. 결과적으로 운영 비용을 줄이고 유지보수를 용이하게하여 비용을 절감한다.
    5. 온프레미스 환경과 클라우드 환경 사이의 마이그레이션의 용이함. 시스템 변경에 유연하게 대처한다.
    6. 반대급부는 고립화에 따른 자원공유 이슈, 보안이슈, 운영환경에 따른 성능이슈, 네트워크 복잡성 등이 있다.
    7. 기존에 사용하던 VM 기술은 인스턴스를 띄우는데 오버헤드가 너무 크다.


#### 읽어두면 도움 될 논문
| Title | Author | LINK |
| ------ | ------ | ------ |
| Emerging Trends, Techniques and Open Issues of Containerization: A Review | JUNZO WATADA ,  ARUNAVA ROY,  RUTURAJ KADIKAR, HOANG PHAM,  BING XU | [링크][MYTRANSLATE_LINK] |
| LXDs: Towards Isolation of Kernel Subsystems | Vikram Narayanan, University of California, Irvine; Abhiram Balasubramanian, Charlie Jacobsen, Sarah Spall, Scott Bauer, and Michael Quigley, University of Utah; Aftab Hussain, Abdullah Younis, Junjie Shen, Moinak Bhattacharyya, and Anton Burtsev, University of California, Irvine | [링크][LXD_LINK] |
| Multi-Kernel based Scalable Operating Sys-tem for Manycore Systems | Reprinted from S.-J. Cha et al | |


#### OCI ( Open Container Initiative )
| Title | LINK |   
| ------ | ------ |  
| Open Container Initiative | [링크][OCI_LINK] |
| OCI GitHub | [링크][OCIGIT_LINK] |

#### CRI ( Container Running Interface )
| Title | LINK |   
| ------ | ------ | 
                                                                                                                                   
                                                                                                                                   
#### 관련 자료 혹은 블로그 정리 글

| Title | LINK | SUMMERY |
| ------ | ------ | ------ |
| Containerization과 Vertualization, Cloud와 On-premise | [내 블로그][CONTAINERVSVERTUALIZATION_LINK] | 클라우드 온프레미스 제품군 중 가상화와 컨테이너화 제품 구분 |


---
## 2. Docker 사용하기

#### cheat sheet
![DockerCheatSheet](https://user-images.githubusercontent.com/91730236/191916811-570bfc25-3a78-46a4-bd4b-b3fd554ec0c4.png)


---
## 3. k8s 사용하기

    '쿠버네티스 인 액션즈' 책을 기반으로 필요한 오픈소스들을 구동하여 사용하고 필요한 내용들을 정리함. 기본 구성은 MacOS에서 minikube 환경에서 실행함.


#### cheat sheet
![Untitled (8)](https://user-images.githubusercontent.com/91730236/191912255-9851fd6c-49a3-4892-b529-fbb3ccb5fc09.png)

                                                                                                                                   
#### 1부 쿠버네티스 개요
    1장 쿠버네티스 소개
    2장 도커와 쿠버네티스 첫걸음
#### 2부 쿠버네티스 핵심 개념
    3장 파드:쿠버네티스에서 컨테이너 실행
    4장 레플리케이션과 그 밖의 컨트롤러: 관리되는 파드 배포
    5장 서비스: 클라이언트가 파드를 검색하고 통신을 가능하게 함
    6장 볼륨: 컨테이너에 디스크 스토리지 연결
    7장 컨피그맵과 시크릿: 애플리케이션 설정
    8장 애플리케이션에서 파드 메타데이터와 그 외의 리소스에 액세스하기
    9장 디플로이먼트: 선언적 애플리케이션 업데이트
    10장 스테이트풀셋:복제된 스테이트풀 애플리케이션 배포하기
#### 3부 쿠버네티스 심화
    11장 쿠버네티스 내부 이해
    12장 쿠버네티스 API 서버 보안
    13장 클러스터 노드와 네트워크 보안
    14장 파드 컴퓨팅 리소스 관리
    15장 파드와 클러스터 노드의 오토스케일링
    16장 고급 스케줄링
    17장 애플리케이션 개발을 위한 모범 사례
    18장 쿠버네티스의 확장

### 쿠버네티스 설치



---
## 4. AWS 사용하기

#### 필요 개념 정리
| Title | LINK | SUMMERY |
| ------ | ------ | ------ |
| Serverless | [링크][SERVERLESS_LINK] | 서버리스에 대한 개념 + Lambda & Serverless FrameWork |
                                                                                                                                   
#### Product
| Name | LINK | SUMMERY |
| ------ | ------ | ------ |
| Lambda | [LAMBDA_LINK] | 람다 프로덕트에 대한 요약 정리 |
| ECS | [ECS_LINK] | ECS에 대해 요약 정리 |
| Fargate | | Fargate에 대해 요약 정리 |
| ECR | [ECR_LINK] | ECR에 이미지(도커) 올리는 방법 정리 |
| Elastic Beanstalk | [EB_LINK] | 엘라스틱빈즈토크 사용 방법 정리 |



---
**Thanks! 건전한 피드백 언제나 환영**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [OCI_LINK]: <https://opencontainers.org/>
   [OCIGIT_LINK]: <https://github.com/opencontainers>
   [LXD_LINK]: <https://www.usenix.org/conference/atc19/presentation/narayanan#:~:text=LXDs%20allow%20one%20to%20take,drivers%20in%20the%20Linux%20kernel.>
   [MYTRANSLATE_LINK]: <https://github.com/t0e8r1r4y/container-and-k8s/blob/main/ContainerizationReview.md>
   [CONTAINERVSVERTUALIZATION_LINK]: <https://medium.com/@tas.com/containerization%EA%B3%BC-vertualization-cloud%EC%99%80-on-premise-772b2cffcb80>
   [SERVERLESS_LINK]: <https://github.com/t0e8r1r4y/container-and-k8s/blob/main/AWS/Serverless.md>
   [LAMBDA_LINK]: <https://github.com/t0e8r1r4y/container-and-k8s/blob/main/AWS/LAMDA.md>
   [ECS_LINK]: <https://github.com/t0e8r1r4y/container-and-k8s/blob/main/AWS/ECS.md>
   [ECR_LINK]: <https://github.com/t0e8r1r4y/container-and-k8s-aws/blob/main/AWS/ECR.md>
   [EB_LINK]: <https://github.com/t0e8r1r4y/container-and-k8s-aws/blob/main/AWS/EB.md>
