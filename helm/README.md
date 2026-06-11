# Db4fresh Helm Chart

This Helm chart deploys the Db4fresh backend and frontend services to a Kubernetes cluster.

## Prerequisites
- A Kubernetes cluster (e.g., EKS, GKE, AKS)
- Helm 3 installed locally
- Docker image built and pushed to Docker Hub (the CI pipeline does this automatically)

## Installing the chart
```bash
helm repo add db4fresh https://example.com/charts   # optional if you host the chart
helm install db4fresh ./helm \
  --set image.repository=${DOCKERHUB_USERNAME}/db4fresh \
  --set image.tag=latest
```

## Values
- `image.repository`: Docker Hub repository name
- `image.tag`: Image tag to deploy (defaults to `latest`)
- `backend.replicaCount`: Number of backend pods
- `frontend.replicaCount`: Number of frontend pods
- Service types can be adjusted in `backend.service.type` and `frontend.service.type`.

## Uninstall
```bash
helm uninstall db4fresh
```
