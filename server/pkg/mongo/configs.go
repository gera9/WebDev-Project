package mongo

import (
	"context"
	"fmt"

	"github.com/gera9/WebDev-Project/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (r *Repository) GetConfigById(id primitive.ObjectID) (*models.Config, error) {
	coll := r.client.Database(r.dbName).Collection("config")
	ctx := context.TODO()

	filter := bson.M{"_id": id}

	config := new(models.Config)
	err := coll.FindOne(ctx, filter).Decode(config)
	if err != nil {
		return nil, err
	}

	return config, nil
}

func (r *Repository) UpdateConfig(id primitive.ObjectID, c models.Config) error {
	coll := r.client.Database(r.dbName).Collection("config")
	ctx := context.TODO()

	filter := bson.M{"_id": id}
	update := bson.M{"$set": c}

	_, err := coll.UpdateOne(ctx, filter, update)
	if err != nil {
		fmt.Printf("err.Error(): %v\n", err.Error())
		return err
	}

	return nil
}
