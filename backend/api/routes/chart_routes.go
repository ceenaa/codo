package routes

import (
	"backend/controllers"
	"github.com/gin-gonic/gin"
)

func InitializeChartRoutes(router *gin.RouterGroup) {
	chartGroup := router.Group("/chart")
	{
		chartGroup.GET("/list/:username", controllers.ChartDetails)
	}
}
