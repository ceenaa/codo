# How to set up the project in dev mode baremetal

## Install dependencies

```
go mod download
```
## create .env file

```
cp .env.example .env
```
then fill the .env file with your own values

## Run the project

```
go run main.go
```

# Swagger

```
http://localhost:8080/api/docs/index.html
```
