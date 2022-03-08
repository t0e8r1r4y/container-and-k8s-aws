##### 간단한 트러블 슈팅

1. 도서에서 kind: pod라고 되어 있었음  

       Error from server (BadRequest): error when creating "kubia-liveness-probe.yaml": pod in version "v1" cannot be handled as a Pod: no kind "pod" is registered for version "v1" in scheme "k8s.io/kubernetes/pkg/api/legacyscheme/scheme.go:30"  
       해당 에러에 대해서 찾아보니 pod가 아닌 Pod로 명시해야 함
       
       
2. httpGet: 들여쓰기 실패

       error: error validating "kubia-liveness-probe.yaml": error validating data: ValidationError(Pod.spec.containers[0]): unknown field "httpGet" in io.k8s.api.core.v1.Container; if you choose to ignore these errors, turn validation off with --validate=false
       livenessProbe:에 들여쓰기로 하단에 붙어야함 
