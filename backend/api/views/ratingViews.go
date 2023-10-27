package views

type CreateRatingInput struct {
	Rate          int    `json:"rate"`
	RatedUsername string `json:"rated_username" binding:"required"`
}

type RatingOutput struct {
	CreatedAt     string `json:"created_at"`
	RaterUsername string `json:"rater_username"`
	RatedUsername string `json:"rated_username"`
	Rate          int    `json:"rate"`
}
