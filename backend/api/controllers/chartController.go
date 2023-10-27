package controllers

import (
	"backend/models"
	"backend/service"
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
	var err error
	charts, err = service.ChartDetails(user.Username)
	if err != nil {
		c.JSON(400, gin.H{"message": "Error while getting chart details"})
		return
	}
	c.JSON(200, gin.H{"charts": charts})
}
