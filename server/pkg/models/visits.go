package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Visits struct {
	Id          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Vark        int                `json:"vark,omitempty" bson:"vark,omitempty"`
	Personality int                `json:"personality,omitempty" bson:"personality,omitempty"`
}
