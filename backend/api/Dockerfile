FROM golang:1.21

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .
RUN go build -o /go/bin/api

CMD ["/go/bin/api"]

EXPOSE 8080

