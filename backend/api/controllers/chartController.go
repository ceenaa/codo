package controllers

import (
	"backend/initializers"
	"backend/models"
	"github.com/gin-gonic/gin"
)

// ChartDetails godoc
// @Summary Get chart details
// @Description Get chart details
// @Tags chart
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Success 200 {object} object "Chart details"
// @Router /chart/list [get]
func ChartDetails(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	var charts []models.ChartModel

	// get charts between start date and end date
	initializers.DB.Model(&models.ChartModel{}).Where("username = ?", user.Username).Order("Date asc").Find(&charts)

	c.JSON(200, gin.H{"charts": charts})
}
