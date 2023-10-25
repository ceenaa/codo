package routes

import (
	"backend/controllers"
	middleware "backend/middlewares"
	"github.com/gin-gonic/gin"
)

func InitializeUserRoutes(router *gin.RouterGroup) {
	userGroup := router.Group("/users")
	{
		userGroup.POST("/signup", controllers.SignUp)
		userGroup.POST("/login", controllers.Login)
		userGroup.GET("/logout", middleware.RequireAuth, controllers.Logout)
		userGroup.GET("/validate", middleware.RequireAuth, controllers.Validate)
		userGroup.GET("/:username", controllers.UserDetails)
		userGroup.GET("/list", controllers.UserList)

	}
}
