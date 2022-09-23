# Emerging Trends, Techniques and Open Issues of Containerization: A Review

    [Warning]
    해당 글은 위 제목의 리뷰를 개인적으로 번역한 내용입니다. 주요 개념 이해를 위해서 구글번역기와 짧은 영어 실력으로 번역하였기에 부정확한 내용이 있음을 사전에 고지합니다.
    또한 필요한 내용 위주로 몰입하여 작성함으로서 반드시 원문을 참고하시고
    중간 중간 필요한 내용은 논문 외 소스도 첨부 되어있는데 노션에서 git으로 옮기면서 출처가 미반영 됨을 고지합니다.

# 1. 개요

### [제목]

Emerging Trends, Techniques and Open Issues of Containerization: A Review

### [저자]

JUNZO WATADA ,  ARUNAVA ROY,  RUTURAJ KADIKAR, HOANG PHAM,  BING XU

1Research Institute of Quantitative Economics, Zhejiang Gongshang University, Hangzhou 310018, China
2Department of CIS, Universiti Technologi Petronas, Seri Iskandar 32610, Malaysia
3Department of CIS, Universiti Technologi Petronas, Seri Iskandar 32610, Malaysia
4Department of CSE, SRM IST, Chennai 603203, India

5InfraCloud Technologies Pvt., Ltd., Pune 411021, India
6Department of ISE, Rutgers, The State University of New Jersey, NJ 08855-8018, USA
7Research Institute of Quantitative Economics, Zhejiang Gongshang University, Hangzhou 310018, China

Corresponding author: Junzo Watada (watada@waseda.jp)

### [초록]

<aside>
💡 Index Terms : Virtualization, containerization, management and orchestration, isolation and security.

</aside>

가상화는 아래의 강점이 있어서 혁신적인 방법이다.

- extra lightweight
- highly portable
- energy, resource and storage efficient
- cost-effective
- performance efficient
- extremely quick during boot up.

이러한 강점들은 로드밸런싱, low-level 시스템의 운영, 효율적인 에너지와 리소스 사용 관점에서 서버 강화, 장애에 대응하기 위해서 지역적으로 인스턴스 레플리케이션 생성을 가능하게 한다.

그러나 네트워크 복잡성, 스토리지 영구저장, 멀티클라우드 지원, 크로스 데이터 센터, 보안, 가용성 부족과 같은 다양한 직면과제를 가지고 있음이 몇몇 문헌에 있더라.

그래서 해당 문헌은 컨테이너화의 잠재된 문제와 가능한 솔루션들을 포함하여 다루고자하며, VMs과 컨테이너, 유니커널 성능을 비교하고자 한다.

( unikernels in terms of CPU utilization, memory footprints, network bandwidth, execution time and technological maturity using standard benchmarks )

그리고 대부분의 양상에서 만족스런 성능을 컨테이너에서 나타나는 것을 관찰함.

하지만, isolation & security, performance stability, lack of available efficient tools for cross-platform support and persistent storage 이런 부분에서는 유니커널이나 VMs이 더 안정적이고 효율적인 것도 확인이 되었기 때문에 저자들은 결론에서 이런 것을 강화해야 된다고 결론에 언급함.

# 2. 내용

### [본문 내용]

