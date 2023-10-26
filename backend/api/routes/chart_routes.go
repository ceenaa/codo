package routes

import (
	"backend/controllers"
	middleware "backend/middlewares"
	"github.com/gin-gonic/gin"
)

func InitializeChartRoutes(router *gin.RouterGroup) {
	chartGroup := router.Group("/chart")
	{
		chartGroup.GET("/list", middleware.RequireAuth, controllers.ChartDetails)
	}
}
