# Pod에 대하여
     파드 = 컨테이너 그룹 ( 하나 이상의 컨테이너를 포함 )
     파드 = 기본 빌딩 블록
     -> 컨테이너를 배포하기 보다는 항상 파드를 배포하여 운영한다.
     
     워커노드에 파드가 종속되어 있으며 그 파드에 컨테이너가 종속된 구조
     그러므로 파드는 다수의 워커노드에 걸쳐서 배포되지 않는다.
     
# Pod를 사용하는 이유
     Why? 멀티프로세스를 사용하지 않는가? -> 컨테이너는 단일 프로세스를 실행하는 것을 목적으로 설계가 됨 ( 프로세스가 fork하는 자식 프로세스를 제외하고 )
     Why? 단일 프로세스 실행을 위해 설계 되었나? -> 결국 관리자(혹은 개발자)의 입장에서 관리의 복잡성을 감소, 내가 번역한 논문을 봤을 때는 일단 하나의 컨테이너에서 동작하는 단일 프로세스 성능을 향상 시키기 위한 목적
     
     그러다보니 멀티 프로세스 관리가 아닌 멀티 컨테이너 관리가 필요해졌고, 그래서 등장한 것이 Pod
     
# Pod 동작 이해하기
     파드에서 컨테이너 간 부분 격리 -> 각각의 개별 컨테이너들은 파드 내에서 특정한 리소스를 공유해야함.
     쿠버네티스는 파드 안에 있는 모든 컨테이너가 동일한 리눅스 네임스페이스를 공유하도록 도커를 설정해야함 -> 각각의 자체 네임스페이스 X

     파드의 모든 컨테이너는 동일한 네트워크 네임스페이스와 UTS 네임스페이스 안에서 실행된다.
     모든 컨테이너는 같은 호스트 이름과 네트워크 인터페이스를 공유함
     파드의 모든 컨테이너는 동일한 IPC 네임스페이스 아래에서 실행되 IPC를 통해서 서로 통신이 가능하다.
     
# 컨테이너가 동일한 IP와 포트 공간을 공유하는 방법
     쿠버네티스 클러스터의 모든 파드는 하나의 플랫한 공유 네트워크 주소 공간에 상주하고 있다. => 쉽게 생각해서 같은 대역의 IP를 쓴다.
     각각의 파드는 같은 대역의 IP를 고유하게 할당받고 충돌이 나서는 안된다.
     개별 컨테이너는 포트번호로 구분을 한다.
     
------------
># Flat network 개념
>> A flat network is a computer network design approach that aims to reduce cost, maintenance and administration.[1] Flat networks are designed to reduce the number of routers and switches on a computer network by connecting the devices to a single switch instead of separate switches. Unlike a hierarchical network design, the network is not physically separated using different switches.
>> The topology of a flat network is not segmented or separated into different broadcast areas by using routers.[1] Some such networks may use network hubs or a mixture of hubs and switches, rather than switches and routers, to connect devices to each other.[1] Generally, all devices on the network are a part of the same broadcast area.[1]

>> 단일 스위치를 사용하여 컴퓨터 네트워크의 라우터와 스위치 갯수를 줄이는 방식.
>> 장점은 비용, 유지관리, 사용자 혹은 개발자의 관리가 줄어듬
>> 단점은 보안이 취약함( 내부 망으로 침투 시 모든 접근이 가능함 ), 다중 게이트 웨이 이런것에 대한 사용성이 낮음
-------------



# Pod에서 컨테이너의 적절한 구성
     책에서 권하는 구성은 단일 파드에 단일 컨테이너 실행을 추천하는 듯. ( 보통 단일 컨테이너라고 하더라도 Active/Standby 구성으로 되어 있는 점은 감안 )
     
     컨테이너를 함께 실행해야 되는가? 혹은 서로 다른 호스트에서 실행할 수 있는가?
     여러 컨테이너가 모여 하나의 구성 요소를 나타내는가, 혹은 개별적인 구성 요소인가?
     컨테이너가 함께, 혹은 개별적으로 스케일링 되어야 하는가?
     
     
