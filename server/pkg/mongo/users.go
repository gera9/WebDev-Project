package mongo

import (
	"context"

	"github.com/gera9/WebDev-Project/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) GetUserByUserNameAndPassword(userName string, password string) (*models.User, error) {
	coll := r.client.Database(r.dbName).Collection("users")

	filter := bson.M{
		"username": userName,
		"password": password,
	}

	user := new(models.User)
	err := coll.FindOne(context.TODO(), filter).Decode(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *Repository) InsertUser(newUser models.User) (*models.User, error) {
	coll := r.client.Database(r.dbName).Collection("users")
	newUser.IsAdmin = true
	_, err := coll.InsertOne(context.TODO(), newUser)
	if err != nil {
		return nil, err
	}

	return &newUser, nil
}

func (r *Repository) ActiveGlobalUser(isActive bool) error {
	coll := r.client.Database(r.dbName).Collection("users")

	filter := bson.M{"username": "global", "password": "17277479"}
	update := bson.D{{Key: "$set", Value: bson.M{"is_active": isActive}}}

	_, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}

	return nil
}
