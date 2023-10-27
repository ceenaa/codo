package service

import (
	"backend/models"
	"backend/repositories"
	"fmt"
	"time"
)

func UpdateChartTable() {
	duration := 2 * time.Second
	currentTime := time.Now()
	targetTime := currentTime.Add(duration)

	//var users []models.User
	//initializers.DB.Model(&models.User{}).Find(&users)
	//for _, user := range users {
	//	var chart models.ChartModel
	//	chart.Date = time.Now()
	//	chart.Username = user.Username
	//	chart.AverageRate = user.AverageRate
	//	initializers.DB.Save(&chart)
	//}
	fmt.Println("ASSF")
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