# Yaml 파일을 사용하여 파드 생성하는 방법 ( 소스코드는 src 포함 )
1. kubectl explain을 이용해 사용 가능한 API 오브젝트 필드 찾기

          kubectl explain pods
          KIND:     Pod
          VERSION:  v1

          DESCRIPTION:
               Pod is a collection of containers that can run on a host. This resource is
               created by clients and scheduled onto hosts.

          FIELDS:
             apiVersion	<string>
               APIVersion defines the versioned schema of this representation of an
               object. Servers should convert recognized schemas to the latest internal
               value, and may reject unrecognized values. More info:
               https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

             kind	<string>
               Kind is a string value representing the REST resource this object
               represents. Servers may infer this from the endpoint the client submits
               requests to. Cannot be updated. In CamelCase. More info:
               https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

             metadata	<Object>
               Standard object's metadata. More info:
               https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

             spec	<Object>
               Specification of the desired behavior of the pod. More info:
               https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

             status	<Object>
               Most recently observed status of the pod. This data may not be up to date.
               Populated by the system. Read-only. More info:
               https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

     
2. create 명령으로 파드 생성하기

       kubectl create -f kubia-manual.yaml
       kubectl get po kubia-manual -o yaml
       kubectl get po kubia-manual -o json
       docker logs <container id>
       kubectl logs kubia-manual
       kubectl logs kubia-manual -c kubia
     
3. 파드 - 포트포워딩

