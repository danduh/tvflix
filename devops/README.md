# Installations:

##kubectl 
https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/

##minikube (for local)
https://minikube.sigs.k8s.io/docs/start/

```bash
# Install
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube

# start
minikube start

# open dashboard - WEB UI
minikube dashboard
```


## Argo CD

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

**Get UI Password**
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

**Change UI Password**

To change the password, edit the `argocd-secret` secret and update the `admin.password` field with a new bcrypt hash. You can use a site like https://www.browserling.com/tools/bcrypt to generate a new hash. For example:
```bash
kubectl -n argocd patch secret argocd-secret \
-p '{"stringData": {
"admin.password": "$2a$10$BIpNsA2NPC4WeFe.24SSt./UJ85QNUPQPI7wT.nRJtBZlCxq.D4im",
"admin.passwordMtime": "'$(date +%FT%T%Z)'"
}}'

kubectl config set-context --current --namespace=argocd
minikube start

# Forword port
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Install ArgoCD
brew install argocd

# Install HELM (Will require sudo password)
# https://helm.sh/docs/intro/install/
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```
You can navigate to https://localhost:8080

### ArgoCD CLI
```shell

```




# Create OneBox
**Generate deployment**

```shell
export repo='https://github.com/danduh/tvflix' # our repository
export PLATFORM_BRANCH='lessons/part-7' # required branch

# Create onebox project in cluster
#argocd proj create -f $repo/devops/argo/bootstrap/onebox-proj.yaml --upsert

# generate deploybble yaml local
helm template argo/be-argo --set platform_branch=argo > deploy_consul.yaml

#generate deploybble yaml against repo
helm template $repo/argo/be-argo --set platform_branch=$PLATFORM_BRANCH > deploy_consul.yaml

#create consul-app
argocd app create --file deploy_consul.yaml --upsert

# login if needed
argocd login localhost:8080 --username admin --insecure

# TODO <machine_ip> = 94.188.131.55
# argocd app set consul -p machine_ip=94.188.131.55

# sed 's/@CONSUL_DNS/94.188.131.55/g' $repo/devops/argo/bootstrap/coredns.yaml > $repo/coredns.yaml
# kubectl apply -f $repo/coredns.yaml
```

helm template devops/argo/bootstrap/consul-argo/ -f devops/argo/values-onebox.yaml --set platform_branch=argo > deploy_consul.yaml


## Adding a new Application/Services or set of applications

 - Add template to `argo/be-argo/templates`
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: <APPLICATIONS SET NAME>
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  destination:
    namespace: default
    server: https://kubernetes.default.svc
  project: default
  syncPolicy:
    automated:
      prune: true

  source:
    path: argo/be-charts/<APPLICATIONS SET NAME>
    repoURL: https://github.com/danduh/tvflix
    targetRevision: {{ .Values.platform_branch }}
    helm:
      valueFiles:
        - ../../values-{{ .Values.cluster_name }}.yaml

```
- Create folder in `argo/be-charts/<APPLICATIONS SET NAME>`
  - `templates`
    - `<ApplicationNAme>.yaml`
  - `Charts.yaml`
  - `values.yaml`


_ApplicationName.yaml_

```yaml 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <ApplicationName>
spec:
  replicas: 1
  revisionHistoryLimit: 3
  selector:
    matchLabels:
      app: <ApplicationName>
  template:
    metadata:
      labels:
        app: <ApplicationName>
    spec:
      containers:
        - image: docker.io/danielostrovsky/tvflix-ui:latest
          name: <ApplicationName>
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: <ApplicationName>
spec:
  ports:
    - port: 8099
      targetPort: 80
  selector:
    app: <ApplicationName>

```

## PORTs

| Service Name | PORT | required |   |   |
|--------------|------|----------|---|---|
| cast-grpc-ms | 5000 | Yes      |   |   |
| movies-ms    | 5100 | Yes      |   |   |
| tvshows-ms   | 5101 | Yes      |   |   |
