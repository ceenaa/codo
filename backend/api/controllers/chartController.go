package controllers

import (
	"backend/models"
	"backend/service"
	"github.com/gin-gonic/gin"
)

// ChartDetails godoc
// @Summary Get chart details
// @Description Get chart details
// @Tags Chart
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Security ApiKeyAuth
// @Success 200 {object} object "Chart details"
// @Router /chart/list/{username} [get]
func ChartDetails(c *gin.Context) {
	username := c.Param("username")
	var charts []models.ChartModel
	var err error
	charts, err = service.ChartDetails(username)
	if err != nil {
		c.JSON(400, gin.H{"message": "Error while getting chart details"})
		return
	}
	c.JSON(200, gin.H{"charts": charts})
}
