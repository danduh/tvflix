# Intro

In this part we will see: 
1. How to dockerize our services.
2. How to run all this together.
3. Will go over docker_compose
4. Will put everything into kubernetes
5. Check how ArgoCd can help us to manage all this.

# Prerequisites:

- docker
- docker_compose
- kubctl
- minikube
- argocd cli

# Installations:
> Original documentation is the best way :)

## Docker / docker-compose
- Windows https://docs.docker.com/desktop/windows/install/
- Mac https://docs.docker.com/desktop/mac/install/

### Let's dockerize everything...
> now we will use simple solution to dockerise our services. 
> In real world, where security, scalability and many other things are highly important, we will ask professional DevOps guys to help us. 

Let's start with gRPC, MS and GQL services.

Our docker file 

```dockerfile
# Basic node image.
FROM node:16-alpine
RUN apk --no-cache add --virtual .builds-deps build-base python3

# Port this service will listen to (3000, 3001, 5000 etc)
ARG PORT=
ENV PORT=$PORT

WORKDIR /usr/src/app

COPY package*.json ./

# Npm i with minimum things.
RUN CYPRESS_INSTALL_BINARY=0 npm i --cilent --no-audit --ignore-scripts
RUN npm rebuild grpc --force

COPY . .

# Service name we want to build
ARG SERVICE_NAME=''
ENV SERVICE_NAME=$SERVICE_NAME

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Build specific service
RUN npm run ng -- build $SERVICE_NAME

CMD node dist/apps/$SERVICE_NAME/main.js

EXPOSE $PORT
```

Now we can build our docker image:
```shell
docker build -t <Service name we want to build> --build-arg SERVICE_NAME=<Service name we want to build> -f devops/dockers/beService.Dockerfile .

docker build -t cast-grpc-ms --build-arg SERVICE_NAME=cast-grpc-ms -f devops/dockers/beService.Dockerfile .
docker build -t cast-gql --build-arg SERVICE_NAME=cast-gql -f devops/dockers/beService.Dockerfile .
docker build -t gateway-gql --build-arg SERVICE_NAME=gateway-gql -f devops/dockers/beService.Dockerfile .
docker build -t movies-ms --build-arg SERVICE_NAME=movies-ms -f devops/dockers/beService.Dockerfile .
docker build -t tvshows-ms --build-arg SERVICE_NAME=tvshows-ms -f devops/dockers/beService.Dockerfile .
```
Проверим что у нас получилось:
```shell
# will show list of all docker images on our machine
$ docker images

REPOSITORY                                                                   TAG                                                     IMAGE ID       CREATED          SIZE
tvshows-ms                                                                   latest                                                  bb00c517f9f7   4 seconds ago    1.02GB
movies-ms                                                                    latest                                                  5114316041f7   13 seconds ago   1.02GB
cast-gql                                                                     latest                                                  0983c06a6e67   23 seconds ago   1.02GB
gateway-gql                                                                  latest                                                  ae5acb84c772   40 seconds ago   1.02GB
cast-grpc-ms                                                                 latest                                                  1ab0864f013a   2 minutes ago    1.02GB
```

Now w can run it.
```shell
# Will run service inside docker with port 5100 (default), and will be accessible from host machine via port 5100
docker run -p 5100:5100 movies-ms
[Nest] 1  - 03/09/2022, 10:08:23 AM     LOG [NestFactory] Starting Nest application...
.....
[Nest] 1  - 03/09/2022, 10:08:23 AM     LOG 🚀 Application is running on: http://localhost:5100/api


# To change ports:
# Service will run on port 4444 and accessible from host, via port 5555
docker run -p 5555:4444 --env PORT=4444 movies-ms

[Nest] 1  - 03/09/2022, 10:08:23 AM     LOG [NestFactory] Starting Nest application...
.....
[Nest] 1  - 03/09/2022, 10:08:23 AM     LOG 🚀 Application is running on: http://localhost:4444/api
```



In general, we can create single docker image, with all services build in it, and pass service name during `docker run` command.
it can be useful for local development, will minimize storage usage. 

##kubectl
> Kubernetes

https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/

##minikube (for local)
> minikube is local Kubernetes, focusing on making it easy to learn and develop for Kubernetes.

https://minikube.sigs.k8s.io/docs/start/

**Install**
```bash
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

```shell
export repo='https://github.com/danduh/tvflix' # our repository
export PLATFORM_BRANCH='lessons/part-7' # required branch

# Create onebox project in cluster
#argocd proj create -f $repo/devops/argo/bootstrap/onebox-proj.yaml --upsert

# generate deploybble yaml local
 helm template argo/be-argo --set platform_branch=argo --set cluster_name=staging > deploy_consul.yaml

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
#


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
