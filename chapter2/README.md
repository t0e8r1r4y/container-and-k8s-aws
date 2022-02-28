# 도커를 사용한 컨테이너 이미지 생성, 실행, 공유하기

## 도커 설치 -> macOS Mojave 10.14.4 -> docker version [Docker version 20.10.6]

## 간단한 node.js 애플리케이션 생성하고 실행 -> src 소스 참고

### 주의사항 : 반드시 docker가 실행 중에 있어야한다. 실행 중이지 않으면 docker build -t 명령을 실행해도 안됨. ( Error response from daemon: dial unix docker.raw.sock: connect: connection refused ) 데몬에서 정상적으로 응답을 받아주지 못한다. 그리고 반드시 sudo 권한을 부여해서 실행하도록 한다.


### 소스설명 : 해당 소스는 9090 http 서버를 시작하고, 서버는 모든 요청에 대해서 상태코드 200과 You've hit <호스트 이름>의 텍스트를 콘솔에 출력한다.

### 소스실행 : 반드시 Dockerfile과 app.js가 한 경로에 있어야 한다.

<hr/>
