from django.conf.urls import patterns, include, url
from food.views import parse_page, index, register, favorites, get_food
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    ('^$', index),
    ('^index$', index),
    ('^index#register$', index),
    ('^index#verify$', index),
    ('^parse_page', parse_page),
    ('^favorites', favorites),
    ('^index#register_value$', index),
    ('^api/fav_search$', get_food),

    # Examples:
    # url(r'^$', 'calfood.views.home', name='home'),
    # url(r'^calfood/', include('calfood.foo.urls')),

    # Uncomment the admin/doc lne below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
