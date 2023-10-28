package service

import (
	"backend/models"
	"backend/repositories"
	"backend/views"
	"errors"
)

func UpdateUserRatings(user models.User, rate int) error {
	TotalRaters := user.TotalRaters
	if TotalRaters == 0 {
		TotalRaters = 1
	}
	var total = user.AverageRate * float64(TotalRaters)
	total += float64(rate)
	user.AverageRate = total / float64(user.TotalRaters)
	err := repositories.UpdateUser(&user)
	if err != nil {
		return err
	}
	return nil
}

func CreateRating(user models.User, body views.CreateRatingInput) error {
	if user.Username == body.RatedUsername {
		return errors.New("you can't rate yourself")
	}
	if body.Rate < 0 || body.Rate > 5 {
		return errors.New("rate must be between 0 and 5")
	}
	var ratedUser models.User
	ratedUser, err := repositories.GetUser(body.RatedUsername)
	if err != nil {
		return err
	}
	var rating models.Rating
	rating.RatedUsername = ratedUser.Username
	rating.RaterUsername = user.Username
	rating.Rate = body.Rate
	err = repositories.CreateRating(&rating)
	if err != nil {
		return err
	}
	err = UpdateUserRatings(ratedUser, body.Rate)
	if err != nil {
		return err
	}
	return nil
}

func RatingList(orderBy string, order string, limit int, offset int, raterUsername string, ratedUsername string) ([]views.RatingOutput, error) {
	var ratings []views.RatingOutput
	ratings, err := repositories.GetRatingOutput(ratedUsername, raterUsername, limit, offset, orderBy, order)
	if err != nil {
		return nil, err
	}
	return ratings, nil
}
