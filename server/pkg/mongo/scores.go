package mongo

import (
	"context"
	"encoding/json"
	"fmt"

	jsonpatch "github.com/evanphx/json-patch"
	"github.com/gera9/WebDev-Project/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
)

func (r *Repository) NewRecord(newRecord models.Score) (*models.Score, error) {
	coll := r.client.Database(r.dbName).Collection("records")

	filter := bson.M{"name": newRecord.Name}
	//update := bson.D{{Key: "$set", Value: newRecord}}

	res := new(models.Score)

	ress, _ := json.Marshal(res)
	newRecordd, _ := json.Marshal(newRecord)

	_ = coll.FindOne(context.TODO(), filter).Decode(res)

	patch, err := jsonpatch.MergePatch(ress, newRecordd)
	if err != nil {
		panic(err)
	}
	fmt.Printf("patch: %s\n", patch)
	/* err := coll.FindOneAndUpdate(context.TODO(), filter, update).Decode(res)
	if err != nil {
		_, err := coll.InsertOne(context.TODO(), newRecord)
		if err != nil {
			return nil, err
		}
		return &newRecord, nil
	} */

	return res, nil
}
