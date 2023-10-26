package routes

import (
	"backend/controllers"
	middleware "backend/middlewares"
	"github.com/gin-gonic/gin"
)

func InitializeRatingRoutes(router *gin.RouterGroup) {
	ratingGroup := router.Group("/rating")
	{
		ratingGroup.POST("/create", middleware.RequireAuth, controllers.CreateRating)
		ratingGroup.GET("/list", controllers.RatingList)
		ratingGroup.GET("/received/:username", controllers.ReceivedRattingList)
		ratingGroup.GET("/given/:username", controllers.GivenRattingList)
	}
}
