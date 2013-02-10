from django.db import models
import random
class User(models.Model):
	telephone = models.IntegerField()
	pwd = models.IntegerField()
	verified = models.BooleanField()
	ver_code = models.IntegerField()

class Favs(models.Model):
	user = models.ForeignKey(User)
	favorites = models.CharField(max_length=100)

	