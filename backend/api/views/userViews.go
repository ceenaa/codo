package views

import "time"

type CreateUserRequest struct {
	Username  string `json:"username"`
	Firstname string `json:"first_name"`
	Lastname  string `json:"last_name"`
	Password  string `json:"password"`
	Role      string `json:"role"`
}
type UserLoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type UserOutput struct {
	CreatedAt   time.Time `json:"created_at"`
	ID          uint      `json:"user_id"`
	Username    string    `json:"username"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	AverageRate float64   `json:"average_rate"`
	TotalRaters uint      `json:"total_raters"`
	PicturePath string    `json:"picture_path"`
	Rank        int64     `json:"rank" gorm:"-"`
	Role        string    `json:"role"`
}

type UserMinimalOutput struct {
	ID          uint    `json:"user_id"`
	Username    string  `json:"username"`
	FirstName   string  `json:"first_name"`
	LastName    string  `json:"last_name"`
	Role        string  `json:"role"`
	PicturePath string  `json:"picture_path"`
	AverageRate float64 `json:"average_rate"`
}
