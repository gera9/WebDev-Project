package mongo

import (
	"context"

	"github.com/gera9/WebDev-Project/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (r *Repository) GetAdmins(q models.QueryUser) ([]models.Admin, error) {
	coll := r.client.Database(r.dbName).Collection("admins")
	ctx := context.TODO()

	filter := bson.D{{}}
	if q.Email != "" {
		filter = append(filter, bson.E{Key: "email", Value: q.Email})
	}
	if q.Password != "" {
		filter = append(filter, bson.E{Key: "password", Value: q.Password})
	}

	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		return nil, err
	}

	admins := new([]models.Admin)

	err = cursor.All(ctx, admins)
	if err != nil {
		return nil, err
	}

	return *admins, nil
}

func (r *Repository) GetAdminById(id primitive.ObjectID) (*models.Admin, error) {
	coll := r.client.Database(r.dbName).Collection("admins")
	ctx := context.TODO()

	filter := bson.M{"_id": id}

	admin := new(models.Admin)
	err := coll.FindOne(ctx, filter).Decode(admin)
	if err != nil {
		return nil, err
	}

	return admin, nil
}

func (r *Repository) AddAdmin(admin models.Admin) error {
	coll := r.client.Database(r.dbName).Collection("admins")
	ctx := context.TODO()

	_, err := coll.InsertOne(ctx, admin)
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) UpdateAdmin(admin models.Admin) error {
	coll := r.client.Database(r.dbName).Collection("admins")
	ctx := context.TODO()

	_, err := coll.UpdateOne(ctx, bson.M{"_id": admin.Id}, bson.M{"$set": admin})
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) DeleteAdmin(id string) error {
	coll := r.client.Database(r.dbName).Collection("admins")
	ctx := context.TODO()

	_, err := coll.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		return err
	}

	return nil
}
