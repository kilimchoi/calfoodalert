from django.db import models
from django.utils.encoding import smart_str
from django.utils.hashcompat import sha_constructor
import random
from django.db.models.fields import IntegerField
from django.conf import settings


class BigIntegerField(IntegerField):
    empty_strings_allowed=False
    def get_internal_type(self):
        return "BigIntegerField"	
    def db_type(self):
        return 'bigint' # Note this won't work with Oracle.

def get_hexdigest(algorithm, salt, raw_password):
		"""
		Returns a string of the hexdigest of the given plaintext password and salt
		using the given algorithm ('md5', 'sha1' or 'crypt').
		"""
		raw_password, salt = smart_str(raw_password), smart_str(salt)
		if algorithm == 'crypt':
			try:
				import crypt
			except ImportError:
				raise ValueError('"crypt" password algorithm not supported in this environment')
			return crypt.crypt(raw_password, salt)
		if algorithm == 'md5':
			return md5_constructor(salt + raw_password).hexdigest()
		elif algorithm == 'sha1':
			return sha_constructor(salt + raw_password).hexdigest()
		raise ValueError("Got unknown password algorithm type in password.")

class User(models.Model):
	telephone = models.FloatField()
	pwd = models.IntegerField()
	verified = models.BooleanField()
	ver_code = models.IntegerField()
	def set_password(self, pwd):
		algo='sha1'
		salt = get_hexdigest(algo, str(random.random()), str(random.random()))[:5]
		hsh = get_hexdigest(algo, salt, pwd)
		self.pwd = '%s$%s$%s' % (algo, salt, hsh)

class Favs(models.Model):
	user = models.ForeignKey(User)
	favorites = models.CharField(max_length=100)

	