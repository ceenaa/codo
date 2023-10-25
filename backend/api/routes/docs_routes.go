package routes

import (
	_ "backend/docs"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func InitializeDocsRoutes(router *gin.RouterGroup) {
	docsGroup := router.Group("/docs")
	{
		docsGroup.GET("/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	}
}
