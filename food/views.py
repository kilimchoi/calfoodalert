from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.utils import simplejson
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import pprint
import json
from googlevoice import Voice, util 
from googlevoice.util import input
import re
from bs4 import BeautifulSoup
from models import User, Menu, Favs
import random
import string
import mechanize
import urllib2

place_list = {}
def index(request):
	passwordMatch = False
	passwordLength = False
	telephone_registered = False
	dict = {'telephone_registered': telephone_registered, 'passwordMatch': passwordMatch, 'passwordLength': passwordLength}
	if request.method == "POST":
		password = request.POST['pwd']
		area = request.POST['area']
		first = request.POST['first']
		last = request.POST['last']
		area = area.encode("utf8")
		first = first.encode("utf8")
		last = last.encode("utf8")
		telephone = area + "" + first + "" + last
		tele = int(telephone)
		password = password.encode("utf8")
		intPassword = int(password)
		confirmPwd = request.POST['pwd_conf']
		intConfirmPwd = int(confirmPwd)
		if len(password) < 6:
			passwordLength = False
		if len(password) >= 6:
			passwordLength = True
		if intPassword != intConfirmPwd:
			passwordMatch = False
		if intPassword == intConfirmPwd:
			passwordMatch = True
		dict = {'telephone_registered': telephone_registered, 'passwordMatch': passwordMatch, 'passwordLength': passwordLength, 'telephone': tele}
		user_count = User.objects.filter(telephone = tele).count()
		if user_count >= 1:
			dict = {'telephone_registered': telephone_registered, 'passwordMatch': passwordMatch, 'passwordLength': passwordLength, 'telephone': tele}
			return HttpResponseRedirect("")
		else: 
			dict = {'telephone_registered': telephone_registered, 'passwordMatch': passwordMatch, 'passwordLength': passwordLength, 'telephone': tele}
			if passwordMatch and passwordLength:
				telephone_registered = True
				user = User(telephone = tele, pwd= password, ver_code = generate_random_code(), telephone_registered = telephone_registered)
				user.save()
				user.set_password(user.pwd)
				send_verification(request, tele)
				return render_to_response('static/index.html', dict, context_instance=RequestContext(request))
			else:
				return HttpResponseRedirect("")
	return render_to_response('static/index.html', dict, context_instance=RequestContext(request))

def favorites(request):
	dict = {}
	return render_to_response('static/favorites.html', dict, context_instance=RequestContext(request))

def generate_random_code():
	lst = [random.choice(string.digits) for n in xrange(7)]
	str = "".join(lst)
	return str


def reset_password(tele, new_pwd):
	u = User.objects.get(telephone=tele)
	u.set_password(tele, new_pwd)
	u.save()
	
def parse_page(request):
	url = "http://services.housing.berkeley.edu/FoodPro/dining/static/todaysentrees.asp"
	br = mechanize.Browser()
	data = br.open(url).get_data()
	lists = list(br.links(text_regex=re.compile("")))
	counter = 0
	name_counter = 0
	for lst in lists:
		food = []
		if lst.text != "Click To View[IMG]Menu Details" and lst.text != "[IMG]" and lst.text != "sitemap" and lst.text != "dc tabling" and lst.text != "jobs" and lst.text != "comment cards" and lst.text != "contact us" and lst.text != "dining@berkeley.edu" and lst.text != "Nutritive Analysis" and lst.text != "" and lst.text != "cal club" and lst.text != "cal care packs" and lst.text != "student meal plans" and lst.text != "faculty/staff meal plans":
			location_name = lst.attrs[0][1].split('&')
			counter = 0
			name_counter = 0
			for name in location_name:
				if counter == 1:
					name_counter = 0
					name = name.split('=')
					for n in name:
						if name_counter == 1:
							place = n.replace('+', '')
							if place in place_list:
								food = place_list[place]
								food.append(lst.text)
								place_list[place] = food
							else:
								food.append(lst.text)
								place_list[place] = food
						name_counter += 1
				counter += 1
	for k, foods in place_list.items():
		for food in foods:
			f = Menu(food=food)
			f.save()

favorite_foods = []
def get_food(request):
	pressed = False
	if request.method == "POST":
		foods = ""
		post = request.POST
		food = post['data[favorites]']
		food = food.encode('utf8')
		food = str(food)
		favorite_foods.append(food)
		telephone = post['data[telephone]']
		telephone = telephone.encode('utf8')
		telephone = int(telephone)
		user = User.objects.get(telephone=telephone)
		for food in favorite_foods:
			foods = foods + " " + food
		fav = Favs(user=user, favorites=foods)
		fav.save()
		send_food_notification(request, telephone)
	foods = Menu.objects.filter(food__startswith=str(request.REQUEST['search']))
	results = []
	for food in foods:
		results.append(food.food)
	resp = request.REQUEST['callback'] + '(' + simplejson.dumps(results) + ');'
	return HttpResponse(resp, content_type='application/json')

def send_food_notification(request, tele):
	voice = Voice()
	voice.login('calfoodalert@gmail.com', 'hackjamfoodalert')
	recipient = User.objects.get(telephone = tele)
	favs = Favs.objects.get(user = recipient)
	foods = favs.favorites
	message = 'Your favorite food %s is served at %s' % (foods, "clarkkerr")
	voice.send_sms(tele, message)

def register(request):
	render_to_response(index.html)
	

def send_verification(request, tele):
	voice = Voice()
	voice.login('calfoodalert@gmail.com', 'hackjamfoodalert')
	recipient = User.objects.get(telephone = tele)
	ver_code = recipient.ver_code
	message = 'Your verification code is %d' % (ver_code)
	voice.send_sms(tele, message)
	print('Message Sent')