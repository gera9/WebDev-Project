package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gera9/WebDev-Project/server/pkg/models"
	"github.com/gera9/WebDev-Project/server/pkg/mongo"
	"github.com/rs/cors"
)

var storage *mongo.Repository

func init() {
	var err error
	storage, err = mongo.NewStorage("mongodb://root:example@localhost/", "app")
	if err != nil {
		log.Panic(err)
	}
}

func main() {
	r := http.NewServeMux()

	r.HandleFunc("/login", login)
	r.HandleFunc("/signup", signup)
	r.HandleFunc("/active-global-user", activeGlobalUser)
	r.HandleFunc("/get-active-global-user", getActiveGlobalUser)
	r.HandleFunc("/save-score", saveScore)

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"Hello": "world",
		})
	})

	log.Panic(http.ListenAndServe(":3000", cors.Default().Handler(r)))
}

func login(w http.ResponseWriter, r *http.Request) {
	reqUser := new(models.User)

	err := json.NewDecoder(r.Body).Decode(reqUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	resUser, err := storage.GetUserByUserNameAndPassword(reqUser.Username, reqUser.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resUser)
}

func signup(w http.ResponseWriter, r *http.Request) {
	reqUser := new(models.User)

	err := json.NewDecoder(r.Body).Decode(reqUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	resUser, err := storage.InsertUser(*reqUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resUser)
}

func activeGlobalUser(w http.ResponseWriter, r *http.Request) {
	reqUser := struct {
		Active bool `json:"active" bson:"active"`
	}{}

	err := json.NewDecoder(r.Body).Decode(&reqUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	err = storage.ActiveGlobalUser(reqUser.Active)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}
}

func getActiveGlobalUser(w http.ResponseWriter, r *http.Request) {
	user, err := storage.GetUserByUserNameAndPassword("global", "17277479")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"active": user.IsActive,
	})
}

func saveScore(w http.ResponseWriter, r *http.Request) {
	reqScore := new(models.Score)

	err := json.NewDecoder(r.Body).Decode(reqScore)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	resUser, err := storage.NewRecord(*reqScore)
	if err != nil {
		fmt.Println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"error": err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resUser)
}
