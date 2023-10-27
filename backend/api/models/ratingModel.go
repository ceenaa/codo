package models

import (
	"gorm.io/gorm"
)

type Rating struct {
	gorm.Model
	RaterUsername string `gorm:"NOT NULL"`
	RatedUsername string `gorm:"NOT NULL"`
	Rate          int    `gorm:"NOT NULL"`
}
