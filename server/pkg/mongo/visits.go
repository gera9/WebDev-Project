package mongo

import (
	"context"

	"github.com/gera9/WebDev-Project/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (r *Repository) GetVisits() (*models.Visits, error) {
	coll := r.client.Database(r.dbName).Collection("visits")
	ctx := context.TODO()

	id, _ := primitive.ObjectIDFromHex("6386784e5ee40af9b4dbe67d")
	filter := bson.M{"_id": id}

	visits := new(models.Visits)
	err := coll.FindOne(ctx, filter).Decode(visits)
	if err != nil {
		return nil, err
	}

	return visits, nil
}

func (r *Repository) UpdateVisits(visits models.Visits) error {
	coll := r.client.Database(r.dbName).Collection("visits")
	ctx := context.TODO()

	id, _ := primitive.ObjectIDFromHex("6386784e5ee40af9b4dbe67d")
	filter := bson.M{"_id": id}
	update := bson.M{"$set": visits}

	_, err := coll.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	return nil
}
