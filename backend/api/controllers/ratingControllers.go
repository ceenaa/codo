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
	CreatedAt     string  `json:"created_at"`
	RaterUsername string  `json:"rater_username"`
	RatedUsername string  `json:"rated_username"`
	Rate          float64 `json:"rate"`
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
	rating.RatedUsername = ratedUser.Username
	rating.RaterUsername = user.Username
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
// @Param rater_username query string false "Rater username"
// @Param rated_username query string false "Rated username"
// @Security ApiKeyAuth
// @Success 200 {string} string "Ratings"
// @Router /rating/list [get]
func RatingList(c *gin.Context) {
	var ratings []RatingOutput
	page := c.DefaultQuery("page", "1")
	perPage := c.DefaultQuery("per_page", "10")
	orderBy := c.DefaultQuery("order_by", "created_at")
	raterUsername := c.DefaultQuery("rater_username", "")
	ratedUsername := c.DefaultQuery("rater_username", "")
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
	if raterUsername != "" {
		querySet = querySet.Where("rated_username = ?", raterUsername)
	}
	if raterUsername != "" {
		querySet = querySet.Where("rater_id = ?", ratedUsername)
	}
	querySet.Find(&ratings)
	c.JSON(200, gin.H{"ratings": ratings})
}

// @Summary Get recieved ratings
// @Description Get recieved ratings
// @Tags Rating
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Param page query int false "Page"
// @Param per_page query int false "Per page"
// @Param order_by query string false "Order by"
// @Param order query string false "Order"
// @Success 200 {object} RatingOutput "Ratings"
// @Router /rating/recieved/{username} [get]
func GivenRattingList(c *gin.Context) {
	var ratings []RatingOutput
	page := c.DefaultQuery("page", "1")
	perPage := c.DefaultQuery("per_page", "10")
	orderBy := c.DefaultQuery("order_by", "created_at")
	ratedUsername := c.Param("username")
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
	if ratedUsername != "" {
		querySet = querySet.Where("rated_username = ?", ratedUsername)
	}
	querySet.Find(&ratings)
	c.JSON(200, gin.H{"ratings": ratings})
}

// @Summary Get given ratings
// @Description Get given ratings
// @Tags Rating
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Param page query int false "Page"
// @Param per_page query int false "Per page"
// @Param order_by query string false "Order by"
// @Param order query string false "Order"
// @Success 200 {object} RatingOutput "Ratings"
// @Router /rating/given/{username} [get]
func RecievedRattingList(c *gin.Context) {
	var ratings []RatingOutput
	page := c.DefaultQuery("page", "1")
	perPage := c.DefaultQuery("per_page", "10")
	orderBy := c.DefaultQuery("order_by", "created_at")
	raterUsername := c.Param("username")
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
	if raterUsername != "" {
		querySet = querySet.Where("rater_username = ?", raterUsername)
	}
	querySet.Find(&ratings)
	c.JSON(200, gin.H{"ratings": ratings})
}
