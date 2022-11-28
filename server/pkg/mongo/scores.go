package mongo

import (
	"context"

	"github.com/gera9/WebDev-Project/server/pkg/models"
)

func (r *Repository) NewRecord(newRecord models.Score) (*models.Score, error) {
	coll := r.client.Database(r.dbName).Collection("records")

	_, err := coll.InsertOne(context.TODO(), newRecord)
	if err != nil {
		return nil, err
	}

	return &newRecord, nil
}
