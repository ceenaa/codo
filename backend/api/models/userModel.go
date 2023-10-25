package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username        string `gorm:"unique"`
	FirstName       string `gorm:"NOT NULL"`
	LastName        string `gorm:"NOT NULL"`
	AverageRate     float64
	TotalRaters     uint
	RecievedRatings []Rating `gorm:"foreignKey:RatedID"`
	GivenRatings    []Rating `gorm:"foreignKey:RaterID"`
	Password        string   `gorm:"NOT NULL" json:"-"`
	Role            string   `gorm:"NOT NULL" Default:"user"`
}
