package models

type Personality struct {
	Name   string `json:"name" bson:"name"`
	Result string `json:"result" bson:"result"`
}
