package logic

import (
	"backend/initializers"
	"backend/models"
)

func UpdateUserRatings(user models.User, rate float64) {
	var total = user.AverageRate * float64(user.TotalRaters)
	total += rate
	user.TotalRaters++
	user.AverageRate = total / float64(user.TotalRaters)
	initializers.DB.Save(&user)
}
