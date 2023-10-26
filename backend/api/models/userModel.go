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
	RecievedRatings []Rating `gorm:"foreignKey:RatedUsername"`
	GivenRatings    []Rating `gorm:"foreignKey:RaterUsername"`
	Password        string   `gorm:"NOT NULL" json:"-"`
	Role            string   `gorm:"NOT NULL" Default:"user"`
	PicturePath     string   `gorm:"NOT NULL" Default:"../../../media/default.png"`
}
