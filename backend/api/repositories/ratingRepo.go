package repositories

import (
	"backend/initializers"
	"backend/models"
	"backend/views"
)

func CreateRating(rating *models.Rating) error {
	initializers.DB.Create(rating)
	return nil
}

func GetRatingOutput(ratedUsername string, raterUsername string, limit int, offset int, orderBy string, order string) ([]views.RatingOutput, error) {
	var ratings []views.RatingOutput
	querySet := initializers.DB.Model(&models.Rating{}).Limit(limit).Offset(offset).Order(orderBy + " " + order)
	if raterUsername != "" {
		querySet = querySet.Where("rater_username = ?", raterUsername)
	}
	if ratedUsername != "" {
		querySet = querySet.Where("rated_username = ?", ratedUsername)
	}
	querySet.Find(&ratings)
	return ratings, nil
}
