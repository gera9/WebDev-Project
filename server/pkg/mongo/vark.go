package mongo

import (
	"context"

	"github.com/gera9/WebDev-Project/server/pkg/models"
)

func (r *Repository) NewVark(newVark models.Vark) (*models.Vark, error) {
	coll := r.client.Database(r.dbName).Collection("varks")

	_, err := coll.InsertOne(context.TODO(), newVark)
	if err != nil {
		return nil, err
	}

	return &newVark, nil
}
