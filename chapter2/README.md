# 도커를 사용한 컨테이너 이미지 생성, 실행, 공유하기

##### 도커 설치 -> macOS Mojave 10.14.4 -> docker version [Docker version 20.10.6]



##### 간단한 node.js 애플리케이션 생성하고 실행 -> src 소스 참고



##### 주의사항 : 반드시 docker가 실행 중에 있어야한다. 실행 중이지 않으면 docker build -t 명령을 실행해도 안됨. ( Error response from daemon: dial unix docker.raw.sock: connect: connection refused ) 데몬에서 정상적으로 응답을 받아주지 못한다. 그리고 반드시 sudo 권한을 부여해서 실행하도록 한다.




##### 소스설명 : 해당 소스는 9090 http 서버를 시작하고, 서버는 모든 요청에 대해서 상태코드 200과 You've hit <호스트 이름>의 텍스트를 콘솔에 출력한다.




##### 소스실행 : 반드시 Dockerfile과 app.js가 한 경로에 있어야 한다.

<hr/>

로그는 아래와 같다. 최초 부팅 시 아래 로그가 뜨면서 node 이미지를 퍼블릭 리포지터리(도커 허브)에서 가져오는 작업을 진행한다.

sh-3.2# docker build -t kubia .

[+] Building 109.8s (7/7) FINISHED

 => [internal] load build definition from Dockerfile                    0.0s
 
 => => transferring dockerfile: 100B                                    0.0s
 
 => [internal] load .dockerignore                                       0.0s
 
 => => transferring context: 2B                                         0.0s
 
 => [internal] load metadata for docker.io/library/node:7               4.2s
 
 => [internal] load build context                                       0.0s
 
 => => transferring context: 391B                                       0.0s
 
 (이하 중략)
 
 
 <hr/>
 
 
 
 해당 챕터의 루틴을 따라가고 싶다면 scr에 포함 된 shell을 실행할 것!
 
 
 
 
 
 
 
 <hr/>
 
 
 도커이미지 배포하기
 
 1. docker login 명령어로 docker에 로그인하기
 2. docker tag kubia <내 아이디>/kubia
 3. docker push <내 아이디>/kubia
 
 
 도커이미지 가져올떄
 
 1. docker pull <리파지토리 경로>
