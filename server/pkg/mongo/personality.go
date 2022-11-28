package mongo

import (
	"context"

	"github.com/gera9/WebDev-Project/server/pkg/models"
)

func (r *Repository) NewPersonality(newPersonality models.Personality) (*models.Personality, error) {
	coll := r.client.Database(r.dbName).Collection("personalities")

	_, err := coll.InsertOne(context.TODO(), newPersonality)
	if err != nil {
		return nil, err
	}

	return &newPersonality, nil
}
