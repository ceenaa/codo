package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username        string  `gorm:"unique"`
	FirstName       string  `gorm:"NOT NULL"`
	LastName        string  `gorm:"NOT NULL"`
	AverageRate     float64 `gorm:"NOT NULL" Default:"3.0"`
	TotalRaters     uint
	RecievedRatings []Rating `gorm:"foreignKey:RatedUsername"`
	GivenRatings    []Rating `gorm:"foreignKey:RaterUsername"`
	Password        string   `gorm:"NOT NULL" json:"-"`
	Role            string   `gorm:"NOT NULL" Default:"user"`
	PicturePath     string   ` Default:"../../../media/default.png"`
}
