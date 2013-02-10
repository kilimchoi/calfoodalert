from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.template.loader import render_to_string
from datetime import datetime
import pprint
import json
from googlevoice import Voice, util 
from googlevoice.util import input
import re
from bs4 import BeautifulSoup
import mechanize
import urllib2

 
def parse_page(request):
	url = "http://services.housing.berkeley.edu/FoodPro/dining/static/todaysentrees.asp"
	br = mechanize.Browser()
	data = br.open(url).get_data()
	lists = list(br.links(text_regex=re.compile("")))
	counter = 0
	name_counter = 0
	place_list = []
	for lst in lists:
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
							food_tuple = (lst.text, place)
							print food_tuple
						name_counter += 1
				counter += 1
		place_list = []

	

def sendtext(request):
	voice = Voice()
	voice.login('calfoodalert@gmail.com', 'hackjamfoodalert')
	phoneNumber = 8053455180
	message = 'hi ben this works'
	voice.send_sms(phoneNumber, message)
	print('Message Sent')