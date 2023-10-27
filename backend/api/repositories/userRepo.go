package repositories

import (
	"backend/initializers"
	"backend/models"
	"backend/views"
	"errors"
)

func CreateUser(user *models.User) error {
	initializers.DB.Create(user)
	return nil
}

func UpdateUser(user *models.User) error {
	initializers.DB.Save(user)
	return nil
}

func GetUser(username string) (models.User, error) {
	var user models.User
	initializers.DB.First(&user, "username = ?", username)
	if user.ID == 0 {
		return user, errors.New("user not found")
	}
	return user, nil
}

func GetUserOutput(username string) (views.UserOutput, error) {
	var user views.UserOutput
	initializers.DB.Model(&models.User{}).Where("username = ?", username).First(&user)
	if user.ID == 0 {
		return user, errors.New("user not found")
	}
	return user, nil
}

func GetUserRank(averageRate float64) (int64, error) {
	var rank int64
	initializers.DB.Model(&models.User{}).Order("average_rate desc").Where("average_rate > ?", averageRate).Count(&rank)
	rank++
	return rank, nil
}

func GetUsersMinimal(text string, orderBy string, order string, limit int, offset int) ([]views.UserMinimalOutput, error) {
	var users []views.UserMinimalOutput
	querySet := initializers.DB.Model(&models.User{}).Where("username LIKE ? OR first_name LIKE ? OR last_name LIKE ?", "%"+text+"%", "%"+text+"%", "%"+text+"%").Limit(limit).Offset(offset)
	querySet.Order(orderBy + " " + order).Find(&users)
	return users, nil
}
