package initializers

import "backend/models"

func SyncDataBase() {
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		panic("Error in migrating User")
	}
	err = DB.AutoMigrate(&models.Rating{})
	if err != nil {
		panic("Error in migrating Rating")
	}
	err = DB.AutoMigrate(&models.ChartModel{})
	if err != nil {
		panic("Error in migrating ChartModel")
	}
}
