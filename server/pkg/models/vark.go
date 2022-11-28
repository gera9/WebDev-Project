package models

type Vark struct {
	Name string      `json:"name" bson:"name"`
	V    interface{} `json:"v" bson:"v"`
	A    interface{} `json:"a" bson:"a"`
	R    interface{} `json:"r" bson:"r"`
	K    interface{} `json:"k" bson:"k"`
}
