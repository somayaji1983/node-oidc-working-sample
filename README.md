# node-oidc-working-sample


The reporsitory is with working sample derived from https://github.com/panva/node-oidc-provider-example. Follow below steps to start

1) Clone the repository

2) Install all dependencies
```bash
npm i
```
3) Access urls that are mentioned in testurls.txt file to test 

4) You can also pull the docker images from below command
```bash
docker pull somayaji1983/node-oidc-provider
```

5) Run the docker container
```bash
docker run -d --name oidc-provider -p 3000:3000 node-oidc-provider
```
6) User credentials are in accout.js file and alternatively you can pass use password in environment variable USER1_PASS 