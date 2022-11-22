package mongo

import (
	"context"

	"github.com/gera9/WebDev-Project/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) NewRecord(newRecord models.Score) (*models.Score, error) {
	coll := r.client.Database(r.dbName).Collection("records")

	filter := bson.M{"name": newRecord.Name}
	update := bson.D{{Key: "$set", Value: newRecord}}

	res := new(models.Score)

	err := coll.FindOneAndUpdate(context.TODO(), filter, update).Decode(res)
	if err != nil {
		_, err := coll.InsertOne(context.TODO(), newRecord)
		if err != nil {
			return nil, err
		}
		return &newRecord, nil
	}

	return res, nil
}
