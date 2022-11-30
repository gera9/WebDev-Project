package mailutil

import (
	"fmt"
	"log"
	"net/smtp"
)

type MailParams struct {
	Subject string
	Body    []byte
	From    string
	To      []string
}

func SendMail(params MailParams) error {
	// SMTP configuration
	username := "3bcd167b820ede"
	password := "827d2c09479999"
	host := "smtp.mailtrap.io"
	port := "2525"

	// Build the message
	message := fmt.Sprintf("From: %s\r\n", params.From)
	message += fmt.Sprintf("To: %s\r\n", params.To)
	message += fmt.Sprintf("Subject: %s\r\n", params.Subject)
	message += fmt.Sprintf("\r\n%s\r\n", params.Body)

	// Authentication.
	auth := smtp.PlainAuth("", username, password, host)

	// Send email
	err := smtp.SendMail(host+":"+port, auth, params.From, params.To, []byte(message))
	if err != nil {
		fmt.Println(err)
		return err
	}

	log.Println("Email sent successfully.")
	return nil
}
