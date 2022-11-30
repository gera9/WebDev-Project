# syntax=docker/dockerfile:1
FROM golang:1.19-alpine

WORKDIR /app

# Download necessary Go modules.
COPY go.mod go.sum ./
RUN go mod download && go mod verify

## Download development dependencies.
# Download Air and add it to path.
RUN go install github.com/cosmtrek/air@latest \
    && echo "alias air='~/go/bin/air'" >> ~/.bashrc

# Copy source code.
COPY . .

# Run by using air.
CMD [ "air", "-c", ".air.toml" ]