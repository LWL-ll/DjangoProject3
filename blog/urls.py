from django.urls import path
from . import views
from .views import search

## 定义应用命名空间，用于反向解析 URL 时区分不同应用的同名路由
app_name = 'blog'

urlpatterns = [
    path('', views.index,name = 'index'),
    path('blog/detail/<blog_id>',views.blog_detail,name='blog_detail'),
    path('blog/pub',views.pub_blog,name='pub_blog'),
    path('blog/comment/pub',views.pub_comment,name='pub_comment'),
    path('search',views.search,name='search')
]