package models

import "gorm.io/gorm"

type Rating struct {
	gorm.Model
	DateTime string  `gorm:"type:datetime NOT NULL DEFAULT CURRENT_TIMESTAMP"`
	RaterID  uint    `gorm:"NOT NULL"`
	RatedID  uint    `gorm:"NOT NULL"`
	Rate     float64 `gorm:"NOT NULL"`
}
