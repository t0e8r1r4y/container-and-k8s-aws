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

           
