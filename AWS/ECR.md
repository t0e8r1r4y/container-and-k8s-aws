## ECR에 도커 이미지를 push 하는 방법
    해당 방법은 AWS 계정을 새로 생성 한 뒤, 진행하는 방식에 대해서 작성합니다.
    기존 설치 된 구성이 있다면 해당 과정은 건너 뛸 수 있습니다.
    
    
#### 0. 사전작업 ( 도커 이미지 만들기 )
- nest.js 프로젝트를 docker 이미지로 만들어 보았습니다.
- nest 명령어를 생성하여 빈 프로젝트 하나를 빌드합니다. npm 명령어로 프로젝트를 생성했고, npm run start:dev 입력 시 정상 동작함을 확인
- dockerfile, dockerignor 파일 작성 ( 레포지토리에 첨부 )
- root 경로에서 아래 명령어 입력

  ```
  docker build -t test:0.0 ./
  ```
      [명령어에 대해 간단히 요약]
      build 명령어 사용. 옵션은 -t는 아래 의미임
      To tag the image into multiple repositories after the build, add multiple -t parameters when you run the build command:
      test는 이미지명, 0.0은 버전명(테스트라 0.0)으로 함
      마지막 ./은 dockerfile이 있는 경로를 말함. 현재는 project에서 Root 경로에서 실행하므로 ./으로 표시
    
- docker images 명령어를 입력하여 생성 이미지 확인
- 아래 명령어로 이미지를 구동하여 컨테이너에서도 해당 nestjs로 만든 API서버가 정상동작하는지 확인.
  ```
  docker run -it -p 3000:3000 test:0.0
  ```
  
<br/>


#### 1. ERC 생성
- AWS에 접속
- ECR(Elastic Container Registry) 들어가기
- 새 레포지토리 생성

  
<br/>

#### 2. 권한 설정
- aws-cli가 설치되어 있지 않다면 설치
```
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"                                                                                   
sudo installer -pkg AWSCLIV2.pkg -target /
aws --version
```
- IAM 접속
- admin 계정에 대해서 key 생성
- aws configure 명령어를 입력하여 Key ID와 Access Key 등록
- 현재 지역 확인 ( 개인적으로 서울로 해서 사용 중 )
- 로그인
  ```
  aws ecr get-login-password --region <지역> | docker login --username AWS --password-stdin <사용자ID>.dkr.ecr.<지역>.amazonaws.com
  console > Login Succeeded
  ```
- 로그인이 정상적으로 되지 않으면 이미지 푸시 과정에서 ['no basic auth credentials'](https://docs.aws.amazon.com/ko_kr/AmazonECR/latest/userguide/common-errors-docker.html) 에러가 발생 할 수 있음

  
<br/>


#### 3. [이미지 푸시](https://docs.aws.amazon.com/ko_kr/AmazonECR/latest/userguide/docker-push-ecr-image.html)
- 생성 이미지 확인
- 이래 생성해둔 ECR이름, 컨테이너 이름, aws id 확인 후 아래 명령어 입력
```
docker tag <이미지 이름> <aws id>.dkr.ecr.<지역>.amazonaws.com/<ECR레포지토리명>:<태그>
```
- docker push 명령어 실행
```
docker push <aws id>.dkr.ecr.<지역>.amazonaws.com/<ECR레포지토리명>:<태그>
```
- 기본적으로 docker repo에 이미지 올리는 방식과 동일함
