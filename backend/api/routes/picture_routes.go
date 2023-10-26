package routes

import (
	"backend/controllers"
	middleware "backend/middlewares"
	"github.com/gin-gonic/gin"
)

func InitializePictureRoutes(router *gin.RouterGroup) {
	pictureGroup := router.Group("/picture")
	{
		pictureGroup.POST("/upload", middleware.RequireAuth, controllers.UploadPicture)
	}
}
