package controllers

import (
	"backend/models"
	"backend/service"
	"backend/views"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

// @Summary Create a new user account
// @Description Register a new user account with a username and password.
// @Tags Authentication
// @Accept json
// @Produce json
// @Param body body views.CreateUserRequest true "User credentials"
// @Success 200 {string} string "User created"
// @Router /users/signup [post]
func SignUp(c *gin.Context) {
	// GET the email/Pas off req body
	var body views.CreateUserRequest

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}

	err := service.SignUp(body)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "User created"})
}

// @Summary User login
// @Description Log in a user with username and password.
// @Tags Authentication
// @Accept json
// @Produce json
// @Param body body views.UserLoginRequest true "User credentials"
// @Success 200 {string} string "User logged in"
// @Router /users/login [post]
func Login(c *gin.Context) {
	// Get the email and pass off req body
	var body views.UserLoginRequest

	if c.Bind(&body) != nil {
		c.JSON(400, gin.H{"error": "Fields to read body"})
		return
	}
	tokenString, err := service.Login(body)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
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
// @Response 200 {object} views.UserOutput "User details" {int} rank "User rank"
func UserDetails(c *gin.Context) {
	var user views.UserOutput
	var err error
	username := c.Param("username")
	user, err = service.UserDetails(username)
	if err != nil {
		c.JSON(404, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": user,
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
	var users []views.UserMinimalOutput
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

	users, err = service.UserList(text, orderBy, order, perPageNum, startIdx)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"users": users,
	})
}
