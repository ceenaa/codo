package controllers

import (
	"backend/initializers"
	"backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
)

// @Summary Upload picture
// @Description Upload picture
// @Tags Picture
// @Accept json
// @Produce json
// @Param file formData file true "Picture"
// @Security ApiKeyAuth
// @Success 200 {string} string "Picture uploaded"
// @Router /picture/upload [post]
func UploadPicture(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{"error": "Failed to upload file"})
		return
	}

	user := c.MustGet("user").(models.User)
	fileFormat := strings.Split(file.Filename, ".")[1]
	path := "../../media/pic/" + user.Username + "." + fileFormat

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
	path = "/media/pic/" + user.Username + "." + fileFormat
	user.PicturePath = path
	initializers.DB.Save(&user)

}

func ServeMedia(c *gin.Context) {
	dir := c.Param("dir")
	asset := c.Param("asset")
	if strings.TrimPrefix(asset, "/") == "" {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}
	dir = "../../../media/" + dir
	fullName := filepath.Join(dir, filepath.FromSlash(path.Clean("/"+asset)))
	c.File(fullName)
}
