package models

import "time"

type ChartModel struct {
	Username    string
	Date        time.Time
	AverageRate float64
}
