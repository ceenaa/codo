package repositories

import (
	"backend/initializers"
	"backend/models"
)

func GetChartsPoint(username string) ([]models.ChartModel, error) {
	var charts []models.ChartModel
	initializers.DB.Model(&models.ChartModel{}).Where("username = ?", username).Order("Date asc").Find(&charts)
	return charts, nil
}
