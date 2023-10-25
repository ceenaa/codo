package controllers

import (
	"backend/initializers"
	"backend/logic"
	"backend/models"
	"github.com/gin-gonic/gin"
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
