FROM ubuntu
# RUN apt-get update -y \
#     && apt install nodejs -y \
#     && apt install npm -y \
#     && apt install python3 -
RUN mkdir oidc-provider && chmod 755 oidc-provider && cd oidc-provider
COPY src src
COPY node_modules node_modules
COPY node-v14-16 node14

#RUN ./npm i 
#RUN python3 -m http.serve 8080
#RUN while true; do echo "hello"; sleep 1; done;
CMD node14/bin/node /src/index.js
