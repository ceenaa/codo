package controllers

import (
	"backend/initializers"
	"backend/models"
	"github.com/gin-gonic/gin"
	"os"
)

func UploadPicture(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{"error": "Failed to upload file"})
		return
	}

	user := c.MustGet("user").(models.User)
	path := "../../../media/" + user.Username

	if os.IsExist(err) {
		err := os.Remove(path)
		if err != nil {
			c.JSON(400, gin.H{"error": "Failed to upload file"})
			return
		}
	}

	if err := c.SaveUploadedFile(file, path); err != nil {
		c.JSON(400, gin.H{"error": "Failed to upload file"})
		return
	}
	user.PicturePath = path
	initializers.DB.Save(&user)

}
