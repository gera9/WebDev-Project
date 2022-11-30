package models

type GlobalVarkSummary struct {
	TotalV    int `json:"totalV" bson:"totalV"`
	TotalA    int `json:"totalA" bson:"totalA"`
	TotalR    int `json:"totalR" bson:"totalR"`
	TotalK    int `json:"totalK" bson:"totalK"`
	TotalNull int `json:"totalNull" bson:"totalNull"`
	Total     int `json:"total" bson:"total"`
}

type GetGlobalPersonalitySummary struct {
	TotalISFJ int `json:"totalISFJ" bson:"totalISFJ"`
	TotalISFP int `json:"totalISFP" bson:"totalISFP"`
	TotalISTJ int `json:"totalISTJ" bson:"totalISTJ"`
	TotalISTP int `json:"totalISTP" bson:"totalISTP"`
	TotalINFJ int `json:"totalINFJ" bson:"totalINFJ"`
	TotalINFP int `json:"totalINFP" bson:"totalINFP"`
	TotalINTJ int `json:"totalINTJ" bson:"totalINTJ"`
	TotalINTP int `json:"totalINTP" bson:"totalINTP"`
	TotalESFJ int `json:"totalESFJ" bson:"totalESFJ"`
	TotalESFP int `json:"totalESFP" bson:"totalESFP"`
	TotalESTJ int `json:"totalESTJ" bson:"totalESTJ"`
	TotalESTP int `json:"totalESTP" bson:"totalESTP"`
	TotalENFJ int `json:"totalENFJ" bson:"totalENFJ"`
	TotalENFP int `json:"totalENFP" bson:"totalENFP"`
	TotalENTJ int `json:"totalENTJ" bson:"totalENTJ"`
	TotalENTP int `json:"totalENTP" bson:"totalENTP"`
	Total     int `json:"total" bson:"total"`
}
