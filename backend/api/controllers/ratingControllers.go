package controllers

import (
	"backend/models"
	"backend/service"
	"backend/views"
	"github.com/gin-gonic/gin"
	"strconv"
)

// @Summary Create a new rating
// @Description Create a new rating
// @Tags Rating
// @Accept json
// @Produce json
// @Param body body createRatingInput true "Rating"
// @Security ApiKeyAuth
// @Success 200 {string} string "Rating created"
// @Router /rating/create [post]
func CreateRating(c *gin.Context) {
	var user models.User
	var err error
	var body views.CreateRatingInput
	user = c.MustGet("user").(models.User)
	err = c.BindJSON(&body)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = service.CreateRating(user, body)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "Rating created"})
}

// @Summary Get ratings
// @Description Get ratings
// @Tags Rating
// @Accept json
// @Produce json
// @Param page query int false "Page"
// @Param per_page query int false "Per page"
// @Param order_by query string false "Order by"
// @Param order query string false "Order"
// @Param rater_username query string false "Rater username"
// @Param rated_username query string false "Rated username"
// @Security ApiKeyAuth
// @Success 200 {string} string "Ratings"
// @Router /rating/list [get]
func RatingList(c *gin.Context) {
	var ratings []views.RatingOutput
	page := c.DefaultQuery("page", "1")
	perPage := c.DefaultQuery("per_page", "10")
	orderBy := c.DefaultQuery("order_by", "created_at")
	raterUsername := c.DefaultQuery("rater_username", "")
	ratedUsername := c.DefaultQuery("rated_username", "")
	order := c.DefaultQuery("order", "desc")
	pageNum, err := strconv.Atoi(page)
	if err != nil {
		c.JSON(400, gin.H{"error": "Page must be a number"})
		return
	}
	perPageNum, err := strconv.Atoi(perPage)
	if err != nil {
		c.JSON(400, gin.H{"error": "Per page must be a number"})
		return
	}
	startIdx := (pageNum - 1) * perPageNum
	ratings, err = service.RatingList(orderBy, order, perPageNum, startIdx, raterUsername, ratedUsername)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"ratings": ratings})
}