1. 도입부
    - 가상화 : Virtualization is a method for sharing physical resources among different users and applications.
    - 가상화는 full Virtualization과 para-Virtualization이 있다.
        - 설명 추가
            
            ![가상화 drawio (1)](https://user-images.githubusercontent.com/91730236/191913219-77c070c0-036f-4a33-b6cf-7c7319c0e7a8.png)
            
    - 전가상화 주요 개념
        - In full virtualization, the central idea is to run unchanged binaries of the OSs as user- level processes on the top of the hypervisor.
        - the trap and emulate strategy of full virtualization.
        - Since the OS code is unchanged
    - 반가상화 주요 개념
        - guests and issue commands directly to the host OS to fulfill necessary resource requirements
        - modification of source codes
    - 컨테이너화의 대두
        - 기존 가상화의 문제점 : As can be seen that the conventional virtualization **comes at a cost of high resource overheads**
        - In **containerization**, an individual instance (called a container), runs on top of a shared OS kernel (with necessary *isolation*).
    - 컨테이너화의 문제점 ( 이건 결론에서도 언급됨 )
    
2. 최근 문헌
    
    ![Untitled (9)](https://user-images.githubusercontent.com/91730236/191913073-9de75fe3-33ff-4ff1-b528-912d32c06638.png)

    
    1. Container networking, migration, container clouds and their application
    2. container isolation & security
    3. container management & orchestration
    4. performance analysis and other experimental setups
3. 하이퍼바이저 VS 컨테이너 기반의 가상화
    1. Hypervisor-based virtualization
    2. containerization : types & supports
        1. Linux kernel supports for containers
        2. Application container VS Machine Container
4. **컨테이너의 장점 ( VMs보다 이점 )**
    1. 단일 목적의 어플리케이션 구동에서 VMs보다 필요한 것들만 컴팩트하게 구성해서 경량화(extreme light-weightness)가 가능하고 spin up/down이 더 빠르다.
        1. intra and inter 데이터 저장소와 트래픽을 줄일 수 있음
        2. 에너지 효율성, 리소스 사용, 어플리케이션 신뢰성 증가, 그리고 서비스 비용 감소 가능 → 필요한 경우에 컨테이너 롤백, 컨테이너 변경 등이 가능하다.
        3. 컨테이너를 띄우고 내리는데 수 밀리세컨드 밖에 안걸림
        4. 효율적인 자원 사용을 위해서 리소스 할당 등을 미리 정의해서 제한 할 수 있음.
        5. 마이크로 서비스 아키텍처에서 개발자의 효율성을 높여줌
        6. 컨테이너화는 더 나은 스토리지 재사용성을 제공함. 그러므로써 사용자는 더 적은 공간에 특정 컨테이너 카피를 유지하는데 저 적은 공간을 사용함
        7. 필요한 종속성을 사용하여 원하는 애플리케이션을 구동하는 컨테이너만 마이그레이션 할 필요가 있음. ( VMs는 설치 된 OS등 전체를 해야하므로 heavy함)
        8. 어플리케이션 실행에 필요한 libs, bins만 있는 얇은 레이어로 프로세스를 실행가능함
        9. 컨테이너 간 연계를 통해서 단일 혹은 멀티플 서비스 어플리케이션을 개발, 테스트, 배포 가능함
    2. host OS의 리소스를 쉐어하는 컨테이너들은 경량화 되고 어느 host에든 배포가 용이하다.
    3. VMs은 OS의 일부만 실행하는 단일 기능을 수행하므로, 여러개의 유연한 계층을 가지고 있더라도 리소스 낭비나 실행 시간 낭비, 운영 비용이 증가함
5. 핵심 기술
    1. Key Container technologies
        - 아래 표에 정리 된 핵심기술이 중요하다.
        
        <img width="1359" alt="Untitled (10)" src="https://user-images.githubusercontent.com/91730236/191913525-635db443-d47d-49ec-94fb-4d8f80cb3a01.png">
        
    2. Container Management & orchestration
        1. 컨테이너 관리 전략은 호스트 위에서 설정되고 스케일링 되는 수많은 컨테이너들의 생성, 삭제, 배포, 설정에서 관리자 관점에서 단순화하는 것이 하나의 포인트,
        2. 다양한 환경에서의 컨테이너 베이스의 Application 배포에 있어서 자동화. 여기서 다양한 환경이란 상호 운용성이 증가하는 이질적인 운영 환경임.
        3. 컨테이너 관리 툴들의 특징은 아래 iv부터와 같다.
        4. 다양한 컨테이너를 하나의 엔터티로 관리해야함
        5. 고가용성, 리소스 사용성 증가, 로드밸런싱, 자동 데이터 백업, 데이터 복구를 목적으로 효율적인 클러스터 구성
        6. 컨테이너 스케쥴링 ( 더 나은 리소스 사용을 위함 )
        7. 오토 스케일링 긴능으로 컨테이너를 동작시키는 것을 자동으로 변화가능해야함.
        8. 볼륨 관리는 영구저장 스토리지를 컨트롤해야함. 쿠버네티스의 경우 플러그인 형태로 다양한 볼륨을 제공함
        9. 리소스 사용 모니터링이 컨테이너 레벨, 논리적 그룹 레벨에서 가능해야함
        10. 오케스트레이션과 제품 레벨에서 이슈를 자동으로 발견해야함.
        11. service discovery 모듈 탑재.
        12. 구동되는 시스템의 업데이트를 허용해야 함.
        13. 주요 제품은 OpenShift, Docker swarm Manager, K8s, Mesos Marathon 등등
        
        <aside>
        🔥 오케스트레이션과 서비스 디스커버리 문제의 개념적인 차이가 있다.
        **오케스트레이션과 서비스 검색 문제 사이의 중요한 개념적 차이점은 전자가 컨테이너 클라우드에서 다중 컨테이너 패키지 애플리케이션의 구성을 배포, 모니터링 및 동적으로 제어하는 프로세스를 의미한다는 것입니다. 서비스 검색 문제는 주어진 순간에 서비스를 신뢰할 수 없고 소비자 서비스가 성공적인 실행을 위해 공급자 서비스를 찾아야 하기 때문에 발생합니다.**
        
        </aside>
        
    3. Container Networking
        1. 컨테이너에서 구동하는 마이크로 서비스의 경우에는 네트워크 리소스 의존성이 매우 높음
        2. Fully isolated networking view는 UNIX Time Sharing과 network name scpace로 가능하다. veth, ipvlan, MACVLAN 과 같은 커널 모듈을 이용하여 네트워크 인터페이스 고립, 라우팅 테이블, IP 테이블, loopback device을 사용하여 네트 워크 고립이 가능함.
        3. ?? → 일단 여기가 좀 이해가 잘 안됨.
6. 컨테이너 Security Isolation
    1. Process Isolation
        1. 인터럽트를 사용하여 호스트의 다른 컨테이너 내에서 실행되는 다양한 프로세스를 격리하는 것을 목표로 함
        2. 프로세스 격리는 프로세스와 컨테이너가 유사한 정보를 필요로 하는 동안 정보 복제를 성공적으로 제한 할 수 있음
        3. 컨테이너는 PID 이름 Pace, chroot 등을 사용하여 프로세스 격리를 구현함.
        4. LXC/LXD는 프로세스 및 하위 프로세스의 작업 루트 디렉터리를 변경 할 수 있는 chroot를 사용하여 프로세스 격리를 구현
        5. 전체 루트 파일 시스템은 pivot_root를 사용하여 새 위치에 복제 가능. 사용자가 이전 및 새 루트 디렉토리를 지정하는 것을 용이하게 함.
        6. LXC 및 셀은 주로 메인라인 리눅스 커널의 일부인 PID 네임스페이스를 사용하여 프로세스 격리를 구현함
        7. PID 네임스페이스는 프로세스를 그룹화하여 프로세스 간에 보고, 상호작용 하는 능력의 제어하는 전략
        8. 서로다른 PID를 가진 네임스페이스가 동일한 PID를 가질 수 있도록 하는 PID 가상화도 제공
        9. Docker는 관련 네임스페이스 내에서 프로세스 래핑을 사용하여 프로세스 격리를 구현하고 다른 컨테이너 또는 호스트에서 실행되는 프로세스에 대한 가시성을 제한
        10. PID 네임스페이스의 구조는 계층적이므로 프로세스는 자신의 네임스페이스 또는 자식 네임스페이스 내의 다른 프로세스만 볼 수 있음.
        11. 외부 공격자는 동일하거나 다른 호스트에 있는 다른 컨테이너에서 실행되는 다른 프로세스에 대한 이해/접근이 거의 없기 때문에 외부 공격자가 더 어려울 것.
    2. File-System Isolation
        1. 컨테이너는 파일 시스템 격리가 필수가 되는 호스트 파일 시스템의 일부를 안전하게 공유해야 함
        2. 리눅스 컨테이너는 호스트와 컨테이너 사이의 마운트를 분리하여 파일 시스템 격리를 위해 마운트 네임스페이스를 사용함.
        3. 이 리눅스 시스템에 따라 새 마운트 네임스페이스 내에 컨테이너가 생성되고 내부 마운트 이벤트는 특정 컨테이너 내에서 활성화
        4. 컨테이너 내의 모든 탑재 이벤트가 함께 배치된 다른 컨테이너의 다른 이벤트에 영향을 미치도록 제한하여 격리를 제공
        5. Docker는 언급된 파일 시스템에 대한 쓰기 권한을 컨테이너에서 제거하고 모든 컨테이너 프로세스가 컨테이너에서 CAP_SYS_ADMIN 권한을 제거하여 컨테이너 내의 모든 파일 시스템을 다시 마운트하도록 제한하여 문제를 완화함.
        6. Linux VServer는 Secure chroot 장벽을 사용함
        7. FreeBSD Jails 및 Solaris Zone은 다른 allow mount 옵션을 허용하거나 컨테이너 내부 프로세스 컨테이너 내에서 파일 시스템을 마운트/해제하는 것을 제한하여 chroot() 사용함
        8. LXC는 호스트 파일 시스템은 영향을 받지 않게하고, chroot()를 사용하여 격리함. 또한 pivot_root 사용하여 임시 루트 파일 시스템에서 이전 루트로 마운트 지점을 변경하기 위해 부팅하는 동안 사용. 마운트 지점을 이전 루트에서 새 루트 파일 시스템 아래의 디렉토리로 이동할 수 있음
        9. 컨테이너별 파일 시스템 격리를 제공하는 네임스페이스 내에서 마운트하는 동안 이전 루트 파일 시스템을 마운트 해제할 수 있음.
    3. Device Isolation
        1. UNIX 계열 OS의 경우 장치를 부적절하게 공유하는 장치가 심각한 보안 위협으로 이어 질 수 있으므로 호스트 장치 드라이버에 인터페이스를 제공하는 특별한 보안에 민감한 파일로 취급
        2. 리눅스에서 udevd 데몬 프로세스가 커널에서 이벤트를 수신할 때 mknod 시스템 호출을 발행함
        3. /dev/mem, /deb/sd*, /dev/tty, /dev/kmem 등과 같은 중요한 장치를 사용하는 기본 권한이 있는 컨테이너는 장치를 격리를 시행하기 유리하다.
        4. 안전한 세트 장치만 허용하여 컨테이너 격리를 유지
        5. 가상 터미널, 가상 네트워크 인터페이스 등과 같은 순수 가상 장치는 개별 컨테이너에 대해 명시적으로 생성되어야 하며 컨테이너 간에 공유되어서는 안됨
        6. 상태 비저장 장치는 상태 비저장 특성으로 인해 컨테이너와 호스트 간에 안전하게 공유
        7. 셀은 장치 네임스페이스를 사용하여 장치 격리를 구현
        8. Docker는 장치 세트를 제한하는 장치 화이트리스트 컨트롤러 기능을 사용하여 장치 격리를 구현
    4. IPC Isolation
        1. IPC는 프로세스 간 데이터 공유를 위해 정의된 일련의 규칙(세마포어, 공유 메모리 등과 같은 기존 SysV IPC 프리미티브)으로 볼 수 있음.
        2. IPC 격리는 미리 정의된 IPC 리소스 집합을 통해서만 컨테이너에서 실행되는 프로세스 간의 통신을 제어하고 프로세스가 같은 위치에 있는 다른 컨테이너 및 호스트의 데이터를 수정하지 못하도록 제한하는데 필요함.
        3. IPC 격리는 컨테이너별 IPC 네임스페이스를 사용하여 Linux 컨테이너에서 구현되며, 여기서 IPC 네임스페이스 내의 프로세스는 다른 리소스의 읽기 쓰기가 금지 됨.
        4. Cell on Binder System의 네임스페이스 지원이 필요함.
        5. 이를 위해 IPC 네임스페이스별 컨텍스트 관리자가 생성되어 다양한 컨테이너 간에 완전한 바인더 주소 격리를 제공하는 특정 네임스페이스 내에서 바인더 주소를 확인함.
    5. Network Isolation
        1. 다양한 네트워크 기반 공격으로부터 보안을 위해 격리가 필요함.
        2. 네트워크 스택의 가상화는 서버 통합 및 리소스 관리를 위해 종종 필요함
        3. FreeBSD Jail 및 Linux-VServer는 바인드  필터링을 사용하여 레이어 3에서 네트워크 격리를 구현
        4. 이 필터링은 컨테이너 내에서 bind() 호출을 지정된 IP 주소 세트로 제한하여 데이터 송수신.
        5. Solaris Zones 및 OpenVZ는 모든 개별 컨테이너에 대해 Layer 3 VNI(가상 네트워크 인터페이스)를 제공하는 네트워크 격리
        6. Docker는 네트워크 인터페이스 간에 패킷을 자동으로 전달하는 호스트 시스템에서 docker0라는 가상 이더넷 브릿지를 생성하는 네트워크 네임스페이스를 사용하여 네트워크 격리를 구현함
    6. Resource Limiting
        1. Dos 공격을 방지하기 위해 개별 컨테이너에 할당되고 사용 가능한 물리적인 리소스에 합리적인 제한을 부과해야함
        2. Docker는 CPU, RAM, I/O, 장치 등과 같은 다양한 물리적 리소스를 제어하기 위해 cgroup을 사용함
        3. 특정 컨테이너가 모든 시스템 리소스를 소모하는 것을 방지함
        4. LXC, Linux-VServer, OpenVZ 및 Cells도 리소스 제한을 위해서 cgroup 메커니즘 사용
        5. FreeBSD, Jails는 미리 정의된 리소스 제한이 초과된 동안 새 리소스 할당, 신호 또는 알림(SIGHUP, SIGKILL 등) 전송 중지와 같은 작업을 정의하는 계층적 리소스 제한을 사용하여 개별 감옥 리소스 제한을 구현
        6. Solaris 영역은 개별 영역에 대한 물리적 프로세서 세트와 같은 자원 세트를 정의할 수 있는 자원 풀이라고 하는 자원 분할 기술을 사용
        7. 사용자 지정 리소스 관리 확장은 OpenVZ 및 Linux-VServer에서 구현 됨
    7. Advanced Linux Security Modules
        1. 기존 Linux 및 POSIX ACL DAC 구현에 MAC을 부과하여 컨테이너 보안을 강화하는 리눅스 보안 모듈이 있다. 
        2. DAC는 읽기 / 쓰기 / 실행을 위해 요청된 파일의 프로세스 UID 및 GID를 확인 비교하여 각 소유자에게 모든 시스템 개체에 대한 재량권 제공함. 
        3. 또한 DAC에서 개체에 대한 제어는 특정 액세스 권한이 있는 주체가 다른 주체에게 권한을 전달할 수 있도록 임의적인 것으로 처리 됨.
        4. 따라서 모든 계정 내 개체에 대한 완전한 제어는 계정이 약속되는 즉시 적으로 간주함
        5. 최신 리눅스 커널은 MAC 또는 DAC를 통한 정책 기반 액세스 제어 계층을 구현하여 DAC에 제약을 추가함
        6. 종류 : SELinux, AppArmor, Seccomp, grsecurity와 같은 고급 모듈이 있음.
    8. Few Best Practices for Maintaining Container Security
        1. 신뢰 할 수 있는 컨테이너 이미지 사용
        2. 컨테이너 Secret 관리 → 시크릿은 관련있는 컨테이너만 운영중에 접근이 가능하도록 해야함. 외부에 노출되는 곳에 저장 등 금지
        3. 운영환경에서 보안 → 항상 namespace와 cgroups를 사용해서 고립화해서 필요한 것만 접근할 수 있도록
        4. 취약점 스캐닝
        5. MAC 사용 권장
            1. DAC : Discretionary Access Control
            2. MAC : Mandatory Access Control
            
            [접근 통제(Access Control) 와 DAC/MAC](https://www.lesstif.com/ws/access-control-dac-mac-43843837.html)
            
        6. 컨테이너 실행 시 non-root로 기동해야 된다.
7. 산업에서 핵심 커테이너 어플리케이션
    1. 포켓몬고는 쿠버네티스 클러스터를 사용한 구글 클라우드 플랫폼에서 구동함. 50x 트래픽이 발생하는데, 쿠버네티스를 사용하여 백만유저에 대해서 효율적으로 서비스를 제공함
    2. 헬스케어 분야에서 컨테이너화. 의료 환경에서 사물 클라우드의 엔드 포인트이자 사용자 데이터 표시를 위한 게이트웨이로서 컨테이너가 사용됨.
    3. 네트워크 기능 가상화에서의 컨테이너화. 라우팅, 스위칭, 방화멱 등과 같은 다양한 기능에서 NFV가 트렌딩한 컨셉이다. (NFV는 네트워크 기능을 추상화하여 표준화된 컴퓨팅 노드에서 실행되는 소프트웨어를 통해 네트워크 기능을 설치, 제어 및 조작하도록 지원하는 것) 
    4. 마이크로서비스 아키텍처에서의 컨테이너화. 운영과 개발 간의 갈등을 억제할 수 있으며, 모놀리딕 아키텍처를 마이크로서비스로 마이그레이션하면 적응성, 기술 종속성, 시장 배포 시간 단축 등이 가능.
    5. Scientific -Workflow에서 컨테이터화. 과학적 워크플로는 시스템 마다 차이가 있고, 내외부 종속성 비호환성으로 인해 복제되지 않을 수 있는 특정 구성과 OS별 라이브러리가 필요함. 격리된 컨테이너는 광범위한 컴퓨팅 플랫폼에 효율적으로 배포할 수 있는 독립형 환경 제공.
    6. EC(Edge Computing) 컨테이너화. 높은 대기 시간, 네트워크 지연, 병목현상은 클라우드 컴퓨팅의 잠재적인 문제로 간주 되는데, 이에 대해 중앙 집중식 패러다임에서 분산형 패러다임으로의 전환이 필요한데 여기서 컨테이너가 사용됨.
    7. 다른 어플레케이션에서 컨테이너화.
8. 도전과제와 미래 트렌드 예측 ( 컨테이너에 대해서 )
    1. Complex Networking : 컨테이너는 확장성을 위해 생성 및 삭제가 되는데, 그럴 경우 아래의 문제 발생
        1. 여러 컨테이너 인스턴스에 동일한 IP 주소를 할당할 가능성이 높은 대규모 컨테이너 배포 시 IP를 고유 식별자로 사용할 수 없어서 문제가 발생 될 수 있음. → 유지관리의 어려움 증가
        2. IP 주소 할당이 동시 요청으로 일어날 때 IP 충돌 가능성이 있음. → 가능한 해결책은 VM 내에 컨테이너를 생성하고 VM IP 주소와 컨테이너 포트 번호를 결합하여 각  컨테이너에 고유 식별자를 할당
        3. NAT로 네트워크를 연결하는 경우 트러블슈팅을 어렵게 만들 수 있음. → LAN을 공유하고 DHCP 서버에서 IP 주소를 얻거나 고정 LAN 주소를 제공하여 호스트 네트워크 인터페이스에 컨테이너를 직접 연결하여 해결. → NAT는 호스트 시스템을 컨테이너에 접두사를 라우팅할 수 있는 가상 라우터로 전환하여 IP 주소를 컨테이너의 고유 식별자로 사용함으로써 피할 수 있음. 이 구성은 덜 복잡하지만 모든 레이어 4포트가 노출되기 떄문에 보안 손상 가능성이 있음. 또 랙에 있는 컨테이너의 수가 증가함에 따라 ToR의 Layer 2 포워딩 테이블에 있는 MAC 주소의 수도 증가하여 트래픽 스위칭을 방해할 수 있음
    2. Complex Orchestration & Management : 컨테이너 오케스트레이션은 다음과 같은 과제에 대한 축 연구가 필요함
        1. 모니터링, 프로파일링 및 특성화 : 컨테이너 환경에 대한 QoS 메트릭에 대한 합의 된 정의가 없음
        2. 성능 모델 : 분산 컨테이너화 어플리케이션을 위한 효율적인 성능 검증 및 에너지 소비 모델이 필요함
        3. 컨테이너 오케스트레이션을 위한 적용 모델 : 오케스트레이션을 위한 QoS 인식, 에너지 인식 및 법규 인식 최적 적응을 위한 강력한 컨테이너 오케스트레이션 프레임워크가 필요함 
        4. 복잡한 수명 주기 관리 : 상태 저장 분산 서비스에 여러 종속서이 있는 복잡한 배포 단계에 신경쓸게 많다. ( 쿠버네티스 배포에는 21단계가 있다. )
        5. 리소스 할당 및 활용 : 최적화가 잘 안됨.
        6. 멀티내넌시 : 다중 테넌트 구성에서 특정 테넌트가 자원을 독점하거나 가로채는 행위에 대한 것을 감시/방지 할 필요가 있으며, 개인정보 침해 문제에 대해서도 관리가 필요함
    3. Persistent Storage : 영구 스토리지의 정의는 컨테이너 수명이 끝난 뒤에도 영구적으로 계속 사용이 가능한 스토리지
        1. 상태 비저장 컨테이너가 수명이 매우 짧기 때문에 영구 저장소( 가령 디비 )와 관련하여 상태 저장 어플리케이션처럼 작동 할 수 없음. 거대하고 복잡한 저장소 스택을 제공하면 경합이 발생 할 수 있음. 이는 경량화의 경량 기능을 방해할 수 있음. 예를 들어 데이터 볼륨을 새로운 스핀업 컨테이너 또는 기존 실행 중인 컨테이너에 연결 할 수 없으므로 볼륨이 소비하는 리소스가 활용되지 않아 최적의 솔루션이 아닐 수 있음
        2. 영구 저장소 관리 문제 : 컨테이너가 자주 생성 및 삭제되면 사용 중인 데이터를 추적하기가 어려움 → 저장 매체에 접근하는 어플리케이션을 위한 병렬 시스템 구축이 필요함
        3. 데이터 전송 문제 : 컨테이너화 내에서 영구 스토리지 유틸리티가 부족하면 위치 간 또는 클라우드에서도 안전한 데이터 전송 시 어려움이 증가 할 수 있음. 이 문제는 무한한 확장성, 상당히 높은 성능, 보안 및 완전한 애플리케이션 제어를 제공하는 강력한 도구 및 플랫폼을 사용할 수 없기 때문에 증가
        4. 시간 과 돈 : 업계에서는 막대한 시간과 비용이 필요하기 때문에 컨테이너화로 전환하는게 어려울 수 있음
    4. Cross Data Center or Mulit-Cloud Support ( 여기 번역이 매끄럽지 않음 )
        1. 하이브리드 배포 문제 : 다중 클라우드 배포는 충돌하는 하이브리드 클라우드 아키텍처, 공급업체별 장치 및 복잡한 관리와 같은 문제에 직면
        2. 통합 모니터링 솔루션 : 각 컨테이너 및 서비스가 이벤트 또는 매트릭 데이터를 일관된 API에 기록하여 통합 모니터링 솔루션을 구현할 수 있음
    5. Future Trend
        
        <aside>
        🔥 앞으로의 트렌드는 컨테이너에서 한층더 경량화 된 모델들로, 유니커널, 마이크로커널, Light VM 등이 있을 것이다. 쉽게 생각하면 도커 대신에 유니커널 같은게 올라간다는 의미임. 도커 등 컨테이너들은 추상화 목적으로 레이어가 추가되는데, 이런부분에서 동작하는 런타임과 각종 인터페이스들이 복잡해지고 이런 부분들에서 보안, 고립화 등을 깨기 때문에 컨테이너의 형태자체가 다양한 형태로 변화되는 의미.
        
        </aside>
        
        1. Unikernels ( 유니커널의 개념을 먼저 이해하자 - MirageOS는 유니커널의 종류임 )
            
            ![Untitled (11)](https://user-images.githubusercontent.com/91730236/191913771-8b076d7d-e809-4847-9243-85b6b0db1a2d.png)
            
            <aside>
            🔥 유니커널이란 ?
            유니커널 시스템즈 ( [Unikernel.org](http://unikernel.org/))에 따르면 “유니커널은 특정 응용프로그램에 특화 된, 단일 주소공간을 사용하고 라이브러리 운영체제의 방식으로 생성한 시스템 이미지”
            
            유니커널 = 이미지
            
            유니커널 특징( 장점 )
            - 단일 주소공간을 사용한다는 점. 커널모드와 유저모드간에 같은 권한레벨을 사용하기 때문에 인터럽트 등 발생 시 context switching이 발생하지 않음. 시스템콜 또한 함수 호출 방식을 사용하기 때문에 context switching이 발생하지 않음
            - 클라우드 환경에 적합함.
            
            단점
            - 범용적인 서비스가 아니다. 웹서버와 같은 마이크로 서비스에만 제약적으로 사용
            - 라이브러리나 운영체제가 먼저 설정이 되어야하기 때문에 유연성이 떨어짐
            - 기존에 쓰던 당연한 것들이 지원이 안되기 때문에 응용프로그램 개발도 어려움
            
            </aside>
            
            MirageOS(OCaml에 내장된 유니커널 스택)는 다양한 인터페이스를 단일 고급 언어 프레임워크로 통합하는 것을 목표로함. MirageOS는 가상의 모든 소프트웨어 계층을 허용. 부팅할 때 마다 그 계층을 동적으로 조합하는 대신, 고급 언어 프레임워크 내에서 어플라이언스를 준수하도록 함. 이는 유연하고 안전하며 재사용 가능한 모듈식 구성 요소로 재구성. 유니커널은 경량, 소형, 단일 주소 공간, 메모리 안전, 단일 목적 어플라이언스(VM)로서 독립 실행형 커널로 컴파일 타임에 특화되어 있으며 클라우 플랫폼에 배포할 때 수정되지 않도록 밀봉되어 있음. 그 대가로 이미지 크기를 크게 줄이고 효율성과 보안을 개선하며 운영 비용을 줄여야 함. 네트워크 대기 시간은 모든 클라우드 서비스에서 중요한 문제임. 이를 처리하는 방법 중 하나는 사용자 근처에 있는 로컬 서비스를 빠르게 인스턴스화하여 원격 데이터 센터 외부로 계산을 옮기는 것. 여러 애플리케이션을 안전하고 빠르게 배포 할 수 있는 임베디드 클라우드 플랫폼이 필요함. 유니커널 에지 컴퓨팅 응용 프로그램에서 jitsu는 리소스가 제한 된 임베디드 ARM 장치에 대한 안전한 다중 테넌트 격리 요구 사항을 충족. 빠른 공유 메모리 채널을 사용하여 Jitsu는 네트워크 트래픽에 대한 응답으로 유니커널을 시작하고 부팅 대기 시간을 마스킹하는 디렉터리 서비스를 제공함. 다른 IoT 에지 오프로딩 아키텍처에서 Cozzolino etal은 MirageOS 유니커널을 활요하여 간결한 Xen 부팅 이미지에 애플리케이션 로직을 격리하고 포함함.유티 커널을 채택한 모티프는 각각 전체 애플리케이션과 더 나은 보안을 오프로드하지 않는 단일 목적 작업이기 때문. 유니커널은 경량 컨테이너보다 더 나은 보안 및 격리를 제공하며 많은 경우에 매우 작은 디스크 및 메모리 공간, 미세한 스핀 업/다운 시간, 효율적인 비동기 I/O, 다음을 포함하는 OS 라이브러리와 같은 필수 기능을 효율적으로 제공함. 그러나 유니커널에 피룡한 인터페이스와 구현 리소스만 포함하는 작은 특수 모니터와 함께 유니커널이 번들로 제공되는 유니커널 모니터를 사용하여 유니커널의 부팅 시간 및 복잡성을 추가로 줄이는 것과 함께 업그레이드 된 보안 및 격리를 달성할 수 있음. 유니커널을 구성하기 위한 몇가지 중요한 접근방식은 속도에 중점을 둠. → ClickOS a및 LING(100ms 미만 부팅_ → 안전과 보안에 중점을 둔 MirageOS 및 halVM → 레거시 소프트웨어와 호환성에 중점을 둔 럼프 커널 및 OSv → 광범위한 리눅스 조건을 처리하기 위한 유니커널 → Micropython unikernel은 이미지 크기가 1MB이고 실행하려면 8MB의 메모리가 필요하지만 Xen 하이퍼바이저 기반 VM 이지니는 종종 1.5~3CB 사이에 있을 수 있음.
            
            - 유니커널 참고자료
                
                [유니커널.pdf](Emerging%20Trends,%20Techniques%20and%20Open%20Issues%20of%20Con%20b88f8783c5cc415e8ffbdbc9522a4421/%EC%9C%A0%EB%8B%88%EC%BB%A4%EB%84%90.pdf)
                
                [유니커널(Unikernel)](https://newzio.tistory.com/250)
                
        2. Micro Kernel : 마이크로 커널은 1980년대 초반 컴퓨터 저장 용량의 한계로 시작되었고, 마이크로커널은 프리미티브를 포함하는 최소한의 커널을 말함.
            1. 기본 시스템 IPC 프로토콜 OS를 실행하는 데 필요한 메모리 관리 기능과 같은 다른 모든 유틸리티는 사용자 모드에서 로드 됨. 다른 방법으로 여기서 주요 목표는 커널 코드를 최소화하고 다양한 유틸리티를 사용자 공간에 아웃소싱하는 것. 이러한 방식으로 코드 복잡성, 디스크 및 메모리 풋프린트를 줄이지만 커널 공간 내의 필수 보안 매커니즘을 줄이는 대가를 치르게 됨. 반대로 VMM은 프로세스 하드웨어와 매우 유사하며 다양한 기본 요소를 제공하며 각 기본 요소에는 전용 보안 매커니즘, 리소스 및 커널 코드 세트가 필요함. 일반 VMM 프리미티브는 게스트 사용자에게 게스트 커널로 또는 그 반대로 보호 도메인의 동기식 전환. 도메인 간 비동기 통신 채널, VMS내 리소스 할당, VM당 리소스 할당 자원 재할당, 페이지 폴트 및 예외 처리, 도메인 간 비동기 이벤트 수정, 하드웨어 인터럽트 수정 및 공통 장치 세트
            2. 마이크로 커널은 구너한 있는 소프트웨어의 최소 계층을 제공하는 것을 목표로하는 반면 VMM은 하드웨어 리소스 복제 및 다중화에 의존함. 최신 VMM은 더 나은 레거시 코드 지원을 제공하고 공격 표면을 줄이기 위해 사용자 공간에 드라이버를 아웃소싱함으로써 점점 더 마이크로커널과 유사해지고 있음. 반대로 마이크로 커널은 레거시 소프트웨어에 대한 더 나은 지원을 제공하기 위해 가상화도 지원함. 유니커널과 달리 마이크로커널은 하드웨어 및 소프트웨어 방화벽을 통해 서로 보호되는 여러 애플리케이션을 지원.
            3. 종류로는 F9 - ARM Cortex M 시리즈용으로 전력 효율적이고 보안에 민감한 실시간 및 임베디드 시스템 구축용, Genode - 높은 보안의 특수 목적 OS 구축을 위한 툴킷, 헬렌 OS - M3 임의 코어 지원을 목표로 함, SeL4 - 높은 보증 및 고성능 마이크로커널 등
            4. 유니커널과 마이크로커널은 모두 가벼운 기능을 제공하지만, 마이크로커널은 사용자와 커널 공간 사이의 메시지 전달 매커니즘으로 인해 해당 제품보다 약간 느릴 수 있음. 게다가 마이크로커널은 상대적으로 더 큰 메모리 풋프린트를 가지고 있음. 사용자오 ㅏ커널 공간 사이의 메시지 전달로 인해 성능이 저하될 수 있고 프로세스 관리 관점에서 유니커널보다 복잡도가 더 높음.
        3. Light VM : 일반적으로 경량 VM은 가상화 컨트롤 플레인이 성능 병목 현상이 되므로 좋은 성능을 보장할 수 없음. Light VM은 반가상화를 사용하여 격리 및 보안 개선, 부팅 시간 향상, 디스크 및 메모리 공간 감소와 같은 문제에 대한 솔루션을 제공할 수 있음. LightVM에서 Xen의 중앙제어 평면을 분산 제어 평면으로 재설계하고 하이퍼바이저와의 상호 작용을 크게 최소화함. light VM은 리눅스 fork / exec와 호환되며 종종 docker보다 더 빠른 부팅시간을 보여줌. Light VM은 포장 및 실생 가능한 하드웨어 플랫폼에서 많은 수의 경량 게스트, 어플리케이션 수준의 가상화와 결합된 LightVM은 리소스 관리자 및 리소스 스케쥴러 상위 수준 및 하위 수준에서 작동함.
        4. 기타 접근 방식 : kata 컨테이너, clear 컨테이너, Photon OS 및 Hyper는 클라우드 컴퓨팅 커뮤니티 및 산업에서 경량 가상화 매커니즘으로 받아들여지고 있음.
9. 하이퍼바이저와 경량 가상화 간 성능 비교 
    - 테스트 환경
        
        <aside>
        💡 테스트 환경
        하나 이상의 시스템 리소스가 완전히 활용되는 동안 컨테이너와 네이티브 시스템, 유니커널 및 VM의 성능을 비교하고자 함
        
        이를 위해 Random Access라는 5가지 표준 벤치마크를 사용함
        1. SysBench(CPU성능)
        2. Linpack(시스템 부동 소수점 성능 측정을 위한 숫자 집약적 테스트
        3. Iperf(네크워크 대역폭 확잉용)
        4. STREAM( 전체 캐시 계층의 지속 대역폭 측정)
        
        OS 및 컨테이너 등 테스트 환경을 구성하는 제품은 아래와 같음
        - 우분투16:04, 64비트, 커널 4.4, Intel Xoen(R) CPU E5-2690 2.6GHz(64코어), RAM 128GB, 5.4TB SSD가 있는 HP-Blade 서버를 사용하여 수행
        - Docker(v18.06.1-ce) 및 LXC/LXD(v2.0.11)의 기본 이미지는 위의 우분투
        
        Rump 커널 사용에는 RandomAcess, SysBench, LINPACK, Iperf, STREAM이라는 표준 벤치마크를 사용하여 NetBSD의 대폭 축소된 버전이 포함. 다양한 가상화 어플라이언스의 여러 인스턴스가 주요 성능에 미치는 영향 확인.
        
        위 실험에서는 cpufreq 거버너를 사용하여 전원 관리 비활성화
        
        Docker 및 LXC/LXD 컨테이너는 cgroup에 의해 제한되지 않으므로 전체 리소스 사용 가능
        
        64개의 vCPU와 32GB RAM으로 구성. 마이크로벤치마크를 사용하여 CPU, 메모리, 네트워크 및 스토리지 오버헤드를 측정
        
        </aside>
        
    1. Experiment Strategy
        1. 실험 전략
            1. ES1 : 개별 벤치마크를 실행하여 특정 타임 슬라이스에서 각 가상 어플라이언스의 단일 인스턴스(가용 시스템 리소스 활용)의 성능을 모니터링
            2. ES2 : 각 가상 어플라이언스의 여러 인스턴스에서 개별 벤치마크를 동시에 실행.
            3. 각 항목에 대해 100개의 인스턴스를 사용하였고, 각 실험을 모두 100번 수행함.
        2. 결과 요약
        
        <img width="901" alt="Untitled (12)" src="https://user-images.githubusercontent.com/91730236/191913909-5958a237-7af3-4080-8815-0a54e010fa0f.png">
        
    2. RandomAccess
    3. CPU Performance SysBench
    4. Network Bandwidth-Iperf
    5. Memory Bandwidth-stream
    6. Floating Point Rate of Execution-Linpack
    7. Summary of Experimental Outcomes & Discussions ( 아래 결과 )

### [성능 비교 결과]

- 컨테이너와 유니커널은 대부분의 실험에서 VM 대응 제품보다 성능이 우수한 것으로 확인 됨
- 세부 성능에 대한 설명은 와닿지도 않고 아직 잘 모르겠음
- 다만 산업용 애플리케이션의 꾸준한 성장을 지속하려면 컨테이너화는 안정적인 상태의 성능, 더 빠른 부팅, 가벼운 가상화 이외의 이점을 제공해야함
- 편의성, 빠르고 쉬운 배포, 탄력성의 조합 등은 중점을 두어야 하는 문제
- 아래는 향후 개선이 필요하다.
    - 교차 플랫폼 지원 부족
    - 영구 저장소 지원 부족
    - 모든 서비스에 적합하지 않음
    - 베어 메탈에 비해 속도 열등
    - 약한 격리
    - 종속성 처리
    - 도구 및 자원의 부족
    - Container Sprawl
    - 컨테이너 이식성 제한

# 3. 결론

Containerizations은 보안&격리, 매끄러운 관리와 오케스트레이션의 세부적인 기술들은 산업에 매우 유망한 기술이나 양면성을 가지고 있다.

- 장점
    - super lightweight
    - faster spin-up/down
    - efficient energy and resource utilization
    - impressive workload distribution capabilities
    - achieving server consolidation
- 단점
    - weaker isolation
    - higher chance of container sprawl
    - lack of capable tools for container orchestration and cross-platform supports and container portability limitations.

이러한 컨테이너의 장단점은 VMs의 장단점과 상충되는 관계에 있으나, 점차 VMs들도 컨테이너가 제공하는 기능들이 추가되고 더 경량화 되면서 충분히 성능이 나오고 있다.

그래서 향후 산업 전반의 컨테이너화를 적용하기 위해서는 아래 이슈에 중점을 두어야 한다.

1. development of tools and techniques to make container isolation stronger
2. development of tools for efficient container management and orchestration (although kubernetes is already emerged to be an efficient one)
3. development of tools for improving portability and cross-platform support
4. development of tools to provide persistent storage facilities for hosted applications.

---

### 참고자료

- 경량 커널
    - Reprinted from S.-J. Cha et al., “Multi-Kernel based Scalable Operating Sys-tem for Manycore Systems,” *Future Generation Inform. Technol.*
    , vol. 148, 2017, pp. 28-34
    
    ![Untitled](Emerging%20Trends,%20Techniques%20and%20Open%20Issues%20of%20Con%20b88f8783c5cc415e8ffbdbc9522a4421/Untitled%204.png)
    
- 유니커널
    
    [Unikernels](http://unikernel.org/)
    
- 마이크로커널

- veth, chroot. cgroup 등 설명 및 예제
