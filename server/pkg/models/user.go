package models

type User struct {
	Username string `json:"username" bson:"username"`
	Password string `json:"password" bson:"password"`
	IsAdmin  bool   `json:"is_admin" bson:"is_admin"`
	IsActive bool   `json:"is_active" bson:"is_active"`
}
