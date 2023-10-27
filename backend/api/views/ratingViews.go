package views

type CreateRatingInput struct {
	Rate          float64 `json:"rate" binding:"required"`
	RatedUsername string  `json:"rated_username" binding:"required"`
}

type RatingOutput struct {
	CreatedAt     string  `json:"created_at"`
	RaterUsername string  `json:"rater_username"`
	RatedUsername string  `json:"rated_username"`
	Rate          float64 `json:"rate"`
}
