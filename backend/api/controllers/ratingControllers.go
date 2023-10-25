package controllers

import (
	"backend/initializers"
	"backend/models"
	"github.com/gin-gonic/gin"
	"time"
)

type createRatingInput struct {
	Rate    float64 `json:"rate" binding:"required"`
	RatedID uint    `json:"rated_id" binding:"required"`
}

// GetRating godoc
// @Summary Get rating
// @Description Get rating
// @Tags Rating
// @Accept json
// @Produce json
// @Param body body createRatingInput true "Rating"
// @Success 200 {string} string "Rating created"
// @Router /rating [post]

func GetRating(c *gin.Context) {
	var user models.User
	user = c.MustGet("user").(models.User)
	var body createRatingInput
	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}
	if user.ID == body.RatedID {
		c.JSON(400, gin.H{"error": "You can't rate yourself"})
		return
	}
	if body.Rate < 0 || body.Rate > 5 {
		c.JSON(400, gin.H{"error": "Rate must be between 0 and 5"})
		return
	}
	var ratedUser models.User
	initializers.DB.First(&ratedUser, "id = ?", body.RatedID)
	if ratedUser.ID == 0 {
		c.JSON(400, gin.H{"error": "User not found"})
		return
	}
	var rating models.Rating
	rating.RatedID = body.RatedID
	rating.RaterID = user.ID
	rating.Rate = body.Rate
	rating.DateTime = time.Now().Format("2006-01-02 15:04:05")
	result := initializers.DB.Create(&rating)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create rating"})
		return
	}
	c.JSON(200, gin.H{"message": "Rating created"})
}
