package models

type QueryUser struct {
	VarkResult        string `query:"varkResult"`
	Department        string `query:"department"`
	PersonalityResult string `query:"personalityResult"`
	Email             string `query:"email"`
	Username          string `query:"username"`
	Password          string `query:"password"`
}
