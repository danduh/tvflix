# Installations:

##kubectl 
https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/

##minikube
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


## Argo WorkFlow

```bash
kubectl create namespace argocd
```

UI Password
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
