package controllers

import (
	"backend/initializers"
	"backend/logic"
	"backend/models"
	"github.com/gin-gonic/gin"
	"strconv"
)

type createRatingInput struct {
	Rate          float64 `json:"rate" binding:"required"`
	RatedUsername string  `json:"rated_username" binding:"required"`
}

type RatingOutput struct {
	CreatedAt string  `json:"created_at"`
	RaterID   uint    `json:"rater_id"`
	RatedID   uint    `json:"rated_id"`
	Rate      float64 `json:"rate"`
}

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
	user = c.MustGet("user").(models.User)
	var body createRatingInput
	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}
	if user.Username == body.RatedUsername {
		c.JSON(400, gin.H{"error": "You can't rate yourself"})
		return
	}
	if body.Rate < 0 || body.Rate > 5 {
		c.JSON(400, gin.H{"error": "Rate must be between 0 and 5"})
		return
	}
	var ratedUser models.User
	initializers.DB.First(&ratedUser, "username = ?", body.RatedUsername)
	if ratedUser.ID == 0 {
		c.JSON(400, gin.H{"error": "User not found"})
		return
	}
	var rating models.Rating
	rating.RatedID = ratedUser.ID
	rating.RaterID = user.ID
	rating.Rate = body.Rate
	result := initializers.DB.Create(&rating)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create rating"})
		return
	}
	logic.UpdateUserRatings(ratedUser, body.Rate)
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
// @Param rater_id query int false "Rater ID"
// @Param rated_id query int false "Rated ID"
// @Security ApiKeyAuth
// @Success 200 {string} string "Ratings"
// @Router /rating/list [get]
func RatingList(c *gin.Context) {
	var ratings []RatingOutput
	page := c.DefaultQuery("page", "1")
	perPage := c.DefaultQuery("per_page", "10")
	orderBy := c.DefaultQuery("order_by", "created_at")
	raterID := c.DefaultQuery("rater_id", "-1")
	ratedID := c.DefaultQuery("rated_id", "-1")
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
	querySet := initializers.DB.Model(&models.Rating{}).Limit(perPageNum).Offset(startIdx).Order(orderBy + " " + order)
	if ratedID != "-1" {
		ratedIDNum, err := strconv.Atoi(ratedID)
		if err != nil {
			c.JSON(400, gin.H{"error": "Rated ID must be a number"})
			return
		}
		querySet = querySet.Where("rated_id = ?", ratedIDNum)
	}
	if raterID != "-1" {
		raterIDNum, err := strconv.Atoi(raterID)
		if err != nil {
			c.JSON(400, gin.H{"error": "Rater ID must be a number"})
			return
		}
		querySet = querySet.Where("rater_id = ?", raterIDNum)
	}
	querySet.Find(&ratings)
	c.JSON(200, gin.H{"ratings": ratings})
}
