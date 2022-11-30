package mongo

import (
	"context"

	"github.com/gera9/WebDev-Project/server/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (r *Repository) GetUsers(q models.QueryUser) ([]models.User, error) {
	coll := r.client.Database(r.dbName).Collection("users")
	ctx := context.TODO()

	filter := bson.D{{}}
	if q.Department != "" {
		filter = append(filter, bson.E{Key: "department", Value: q.Department})
	}
	if q.VarkResult != "" {
		filter = append(filter, bson.E{Key: "varkResult", Value: q.VarkResult})
	}
	if q.PersonalityResult != "" {
		filter = append(filter, bson.E{Key: "personalityResult", Value: q.PersonalityResult})
	}
	if q.Email != "" {
		filter = append(filter, bson.E{Key: "email", Value: q.Email})
	}
	if q.Username != "" {
		filter = append(filter, bson.E{Key: "username", Value: q.Username})
	}
	if q.Password != "" {
		filter = append(filter, bson.E{Key: "password", Value: q.Password})
	}

	cursor, err := coll.Find(ctx, filter)
	if err != nil {
		return nil, err
	}

	var users []models.User

	err = cursor.All(ctx, &users)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (r *Repository) GetUserById(id primitive.ObjectID) (*models.User, error) {
	coll := r.client.Database(r.dbName).Collection("users")
	ctx := context.TODO()

	filter := bson.M{"_id": id}

	user := new(models.User)
	err := coll.FindOne(ctx, filter).Decode(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *Repository) GetUserByEmail(email string) (*models.User, error) {
	coll := r.client.Database(r.dbName).Collection("users")
	ctx := context.TODO()

	filter := bson.M{"email": email}

	user := new(models.User)
	err := coll.FindOne(ctx, filter).Decode(user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *Repository) CreateUser(user models.User) error {
	coll := r.client.Database(r.dbName).Collection("users")
	ctx := context.TODO()

	_, err := coll.InsertOne(ctx, user)
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) UpdateUserById(id primitive.ObjectID, user models.UpdateUser) error {
	coll := r.client.Database(r.dbName).Collection("users")
	ctx := context.TODO()

	filter := bson.M{"_id": id}
	update := bson.M{"$set": user}

	_, err := coll.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) DeleteUserById(id primitive.ObjectID) error {
	coll := r.client.Database(r.dbName).Collection("users")
	ctx := context.TODO()

	filter := bson.M{"_id": id}

	_, err := coll.DeleteOne(ctx, filter)
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) GetGlobalVarkSummary() (*models.GlobalVarkSummary, error) {
	vUsers, err := r.GetUsers(models.QueryUser{VarkResult: "v"})
	if err != nil {
		return nil, err
	}

	aUsers, err := r.GetUsers(models.QueryUser{VarkResult: "a"})
	if err != nil {
		return nil, err
	}

	rUsers, err := r.GetUsers(models.QueryUser{VarkResult: "r"})
	if err != nil {
		return nil, err
	}

	kUsers, err := r.GetUsers(models.QueryUser{VarkResult: "k"})
	if err != nil {
		return nil, err
	}

	nullUsers, err := r.GetUsers(models.QueryUser{VarkResult: "null"})
	if err != nil {
		return nil, err
	}

	return &models.GlobalVarkSummary{
		TotalV:    len(vUsers),
		TotalA:    len(aUsers),
		TotalR:    len(rUsers),
		TotalK:    len(kUsers),
		TotalNull: len(nullUsers),
		Total:     len(vUsers) + len(aUsers) + len(rUsers) + len(nullUsers),
	}, nil
}

func (r *Repository) GetDepartmentVarkSummary(department string) (*models.GlobalVarkSummary, error) {
	vUsers, err := r.GetUsers(models.QueryUser{
		VarkResult: "v",
		Department: department,
	})
	if err != nil {
		return nil, err
	}

	aUsers, err := r.GetUsers(models.QueryUser{
		VarkResult: "a",
		Department: department,
	})
	if err != nil {
		return nil, err
	}

	rUsers, err := r.GetUsers(models.QueryUser{
		VarkResult: "r",
		Department: department,
	})
	if err != nil {
		return nil, err
	}

	kUsers, err := r.GetUsers(models.QueryUser{
		VarkResult: "k",
		Department: department,
	})
	if err != nil {
		return nil, err
	}

	nullUsers, err := r.GetUsers(models.QueryUser{
		VarkResult: "null",
		Department: department,
	})
	if err != nil {
		return nil, err
	}
	return &models.GlobalVarkSummary{
		TotalV:    len(vUsers),
		TotalA:    len(aUsers),
		TotalR:    len(rUsers),
		TotalK:    len(kUsers),
		TotalNull: len(nullUsers),
		Total:     len(vUsers) + len(aUsers) + len(rUsers) + len(nullUsers),
	}, nil
}

func (r *Repository) GetGlobalPersonalitySummary() (*models.GetGlobalPersonalitySummary, error) {
	ISFJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ISFJ",
	})
	if err != nil {
		return nil, err
	}

	ISFPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ISFP",
	})
	if err != nil {
		return nil, err
	}

	ISTJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ISTJ",
	})
	if err != nil {
		return nil, err
	}

	ISTPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ISTP",
	})
	if err != nil {
		return nil, err
	}

	INFJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "INFJ",
	})
	if err != nil {
		return nil, err
	}

	INFPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "INFP",
	})
	if err != nil {
		return nil, err
	}

	INTJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "INTJ",
	})
	if err != nil {
		return nil, err
	}

	INTPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "INTP",
	})
	if err != nil {
		return nil, err
	}

	ESFJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ESFJ",
	})
	if err != nil {
		return nil, err
	}

	ESFPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ESFP",
	})
	if err != nil {
		return nil, err
	}

	ESTJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ESTJ",
	})
	if err != nil {
		return nil, err
	}

	ESTPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ESTP",
	})
	if err != nil {
		return nil, err
	}

	ENFJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ENFJ",
	})
	if err != nil {
		return nil, err
	}

	ENFPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ENFP",
	})
	if err != nil {
		return nil, err
	}

	ENTJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ENTJ",
	})
	if err != nil {
		return nil, err
	}

	ENTPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ENTP",
	})
	if err != nil {
		return nil, err
	}

	return &models.GetGlobalPersonalitySummary{
		TotalISFJ: len(ISFJUsers),
		TotalISFP: len(ISFPUsers),
		TotalISTJ: len(ISTJUsers),
		TotalISTP: len(ISTPUsers),
		TotalINFJ: len(INFJUsers),
		TotalINFP: len(INFPUsers),
		TotalINTJ: len(INTJUsers),
		TotalINTP: len(INTPUsers),
		TotalESFJ: len(ESFJUsers),
		TotalESFP: len(ESFPUsers),
		TotalESTJ: len(ESTJUsers),
		TotalESTP: len(ESTPUsers),
		TotalENFJ: len(ENFJUsers),
		TotalENFP: len(ENFPUsers),
		TotalENTJ: len(ENTJUsers),
		TotalENTP: len(ENTPUsers),
	}, nil
}

