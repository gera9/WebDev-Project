package models

type Config struct {
	Id             string `json:"_id,omitempty" bson:"_id,omitempty"`
	ActivatedTests string `json:"activatedTests,omitempty" bson:"activatedTests,omitempty"`
}
