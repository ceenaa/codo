package service

import (
	"backend/initializers"
	"backend/models"
	"backend/repositories"
	"time"
)

func UpdateChartTable() {
	duration := 24 * time.Hour
	currentTime := time.Now()
	targetTime := currentTime.Add(duration)

	var users []models.User
	initializers.DB.Model(&models.User{}).Find(&users)
	for _, user := range users {
		var chart models.ChartModel
		chart.Date = time.Date(currentTime.Year(), currentTime.Month(), currentTime.Day(), 0, 0, 0, 0, time.UTC)
		chart.Username = user.Username
		chart.AverageRate = user.AverageRate
		initializers.DB.Create(&chart)
	}
	time.Sleep(targetTime.Sub(currentTime))
	UpdateChartTable()
}

func ChartDetails(username string) ([]models.ChartModel, error) {
	user, err := repositories.GetUser(username)
	if err != nil {
		return nil, err
	}
	var charts []models.ChartModel
	charts, err = repositories.GetChartsPoint(user.Username)
	if err != nil {
		return charts, err
	}
	return charts, nil
}