func (r *Repository) GetDepartmentPersonalitySummary(department string) (*models.GetGlobalPersonalitySummary, error) {
	ISFJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ISFJ",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ISFPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ISFP",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ISTJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ISTJ",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ISTPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ISTP",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	INFJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "INFJ",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	INFPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "INFP",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	INTJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "INTJ",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	INTPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "INTP",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ESFJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ESFJ",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ESFPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ESFP",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ESTJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ESTJ",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ESTPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ESTP",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ENFJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ENFJ",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ENFPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ENFP",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ENTJUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ENTJ",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	ENTPUsers, err := r.GetUsers(models.QueryUser{
		PersonalityResult: "ENTP",
		Department:        department,
	})
	if err != nil {
		return nil, err
	}

	return &models.GetGlobalPersonalitySummary{
		TotalISFJ: len(ISFJUsers),
		TotalISFP: len(ISFPUsers),
		TotalISTJ: len(ISTJUsers),
		TotalISTP: len(ISTPUsers),
		TotalINFJ: len(INFJUsers),
		TotalINFP: len(INFPUsers),
		TotalINTJ: len(INTJUsers),
		TotalINTP: len(INTPUsers),
		TotalESFJ: len(ESFJUsers),
		TotalESFP: len(ESFPUsers),
		TotalESTJ: len(ESTJUsers),
		TotalESTP: len(ESTPUsers),
		TotalENFJ: len(ENFJUsers),
		TotalENFP: len(ENFPUsers),
		TotalENTJ: len(ENTJUsers),
		TotalENTP: len(ENTPUsers),
	}, nil
}