![port_fowarding drawio](https://user-images.githubusercontent.com/91730236/156922176-47cd5166-a9a5-4049-b8c7-96aa18ff2f84.png)


       kubectl port-forward kubia-manual 9999:9090
       
       Forwarding from 127.0.0.1:9999 -> 9090
       Forwarding from [::1]:9999 -> 9090
       
       외부에서 curl localhost:9999로 연결을 시도하면 아래 로그가 발생함
       Handling connection for 9999
          
       
4. 레이블을 이용한 파드구성

       Labels : 파드를 정리하는 메커니즘. 리소스에 첨부하는 키-쌍 값으로, 이 쌍은 레이블 설렉터를 사용해 리소스를 선택할 때 활용된다.
       
       구성요소
       app : 파드가 속한 애플리케이션, 구송 요소 혹은 마이크로서비스를 지정한다.
       rel : 파드에서 실행 중인 애플리케이션이 statble, beta 혹은 카나리 릴리스인지 보여준다.
       
       kubia-manual-with-labels.yaml 파일을 실행해본다. ( scr 포함 )
       
       
       
       kubectl create -f kubia-manual-with-labels.yaml
       kubectl get pods --show-labels
       
       
       기존 파드 레이블 수정
       
          kubectl get pods --show-labels
          
          NAME              READY   STATUS    RESTARTS   AGE   LABELS
          kubia-manual      1/1     Running   0          21m   <none>
          kubia-manual-v2   1/1     Running   0          49s   creation_method=manual,env=prod
          
          kubectl label po kubia-manual creation_mothod=manual
          pod/kubia-manual labeled
          
          kubectl label po kubia-manual-v2 env=debug --overwrite
          pod/kubia-manual-v2 labeled
          
          kubectl get po -L creation_method,env
          NAME              READY   STATUS    RESTARTS   AGE    CREATION_METHOD   ENV
          kubia-manual      1/1     Running   0          25m
          kubia-manual-v2   1/1     Running   0          5m3s   manual            debug
   
4. 레이블 셀렉터를 이용한 파드 부분 집합 나열

       리소스를 조회하면서 레이블 셀렉터를 사용하여 레이블을 조회 할 수 있다.
       레이블 셀렉터는 특정 레이블로 태그된 파드의 부분 집합을 선택해 원하는 작업을 수행한다.
       레이블 셀렉터는 아래 기준으로 리소스를 선택한다.
          - 특정한 키를 포함하거나 포함하지 않는 레이블
          - 특정한 키와 값을 가진 레이블
          - 특정한 키를 갖고 있지만, 다른 값을 가진 레이블
  
  
       레이블 셀렉터를 사용해 파드 나열 -> kubectl get po -l creation_method=manual
       
       kubectl get po -l env   -> env 레이블을 가지고 있지만, 값은 무엇이든 상관없는 파드를 보기위한 조회 명령
       kubectl get po -l '!env'-> env를 가지고 있지 않은 파드
       -> ''로 감싸 배시 셸이 느낌표를 처리하지 않도록 한다.
       kubectl get po -l creation_method!=manual -> creation_method 레이블을 가지고 있는 파드 중에 manual이 아닌 것
       kubectl get po -l env in (prod,devel) -> env 레이블 값이 prod 또는 devel로 설정되어 있는 파드
       kubectl get po -l env notion (prod,devel) -> env 레이블 값이 prod 또는  devel이 아닌 파드
       
       
5. 레이블과 셀렉터를 이용해 파드 스케줄링 제한

       위에서 생성된 모든 파드는 워커 노드 전체에 걸쳐 무작위로 스케줄링 됨.
       각 파드는 요청한 만큼의 정확한 컴퓨터 리소스(CPU, 메모리 등)를 할당받는다.
       하지만 하드웨어 인프라가 동일하지 않은 경우에 특정파드를 특정 노드에 배치해야 될 필요도 있다.
       
       
----------------
# 레이블 셀렉터에 대한 내용
----------------



6. 파드에 어노테이션 달기

       어노테이션은 키-값 쌍으로 레이블과 유사하지만 식별 정보를 갖지 않는다. 어노테이션은 오브젝트를 묶는 데 사용할 수 없다. 셀렉터도 없음
       다만 더 많은 정보를 기록할 수 있음.
       
       어노테이션은 쿠버네티스에 새로운 기능을 추가할 때 흔히 사용됨.
       일반적으로 새로운 기능의 알파 혹은 베타 버전은 API 오브젝트에 새로운 필드를 바로 도입하지 않는다. 필드 대신 어노테이션을 사용하고 필요한 API 변경이 명확해지고
       쿠버네티스 개발자가 이에 동의하면 새로운 필드가 도입된다. 그리고 관련 어노테이션 사용은 종료
       
       그리고 관리 상 개발자가 어노테이션 정보를 공유하면 다른 사람에 의한 관리도 용이함
       
       kubectl annotate pod kubia-manual mycompany.com/someannotation="foo bar"
       kubectl describe pod kubia-manual | grep "annotation"
       
       
       
       

7. 네임스페이스를 사용한 리소스 그룹화

       쿠버네티스에서 오브젝트를 겹치지 않는 그룹으로 분할하고자 할 때는 네임스페이스를 사용한다.
       모든 리소스를 하나의 단일 네임스페이스에 두는 대신에 여러 네임스페이스로 분할 할 수 있으며
       분리된 네임스페이스는 같은 리소스 이름을 다른 네임스페이스에 걸쳐 여러 번 사용이 가능하다.
       
       여러 네임스페이스를 사용하면 복합한 시스템을 논리적으로 구분되는 그룹으로 분리가 가능하다.
       멀티테넌트 환경처럼 리소스를 분리하는 데 사용
       리소스를 프로덕션, 개발, QA 등 진행 프로세스에 맞춰 구분지어 사용도 가능하다.
       
       
       custom-namespace.yaml 파일 실행으로 네임스페이스 생성 확인
       kubectl create -f custom-namespace.yaml
       kubectl create -f kubia-manual.yaml -n custom-namespace
       
       
       네임스페이스를 사용하면 오브젝트 별도 그룹으로 분리해 특정한 네임스페이스 안에 속한 리소스를 대상으로 작업이 가능하다.
       다만 실행 중인 오브젝트에 대한 격리는 제공되지 않는다.
       
       
8. 파드 중지와 제거

       쿠버네티스는 SIGTERM 신호를 프로세스에 보내고 지정된 시간 동안 대기 -> 시간 내에 종료되지 않으면 SIGKILL 신호를 통해서 종료한다.
       
       kubectl delete po <파드명>
       kubectl delete po -l creation_method=manual 이런식으로도 가능하며
       kubectl delete ns custom-namespace 이렇게도 가능
       kubectl get po --all -> 모든 파드 제거
       kubectl delete all -all -> 현재 네임스페이스에 있는 모든 리소스 삭제 ( 단, 시크릿과 같은 특정 리소스는 보존이 됨 )
       
       
       
       
       
----------------------
요약
- 특정 컨테이너를 파드로 묶어야 하는지 여부를 결정하는 방벙
- 파드는 여러 프로세스를 실행할 수 있으며 컨테이너가 아닌 세계의 물리적 호스트와 비슷하다.
- YAML 또는 JSON 디스크립터를 작성해 파드를 작성하고 파드 정의와 상태를 확인
- 레이블과 레이블 셀렉터를 사용해 파드를 조작하고 한 번에 여러  파드에서 작업을 쉽게 수행할 수 있다.
- 노드 레이블과 셀렉터를 사용해 특정 기능을 가진 노드에 파드를 스케쥴링할 수 있다. -> MLOPS에서 중요하게 쓰일 듯
- 어노테이션을 사용하면 사람 또는 도구, 라이브러리에서 더 큰 데이터를 파드에 부착할 수 있다.
- 네임스페이스는 다른 팀들이 동일한 클러스터를 별도 클러스터를 사용하는 것처럼 이용할 수 있게 해준다.
- kubectl explain 명령을 통해서 쿠버네티스 리소스 정보를 빠르게 찾을 수 있다.
       
       

------------------------
참고 사이트
- https://kubernetes.io/ko/docs/concepts/overview/working-with-objects/kubernetes-objects/
