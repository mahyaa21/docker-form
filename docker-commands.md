# commands

## create a docker network
docker network create mongo-network

## start mongodb
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=mahya \
-e MONGO_INITDB_ROOT_PASSWORD=123456 \
--net mongo-network \
--name mongodb \
mongo

## start mongo-express
docker run -d \
-p 8081:8081
-e ME_CONFIG_MONGODB_ADMINUSERNAME=mahya
-e ME_CONFIG_MONGODB_ADMINPASSWORD=123456
-e ME_CONFIG_MONGODB_SERVER=mongodb
--net mongo-network
--name mongo-express
mongo-express






