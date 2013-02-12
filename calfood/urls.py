from django.conf.urls import patterns, include, url
from food.views import parse_page, index, register
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	('^index$', index),
	('^index#register$', index),
	('^parse_page', parse_page),

    # Examples:
    # url(r'^$', 'calfood.views.home', name='home'),
    # url(r'^calfood/', include('calfood.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
