package main

import (
	"bytes"
	"html/template"
	"log"

	"github.com/gera9/WebDev-Project/server/pkg/mailutil"
	"github.com/gera9/WebDev-Project/server/pkg/models"
	"github.com/gera9/WebDev-Project/server/pkg/mongo"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var storage *mongo.Repository

func init() {
	var err error
	storage, err = mongo.NewStorage("mongodb://root:example@db/", "app")
	if err != nil {
		log.Panic(err)
	}
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.ConfigDefault))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	admins := app.Group("/admins")
	admins.Get("/", GetAdmins)
	admins.Get("/:adminId", GetAdmins)

	users := app.Group("/users")
	users.Get("/", GetUsers)
	users.Get("/:userId", GetUserById)
	users.Post("/", CreateUser)
	users.Put("/:userId", UpdateUserById)
	users.Delete("/:userId", DeleteUserById)

	summary := app.Group("/summary")

	summaryVark := summary.Group("/vark")
	summaryVark.Get("/global", GetGlobalVarkSummary)
	summaryVark.Get("/department", GetDepartmentVarkSummary)

	summaryPersonality := summary.Group("/personality")
	summaryPersonality.Get("/global", GetGlobalPersonalitySummary)
	summaryPersonality.Get("/department", GetDepartmentPersonalitySummary)

	email := app.Group("/email")
	email.Post("/", SendMail)
	email.Post("/suggestion", SendSuggestionMail)

	config := app.Group("/config")
	config.Get("/", GetConfig)
	config.Put("/:configId", UpdateConfig)

	visits := app.Group("/visits")
	visits.Get("/", GetVisits)
	visits.Put("/", UpdateVisits)

	app.Listen(":3000")

	log.Fatal(app.Listen(":3000"))
}

func GetAdmins(c *fiber.Ctx) error {
	q := new(models.QueryUser)
	err := c.QueryParser(q)
	if err != nil {
		return fiber.ErrBadRequest
	}

	admins, err := storage.GetAdmins(*q)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(admins)
}

func GetAdminById(c *fiber.Ctx) error {
	adminId, err := primitive.ObjectIDFromHex(c.Params("adminId"))
	if err != nil {
		return fiber.ErrBadRequest
	}

	admin, err := storage.GetAdminById(adminId)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(admin)
}

func GetUsers(c *fiber.Ctx) error {
	q := new(models.QueryUser)
	err := c.QueryParser(q)
	if err != nil {
		return fiber.ErrBadRequest
	}

	users, err := storage.GetUsers(*q)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(users)
}

func GetUserById(c *fiber.Ctx) error {
	userId, err := primitive.ObjectIDFromHex(c.Params("userId"))
	if err != nil {
		return fiber.ErrBadRequest
	}

	admin, err := storage.GetUserById(userId)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(admin)
}

func CreateUser(c *fiber.Ctx) error {
	u := new(models.User)

	if err := c.BodyParser(u); err != nil {
		return fiber.ErrBadRequest
	}

	u.Id = primitive.NewObjectID()

	err := storage.CreateUser(*u)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(u)
}

func UpdateUserById(c *fiber.Ctx) error {
	userId, err := primitive.ObjectIDFromHex(c.Params("userId"))
	if err != nil {
		return fiber.ErrBadRequest
	}

	u := new(models.UpdateUser)

	if err := c.BodyParser(u); err != nil {
		return fiber.ErrBadRequest
	}

	err = storage.UpdateUserById(userId, *u)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(u)
}

func DeleteUserById(c *fiber.Ctx) error {
	userId, err := primitive.ObjectIDFromHex(c.Params("userId"))
	if err != nil {
		return fiber.ErrBadRequest
	}

	err = storage.DeleteUserById(userId)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "User deleted",
	})
}

func GetGlobalVarkSummary(c *fiber.Ctx) error {
	summary, err := storage.GetGlobalVarkSummary()
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(summary)
}

func GetDepartmentVarkSummary(c *fiber.Ctx) error {
	q := new(models.QueryUser)
	err := c.QueryParser(q)
	if err != nil {
		return fiber.ErrBadRequest
	}

	summary, err := storage.GetDepartmentVarkSummary(q.Department)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(summary)
}

func GetGlobalPersonalitySummary(c *fiber.Ctx) error {
	summary, err := storage.GetGlobalPersonalitySummary()
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(summary)
}

func GetDepartmentPersonalitySummary(c *fiber.Ctx) error {
	q := new(models.QueryUser)
	err := c.QueryParser(q)
	if err != nil {
		return fiber.ErrBadRequest
	}

	summary, err := storage.GetDepartmentPersonalitySummary(q.Department)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(summary)
}

func SendMail(c *fiber.Ctx) error {
	email := &struct {
		Test    string `json:"test"`
		Result  string `json:"result"`
		Subject string `json:"subject"`
		To      string `json:"to"`
	}{}

	if err := c.BodyParser(email); err != nil {
		return fiber.ErrBadRequest
	}

	tmpl := template.Must(template.ParseFiles("./template.html"))

	buff := bytes.NewBuffer(nil)
	err := tmpl.Execute(buff, nil)
	if err != nil {
		return err
	}
	err = mailutil.SendMail(mailutil.MailParams{
		Subject: "Resultados del Test",
		From:    "gera.morales99@hotmail.com",
		To: []string{
			email.To,
		},
		Body: buff.Bytes(),
	})
	if err != nil {
		log.Println(err)
		return fiber.ErrInternalServerError
	}

	return nil
}

func GetConfig(c *fiber.Ctx) error {
	configId, _ := primitive.ObjectIDFromHex("63859f2852b2344526e96191")

	config, err := storage.GetConfigById(configId)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(config)
}

func UpdateConfig(c *fiber.Ctx) error {
	configId, err := primitive.ObjectIDFromHex(c.Params("configId"))
	if err != nil {
		return fiber.ErrBadRequest
	}

	conf := new(models.Config)

	if err := c.BodyParser(conf); err != nil {
		return fiber.ErrBadRequest
	}

	err = storage.UpdateConfig(configId, *conf)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(conf)
}

func SendSuggestionMail(c *fiber.Ctx) error {
	email := &struct {
		Email   string `json:"email"`
		Text    string `json:"text"`
		Subject string `json:"subject"`
	}{}

	if err := c.BodyParser(email); err != nil {
		return fiber.ErrBadRequest
	}

	tmpl := template.Must(template.ParseFiles("./template.html"))

	buff := bytes.NewBuffer(nil)
	err := tmpl.Execute(buff, nil)
	if err != nil {
		return err
	}

	err = mailutil.SendMail(mailutil.MailParams{
		Subject: email.Subject,
		From:    "gera.morales99@hotmail.com",
		To: []string{
			"gerardomorales135@gmail.com",
		},
		Body: buff.Bytes(),
	})
	if err != nil {
		log.Println(err)
		return fiber.ErrInternalServerError
	}

	return nil
}

func GetVisits(c *fiber.Ctx) error {
	visits, err := storage.GetVisits()
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(visits)
}

func UpdateVisits(c *fiber.Ctx) error {
	v := new(models.Visits)

	if err := c.BodyParser(v); err != nil {
		return fiber.ErrBadRequest
	}

	err := storage.UpdateVisits(*v)
	if err != nil {
		return fiber.ErrInternalServerError
	}

	return c.Status(fiber.StatusOK).JSON(v)
}
