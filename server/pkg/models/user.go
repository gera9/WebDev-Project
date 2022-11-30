package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id                primitive.ObjectID `bson:"_id" json:"_id"`
	Username          string             `bson:"username" json:"username"`
	Email             string             `bson:"email" json:"email"`
	Password          string             `bson:"password" json:"password"`
	Department        string             `bson:"department" json:"department"`
	VarkResult        string             `bson:"varkResult" json:"varkResult"`
	PersonalityResult string             `bson:"personalityResult" json:"personalityResult"`
}

type UpdateUser struct {
	Username          string `bson:"username,omitempty" json:"username,omitempty"`
	Email             string `bson:"email,omitempty" json:"email,omitempty"`
	Password          string `bson:"password,omitempty" json:"password,omitempty"`
	Department        string `bson:"department,omitempty" json:"department,omitempty"`
	VarkResult        string `bson:"varkResult,omitempty" json:"varkResult,omitempty"`
	PersonalityResult string `bson:"personalityResult,omitempty" json:"personalityResult,omitempty"`
}
