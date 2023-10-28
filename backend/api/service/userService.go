package service

import (
	"backend/models"
	"backend/repositories"
	"backend/views"
	"errors"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"os"
	"time"
)

func SignUp(body views.CreateUserRequest) error {

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)

	if err != nil {
		return errors.New("failed to hash password")
	}

	// Create the user
	user := models.User{
		Username:    body.Username,
		FirstName:   body.Firstname,
		LastName:    body.Lastname,
		Role:        body.Role,
		Password:    string(hash),
		AverageRate: 3.0,
		TotalRaters: 0,
		PicturePath: "media/pic/default.png",
	}
	err = repositories.CreateUser(&user)
	if err != nil {
		return err
	}
	// Respond
	return nil
}

func Login(body views.UserLoginRequest) (string, error) {
	// Look up requested user
	var user models.User
	user, err := repositories.GetUser(body.Username)
	if err != nil {
		return "", errors.New("invalid email or password")
	}

	// Compare sent in pass with saved user pass hash
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		return "", errors.New("invalid email or password")
	}

	// Generate a go_auth token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign the token with our secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		return "", errors.New("failed to generate token")
	}
	// send it back
	return tokenString, nil
}

func UserDetails(username string) (views.UserOutput, error) {
	var userOutput views.UserOutput
	userOutput, err := repositories.GetUserOutput(username)
	if err != nil {
		return userOutput, err
	}

	rank, err := repositories.GetUserRank(userOutput.AverageRate)
	if err != nil {
		return userOutput, err
	}
	userOutput.Rank = rank
	return userOutput, nil
}

func UserList(text string, orderBy string, order string, limit int, offset int) ([]views.UserMinimalOutput, error) {
	var usersMinimal []views.UserMinimalOutput
	usersMinimal, err := repositories.GetUsersMinimal(text, orderBy, order, limit, offset)
	if err != nil {
		return nil, err
	}
	return usersMinimal, nil
}
