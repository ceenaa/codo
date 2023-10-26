package controllers

import (
	"backend/initializers"
	"backend/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"os"
	"strconv"
	"time"
)

type CreateUserRequest struct {
	Username  string `json:"username"`
	Firstname string `json:"first_name"`
	Lastname  string `json:"last_name"`
	Password  string `json:"password"`
	Role      string `json:"role"`
}
type UserLoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type UserOutput struct {
	CreatedAt   time.Time `json:"created_at"`
	ID          uint      `json:"user_id"`
	Username    string    `json:"username"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	AverageRate float64   `json:"average_rate"`
	TotalRaters uint      `json:"total_raters"`
	Role        string    `json:"role"`
}

type UserMinimalOutput struct {
	ID          uint    `json:"user_id"`
	Username    string  `json:"username"`
	FirstName   string  `json:"first_name"`
	LastName    string  `json:"last_name"`
	Role        string  `json:"role"`
	AverageRate float64 `json:"average_rate"`
}

// @Summary Create a new user account
// @Description Register a new user account with a username and password.
// @Tags Authentication
// @Accept json
// @Produce json
// @Param body body CreateUserRequest true "User credentials"
// @Success 200 {string} string "User created"
// @Router /users/signup [post]
func SignUp(c *gin.Context) {
	// GET the email/Pas off req body
	var body CreateUserRequest

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)

	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to hash password"})
		return
	}

	// Create the user
	user := models.User{
		Username:  body.Username,
		FirstName: body.Firstname,
		LastName:  body.Lastname,
		Role:      body.Role,
		Password:  string(hash),
	}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create user"})
		return
	}
	// Respond

	c.JSON(200, gin.H{"message": "User created"})
}

// @Summary User login
// @Description Log in a user with username and password.
// @Tags Authentication
// @Accept json
// @Produce json
// @Param body body UserLoginRequest true "User credentials"
// @Success 200 {string} string "User logged in"
// @Router /users/login [post]
func Login(c *gin.Context) {
	// Get the email and pass off req body
	var body UserLoginRequest

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}

	// Look up requested user
	var user models.User
	initializers.DB.First(&user, "username = ?", body.Username)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	// Compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	// Generate a go_auth token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign the token with our secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to generate token",
		})
		return
	}
	// send it back
	c.SetSameSite(http.SameSiteDefaultMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{})
}

// @Summary User logout
// @Description Log out the current user.
// @Tags Authentication
// @Produce json
// @Success 200 {string} string "User logged out"
// @Router /users/logout [get]
func Logout(c *gin.Context) {
	c.SetCookie("Authorization", "", -1, "/", "localhost", false, true)
}

// @Summary Validate user session
// @Description Check if the user is logged in and the session is valid.
// @Tags Authentication
// @Produce json
// @Success 200 {string} string "User logged in" {string} string "User role"
// @Router /users/validate [get]
func Validate(c *gin.Context) {
	var user models.User
	user = c.MustGet("user").(models.User)

	c.JSON(http.StatusOK, gin.H{
		"message":     "Im logged in",
		"role":        user.Role,
		"username":    user.Username,
		"first_name":  user.FirstName,
		"last_name":   user.LastName,
		"AverageRate": user.AverageRate,
	})
}

// @Summary Get user details
// @Description Get the details of a user.
// @Tags Users
// @Produce json
// @Param username path string true "Username"
// @Success 200 {string} string "User details"
// @Router /users/{username} [get]
// @Response 404 {string} string "User not found"
// @Response 200 {object} UserOutput "User details" {int} rank "User rank"
func UserDetails(c *gin.Context) {
	var user UserOutput
	username := c.Param("username")
	initializers.DB.Model(&models.User{}).Where("username = ?", username).First(&user)
	if user.ID == 0 {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}
	var rank int64
	initializers.DB.Model(&models.User{}).Order("average_rate desc").Where("average_rate > ?", user.AverageRate).Count(&rank)

	c.JSON(http.StatusOK, gin.H{
		"user": user,
		"rank": rank + 1,
	})

}

// @Summary Get user list
// @Description Get a list of users.
// @Tags Users
// @Produce json
// @Param order_by query string false "Order by"
// @Param order query string false "Order"
// @Param text query string false "Text"
// @Param page query int false "Page"
// @Param per_page query int false "Per page"
// @Success 200 {string} string "Users"
// @Router /users/list [get]
func UserList(c *gin.Context) {
	var users []UserMinimalOutput
	text := c.Query("text")
	orderBy := c.DefaultQuery("order_by", "average_rate")
	order := c.DefaultQuery("order", "desc")
	page := c.DefaultQuery("page", "1")
	perPage := c.DefaultQuery("per_page", "10")
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
	// search for users with text in username or first name or last name
	querySet := initializers.DB.Model(&models.User{}).Where("username LIKE ? OR first_name LIKE ? OR last_name LIKE ?", "%"+text+"%", "%"+text+"%", "%"+text+"%").Limit(perPageNum).Offset(startIdx)
	querySet.Order(orderBy + " " + order).Find(&users)

	c.JSON(http.StatusOK, gin.H{
		"users": users,
	})
}
