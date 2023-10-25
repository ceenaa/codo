package main

import (
	"backend/initializers"
	middleware "backend/middlewares"
	"backend/routers"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.SyncDataBase()
}

// @title Swagger Example API
// @version 1
// @description This is a sample server Petstore server.

// @host localhost:8080
// @BasePath /api/
func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	apiGroup := r.Group("/api")
	routers.InitializeUserRoutes(apiGroup)
	routers.InitializeDocsRoutes(apiGroup)

	// swagger

	// run of 8000
	r.Run()
}
