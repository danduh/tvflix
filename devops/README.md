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

**Change UI PAssword**

To change the password, edit the `argocd-secret` secret and update the `admin.password` field with a new bcrypt hash. You can use a site like https://www.browserling.com/tools/bcrypt to generate a new hash. For example:
```bash
kubectl -n argocd patch secret argocd-secret \
-p '{"stringData": {
"admin.password": "$2a$10$BIpNsA2NPC4WeFe.24SSt./UJ85QNUPQPI7wT.nRJtBZlCxq.D4im",
"admin.passwordMtime": "'$(date +%FT%T%Z)'"
}}'
```
kubectl config set-context --current --namespace=argocd


```bash
minikube start
```


# Install HELM

https://helm.sh/docs/intro/install/

Will require sudo password

```shell
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

# Create OneBox


**Generate deployment for consul**

```shell
kubectl create namespace consul
export repo='https://github.com/danduh/tvflix' # our repository
export PLATFORM_BRANCH='lessons/part-7' # required branch

# Create onebox project in cluster
argocd proj create -f $repo/devops/argo/bootstrap/onebox-proj.yaml --upsert

#generate deploybble yaml
helm template $repo/devops/argo/bootstrap/consul-argo/ -f $repo/devops/argo/values-onebox.yaml --set platform_branch=$PLATFORM_BRANCH > deploy_consul.yaml

#create consul-app
argocd app create --file deploy_consul.yaml --upsert

# TODO <machine_ip> = 94.188.131.55
argocd app set consul -p machine_ip=94.188.131.55

sed 's/@CONSUL_DNS/94.188.131.55/g' $repo/devops/argo/bootstrap/coredns.yaml > $repo/coredns.yaml
kubectl apply -f $repo/coredns.yaml
```
